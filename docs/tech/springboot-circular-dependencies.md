# spring 循环依赖

### 何为循环依赖？

<ImgView title="springboot 循环依赖" url="https://2.z.wiki/images/20220522/2ab6af04a2d240b58088d08e1a0553d8.png" />

如上图，某应用中的依赖关系

1. ServiceA -> ServiceC -> ServiceB
2. ServiceB -> serviceD -> serviceC

其中，`ServiceC`和`ServiceB`形成了循环依赖。

在`spring`中，`bean`的创建顺序是从依赖到被依赖方，例如：

`BeanA` -> `BeanB` -> `BeanC`

则`spring`会一次创建`BeanC`、`BeanB`、`BeanA`。
一旦形成循环依赖，则`spring`无法判断出该按何种顺序创建`bean`，并抛出`BeanCurrentlyInCreationException`异常。

<ImgView title="springboot 循环依赖" url="https://2.z.wiki/images/20220522/89b35126a0cb449890c5c87b791d1917.png" />

### 案例实战

```java
@Service
public class ServiceA {

    private ServiceB serviceB;

    @Autowired
    public ServiceA(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}
```

```java
@Service
public class ServiceB {

    private ServiceA serviceA;

    @Autowired
    public ServiceB(ServiceA serviceA) {
        this.serviceA = serviceA;
    }
}
```

当项目中存在以上两个`service`时，服务启动便会报错：


```text
BeanCurrentlyInCreationException: Error creating bean with name 'serviceA':
Requested bean is currently in creation: Is there an unresolvable circular reference?
```

### 解决方案

#### 重构循环依赖

循环依赖往往使我们设计上有问题，公共能力需要提取到单独的`Service`中，但是由于时间、人力成本、历史等多种原因，重构往往不是最佳选择方案。

#### 使用`setter`、`field`注入


```java
@Service
@Data
public class ServiceA {

  @Autowired
  private ServiceB serviceB;

}
```

通过`setter`、`field`注入，被依赖的`bean`会在需要的时候再注入进去。

#### @Lazy

```java
@Service
public class ServiceA {

  private ServiceB serviceB;

  @Autowired
  public ServiceA(@Lazy ServiceB serviceB) {
    this.serviceB = serviceB;
  }
}
```

通过`@Lazy`实现懒注入，在创建`ServiceA`时首先会注入一个代理对象，真正的`ServiceB`会在需要用到的时候才创建。

#### @PostConstruct

通过`@PostConstruct`手动在创建好`Bean`的时候进行注入，避免形成相互依赖。


```java
@Service
public class ServiceA {

  private ServiceB serviceB;

  @Autowired
  public ServiceA(ServiceB serviceB) {
    this.serviceB = serviceB;
  }

  @PostConstruct
  public void init() {
    serviceB.setServiceA(this);
  }
}
```

```java
@Service
@Data
public class ServiceB {

    private ServiceA serviceA;

}
```

#### ApplicationContextAware 与 InitializingBean


```java
@Service
public class ServiceA implements ApplicationContextAware, InitializingBean {
  private ApplicationContext context;
  private ServiceB serviceB;

  @Override
  public void afterPropertiesSet() throws Exception {
    serviceB = context.getBean(ServiceB.class);
  }

  @Override
  public void setApplicationContext(final ApplicationContext ctx) throws BeansException {
    context = ctx;
  }
}
```

```java
@Service
public class ServiceB {

    private ServiceA serviceA;

    @Autowired
    public ServiceB(ServiceA serviceA) {
        this.serviceA = serviceA;
    }
}
```

### 总结

在`spring`中有很多种解决循环依赖的方案，但是如果可能的话，尽量避免循环依赖。

<TheEnd />
