# java httpClient

在`Java`中和其他系统进行交互，`http`接口调用是最频繁不过的的一种方式了。

<ImgView title="http-client" url="https://0.z.wiki/autoupload/2022-05-15/fb51e14d6fc548f895b2f6020150aa01.http-call.drawio.svg" />

### HttpURLConnection

最初都是使用`Java`自带的`HttpURLConnection`进行接口调用.

```java
    URL url = new URL("https://z.wiki");
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestMethod("GET");
    conn.setUseCaches(false);
    conn.setConnectTimeout(5000); // 请求超时5秒
    conn.connect();
    
    if (conn.getResponseCode() != 200) {
      throw new RuntimeException("bad response");
    }
    
    // 获取响应内容:
    InputStream input = conn.getInputStream();
```

直接使用`HttpURLConnection`的成本还是比较高的，另外代码也比较冗余。

### apache HttpClient

后来发现 [Apache httpClient](https://hc.apache.org/httpcomponents-client-5.1.x/) 很好用。

```java
Request.Get("https://z.wiki")
    .execute().returnContent();
```

### OKHttpClient

<ImgView title="okHttpClient" url="https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/" />
也不错。

```java
  private final OkHttpClient client = new OkHttpClient();

  public void run() throws Exception {
    Request request = new Request.Builder()
        .url("https://z.wiki")
        .build();
    client.newCall(request).execute();
  }
```

### RestTemplate

在`spring boot`中也可以用`RestTemplate`

```java
Bo product = restTemplate.getForObject(url, Bo.class);
```

不过，从`Java 11`开始，有了更优的选项，全新的`HttpClient`

### Java11 HttpClient

`Java 11`中全新的`HttpClient`提供了链式调用`api`简化操作，由于该`HttpClient`线程安全且内部通过线程池优化性能，可以创建全局实例。

```java
static HttpClient httpClient = HttpClient.newBuilder().build();
```

`GET`请求示例如下：

```java
package com.itranswarp.oauth.provider;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class T {
  // 线程安全且内部通过线程池优化性能，故创建全局实例
  static HttpClient httpClient = HttpClient.newBuilder().build();

  public static void main(String[] args) throws Exception {
    String url = "https://z.wiki/";
    HttpRequest request = HttpRequest.newBuilder(new URI(url)).build();
    HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    System.out.println(response.body().toString());
  }
}
```

如果接口返回的是`html`内容，可以通过[jsoup](https://jsoup.org/) 进行`html`解析、修改。

如果接口返回的并非是字符串，可以通过`HttpResponse.BodyHandlers.ofByteArray()`、`HttpResponse.BodyHandlers.ofInputStream()`等方式获取到二进制数据（数据流）。

<TheEnd />

