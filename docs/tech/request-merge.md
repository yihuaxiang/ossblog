# 高性能实践：请求合并

在高并发场景下，来自下游服务的请求往往会引起大量的网络`IO`和服务端处理负载。有一种巧妙的方式可以减缓这些压力——请求合并。
其原理就是将一堆零散的请求拼凑成一个批量请求，如此便可以大幅降低上游服务器的压力。

本文将探讨一种高效的单机模式下的请求合并策略。

<ImgView title="合并请求" url="https://z.wiki/placeholder/740x120?text=实现思路&color=black&pinyin=true" />


核心实现思路：将请求先发送到队列中，然后使用工作线程进行消费处理，工作线程会不断地从队列中取出请求进行批量处理。

![请求合并.drawio.png](https://3.z.wiki/autoupload/20240213/4dcJ.931X1383-%E8%AF%B7%E6%B1%82%E5%90%88%E5%B9%B6.drawio.png)


<ImgView title="合并请求" url="https://z.wiki/placeholder/740x120?text=技术手段&color=black&pinyin=true" />


技术手段主要为：

1. `LinkedBlockingQueue` 线程安全阻塞队列
2. `ExecutorService` `ScheduledExecutorService` 线程池
3. `CompleteableFuture` Java 8 引入的 API，位于 `java.util.concurrent` 包中。它提供了一种异步编程的方式，允许以声明性的方式编写异步代码。



<ImgView title="合并请求" url="https://z.wiki/placeholder/740x120?text=代码&color=black&pinyin=true" />


源码地址：[https://github.com/yihuaxiang/spring-merge-request-demo](https://github.com/yihuaxiang/spring-merge-request-demo)


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

  private List<Map<String, Object>> batchQueryUser(List<Long> ids) {
    return restTemplate.getForEntity("https://playground.z.wiki/test/getUserInfo?ids=" + Joiner.on(",").join(ids), List.class).getBody();
  }

  @PostConstruct
  public void init() {
    ExecutorService executorService = Executors.newFixedThreadPool(100);
    ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(10);
    scheduledExecutorService.scheduleAtFixedRate(() -> {
      // 这里利用单独的线程池处理，是因为通过 scheduleAtFixedRate 运行的任务会收到前一个任务的影响，只有前一个任务执行完毕后一个才会开始
      executorService.execute(() -> {
        int queueSize = this.queue.size();
        if (queueSize == 0) {
          return ;
        }

        // 每次最多请求10个
        final int maxBatchSize = 10;
        List<UserQuery> userQueryList = new ArrayList<>(maxBatchSize);

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

在这段代码中，我们首先定义了一个线程安全的阻塞队列以保存所有待查询信息，然后通过工作线程来执行批量查询操作。


<ImgView title="合并请求" url="https://z.wiki/placeholder/740x120?text=测试&color=black&pinyin=true" />


1. 测试工具：[siege](https://z.wiki/misc/cmd-recommend.html#siege)
2. 测试脚本：`siege "http://localhost:8080/test/getUserInfo?id=9" --time=20s --concurrent=100`

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

<ImgView title="合并请求" url="https://5.z.wiki/autoupload/20240213/L76A.458X1176-image.png" />

从日志中可以看出来短时间内的多次请求被合并到了一起。


<ImgView title="合并请求" url="https://z.wiki/placeholder/740x120?text=注意&color=black&pinyin=true" />


注意，***没有银弹***，只有高并发且批量请求有助于减轻下游负载的情况下才需要进行请求合并。

代码粗糙，但是意思应该表达出来了，另外以上只是为了演示效果而编写的代码，实际应用中建议直接 `Hystrix` 提供的请求合并能力。

<ImgView title="合并请求" url="https://2.z.wiki/autoupload/20240212/IXyf.360X314-image.png" />

