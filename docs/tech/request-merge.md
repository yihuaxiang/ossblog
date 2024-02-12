# 高性能实践-请求合并

在高并发场景下，对下游服务的请求往往会引起大量的网络IO和服务端处理负载。通过请求合并将多个单独的请求合并成一个批量请求，可以显著减轻这些压力。

本文介绍一种单机模式下的下游请求合并方案。（如果需要分布式模式下请求合并则需要借助 redis Kafka 等中间件，本文暂不涉及）

![](https://z.wiki/placeholder/740x120?text=思路&color=black&pinyin=true)

核心实现思路：通过消息队列，将请求先发送到队列中，然后使用工作线程进行消费处理，工作线程会不断地从队列中取出请求进行批量处理。


![](https://z.wiki/placeholder/740x120?text=手段&color=black&pinyin=true)

技术手段主要为：

1. LinkedBlockingQueue 线程安全阻塞队列
2. ExecutorService ScheduledExecutorService 线程池
3. CompleteableFuture Java 8 引入的API，位于 java.util.concurrent 包中。它提供了一种异步编程的方式，允许以声明性的方式编写异步代码。



![](https://z.wiki/placeholder/740x120?text=代码&color=black&pinyin=true)


```java
@Service
public class UserService implements IUserService{
  // 阻塞队列，保存所有需要进行查询的信息
  private final Queue<UserQuery> queue = new LinkedBlockingQueue();

  // http client
  private final RestTemplate restTemplate;

  public UserService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }


  // 对外暴露的单个查询接口
  @SneakyThrows
  @Override
  public Map<String, Object> queryUser(Long id) {
    UserQuery userQuery = new UserQuery();
    userQuery.setId(id);

    CompletableFuture<Map<String, Object>> future = new CompletableFuture<>();
    userQuery.setCompletableFuture(future);

    // 将请求信息放置到队列中，由专门的工作线程进行批量请求
    queue.add(userQuery);

    return future.get();
  }

  public List<Map<String, Object>> batchQueryUser(List<Long> ids) {
    return restTemplate.getForEntity("https://playground.z.wiki/test/getUserInfo?ids=" + Joiner.on(",").join(ids), List.class).getBody();
  }

  @PostConstruct
  public void init() {
    ExecutorService executorService = Executors.newFixedThreadPool(100);
    ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(10);
    scheduledExecutorService.scheduleAtFixedRate(() -> {
      executorService.execute(() -> {
        int queueSize = this.queue.size();
        if (queueSize == 0) {
          return ;
        }

        List<UserQuery> userQueryList = new ArrayList<>(50);
        // 每次最多请求10个
        final int maxBatchSize = 10;

        for (int i = 0;i<maxBatchSize;i++) {
          if (queue.isEmpty()) {
            break;
          }

          userQueryList.add(queue.poll());
        }

        // 内部进行批量请求
        List<Map<String, Object>> userList = this.batchQueryUser(userQueryList.stream().map(item -> item.getId()).collect(Collectors.toList()));

        userQueryList.forEach(query -> {
          Integer id = query.getId().intValue();
          Optional<Map<String, Object>> info = userList.stream().filter(item -> id.equals(((Integer)item.get("id")))).findAny();
          if (info.isPresent()) {
            query.getCompletableFuture().complete(info.get());
          } else {
            query.getCompletableFuture().complete(null);
          }
        });

      });
    }, 100, 10, TimeUnit.MILLISECONDS);
  }
}

```

![](https://z.wiki/placeholder/740x120?text=测试&color=black&pinyin=true)

测试脚本：`siege "http://localhost:8080/test/getUserInfo?id=9" --time=20s --concurrent=100`

这里模拟 100 个并发，持续 20s 的压测

```
Transactions:		         886 hits
Availability:		      100.00 %
Elapsed time:		       19.24 secs
Data transferred:	        0.11 MB
Response time:		        2.12 secs
Transaction rate:	       46.05 trans/sec
Throughput:		        0.01 MB/sec
Concurrency:		       97.60
Successful transactions:         886
Failed transactions:	           0
Longest transaction:	       10.42
Shortest transaction:	        1.40
```



![](https://z.wiki/placeholder/740x120?text=注意&color=black&pinyin=true)

注意，***没有银弹***，只有高冰饭且批量请求有助于减轻下游负载的情况下才适合进行请求合并。
