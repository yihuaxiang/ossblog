---
tags: ["前端", "微前端", "巨石应用"]
---

# 微前端在美团外卖的实践

原链接：https://tech.meituan.com/2020/02/27/meituan-waimai-micro-frontends-practice.html

### 背景
微前端是一种利用微件拆分来达到工程拆分治理的方案，可以解决工程膨胀、开发维护困难等问题。随着前端业务场景越来越复杂，微前端这个概念最近被提起得越来越多，业界也有很多团队开始探索实践并在业务中进行了落地。可以看到，很多团队也遇到了各种各样的问题，但各自也都有着不同的处理方案。诚然，任何技术的实现都要依托业务场景才会变得有意义，所以在阐述美团外卖广告团队的微前端实践之前，我们先来简单介绍一下外卖商家广告端的业务形态。目前，我们开发和维护的系统主要包括三端：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967403559-2b9dd2e8-3894-46cb-880c-a27fd4a2d67c.png#clientId=ua231b72a-ea5e-4&from=paste&id=u10738c62&margin=%5Bobject%20Object%5D&name=image.png&originHeight=339&originWidth=1409&originalType=url&ratio=1&size=40548&status=done&style=none&taskId=udd665150-2069-4415-a810-053b2bd8c46)

- PC系统：单门店投放系统PC端
- H5系统：单门店投放系统H5端
- KA系统：多门店投放系统PC端

如上图所示，原始解决方案的三端由各自独立开发和维护，各自包含所有的业务线，而我们的业务开发情况是：

- PC端和H5端相同业务线的**基本业务逻辑一致**，UI差异大。
- PC端和KA端相同业务线的**部分业务逻辑一致**，UI差异小。

在这种特殊的业务场景下，就会出现一个有关开发效率的抉择问题。即我们希望能复用的部分只开发一次，而不是三次。那么接下来，就有两个问题摆在我们面前：

- 如何进行**物理层面的复用**（不同端的代码在不同地址的Git仓库）。
- 如何进行**逻辑层面的复用**（不同端的相同逻辑如何使用一份代码进行抽象）。

我们这里重点看一下物理层面的复用，即：如何在物理空间上使得各自独立的三端系统（不同仓库）引入我们的复用层？我们尝试了NPM包、Git subtree等类“共享文件”的方式后发现，最有效率的复用方式是把三个系统放在一个仓库里，去消除物理空间上的隔离，而不是去连接不同的物理空间。当然，我们三端系统的技术栈是一致的，所以就进行了如下图的改造：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967403583-ae8c2c3e-6069-4f16-9cda-12367dad83b6.png#clientId=ua231b72a-ea5e-4&from=paste&id=u01cf51e6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=412&originWidth=1410&originalType=url&ratio=1&size=48403&status=done&style=none&taskId=u8f603399-9da1-4702-9629-7b54de2031b)
可以看到，当我们把三端系统放在一个仓库中时，通过common文件夹提供了物理层面可复用的土壤，不再需要“共享文件”式地进行频繁地拉取操作，直接引用复用即可。不过，在带来物理层面复用效率提升的同时，也加速了整个工程出现了爆炸式发展的问题，随着产品线从最初的几个发展到现在的几十个之多，工程管理成本也在迅速增长。具体来说，包括如下四个方面：

- 新业务线产品急速增加，同时为了保证三端系统复用效率的最大化，把文件放入同一仓库管理，导致文件数量增长极快，管理及协同开发难度也在不断加大。
- 文件越来越多，文件结构越不受控制，业务开发寻址变得越来越困难。
- 文件越来越多，开发、构建、部署速度变得越来越慢，开发体验在持续下降。
- 不同业务线间没有物理隔离，出现了跨业务线互相引用混乱，例如A业务线出现了B业务线名字的组件。

如下图所示，具体地说明了原有架构存在的问题。为了要解决这些问题，我们意识到需要拆分这些应用，即进行工程优化的常规手段进行“分治”。那么要怎么拆呢？自然而然地我们就想到了微前端的概念。也从这个概念出发，我们参考业界优秀方案，同时也深度结合了广告端实际业务的开发情况，对现有工程进行了微前端的实践与落地。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967403647-52e7fa4a-7e0e-49bd-bb41-5e9e39da2d81.png#clientId=ua231b72a-ea5e-4&from=paste&id=ua8b38318&margin=%5Bobject%20Object%5D&name=image.png&originHeight=662&originWidth=1232&originalType=url&ratio=1&size=100993&status=done&style=none&taskId=u40c70a8e-fc2a-4c59-af10-1d8bb357669)
#### 需求分析
结合现有工程的状况，我们进行了深度的分析。不过，在进行微前端方案确定前，我们先确定了需求点及期望收益，如下表所示：

| **需求点** | **收益与要求** |
| --- | --- |
| **拆分解耦** | （1）按业务领域拆分成不同的仓库进行维护，不同业务线的开发者更加独立，不同业务线之间互不影响。（2）物理层面拆分，加速寻址，新增功能修改Bug更加迅速。（3）逻辑层面拆分，杜绝引用混乱，不会出现A业务线引用B业务线组件的情况。 |
| **加速体验** | （1）开发环境急速启动，提高开发体验。（2）业务线按需打包，急速部署上线。 |
| **侵入性低** | 微前端方案改动原有代码的侵入性降到最小，无需大规模改造，减少甚至消除回归测试的成本。 |
| **学习成本低** | 开发人员无需感知拆分的存在，保持单页应用的开发体验，不需要学习额外的规则。 |
| **统一技术栈** | 为了统一共建与技术沉淀，团队内工程已经统一到了React技术栈，禁止使用不同的技术栈进行开发。 |

#### 方案选择
经过以上的需求分析，我们调研了业界及公司周边的微前端方案，并总结了以下几种方案以及它们各自主要的特点：

- **NPM式**：子工程以NPM包的形式发布源码；打包构建发布还是由基座工程管理，打包时集成。
- **iframe式**：子工程可以使用不同技术栈；子工程之间完全独立，无任何依赖；基座工程和子工程需要建立通信机制；无单页应用体验；路由地址管理困难。
- **通用中心路由基座式**：子工程可以使用不同技术栈；子工程之间完全独立，无任何依赖；统一由基座工程进行管理，按照DOM节点的注册、挂载、卸载来完成。
- **特定中心路由基座式**：子业务线之间使用相同技术栈；基座工程和子工程可以单独开发单独部署；子工程有能力复用基座工程的公共基建。

通过对各个方案特点进行分析，我们将重点关注项进行了对比，如下表所示：

| **方案** | **技术栈是否能统一** | **单独打包** | **单独部署** | **打包部署速度** | **单页应用体验** | **子工程切换速度** | **工程间通信难度** | **现有工程侵入性** | **学习成本** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **NPM式** | 是（不强制） | 否 | 否 | 慢 | 是 | 快 | 正常 | 高 | 高 |
| **iframe式** | 是（不强制） | 是 | 是 | 正常 | 否 | 慢 | 高 | 高 | 低 |
| **通用中心路由基座式** | 是（不强制） | 是 | 是 | 正常 | 是 | 慢 | 高 | 高 | 高 |
| **特定中心路由基座式** | 是（强制） | 是 | 是 | 快 | 是 | 快 | 正常 | 低 | 低 |

经过上面的调研对比之后，我们确定采用了特定中心路由基座式的开发方案，并命名为：**基于React的中心路由基座式微前端**。这种方案的优点包括以下几个方面：

- 保证技术栈统一在React。
- 子工程之间开发互相独立，互不影响。
- 子工程可单独打包、单独部署上线。
- 子工程有能力复用基座工程的公共基建。
- 保持单页应用的体验，子工程之间切换不刷新。
- 改造成本低，对现有工程侵入度较低，业务线迁移成本也较低。
- 开发子工程和原有开发模式基本没有不同，开发人员学习成本较低。
### 微前端实践概览
通过对方案的分析及技术方向上的梳理，我们确定了微前端的整体方案，如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967403737-4d0b02bb-96ad-4ae7-afe0-ecf6c99340d7.png#clientId=ua231b72a-ea5e-4&from=paste&id=uf7f3d949&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1756&originWidth=1712&originalType=url&ratio=1&size=246755&status=done&style=none&taskId=u370569ba-92af-4fd8-b2e4-61f1b18d242)
可以看到，整个方案非常简单明确，即按照业务线进行了**路由级别的拆分**。整个系统可分为两个部分：

- 基座工程：用于管理子工程的路由切换、注册子工程的路由和全局Store层、提供全局库和复用层。
- 子工程：用于开发子业务线业务代码，一个子工程对应一个子业务线，并且包含三端代码和复用层代码。

基座工程和子工程联系起来的桥梁则是**子工程的入口文件地址和路由地址的映射信息**。这些映射信息可以让基座工程准确地发现子工程资源的路径从而进行加载。
#### 微前端架构下的业务变化
经过微前端实践的改造，我们的业务在结构上发生了如下的变化：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967403754-44c7f193-f97b-4e36-b2dd-5b1386c00806.png#clientId=ua231b72a-ea5e-4&from=paste&id=uc590e49b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=850&originWidth=1708&originalType=url&ratio=1&size=200226&status=done&style=none&taskId=ub528b820-cd43-4367-ae74-744c007692c)
如上图所示，我们进行了微前端式的业务线拆分：

- 原有的PC系统、H5系统、KA系统分别改造成了PC基座系统、H5基座系统和KA基座系统。
- 原有的子业务线被拆分成了单独的子仓库，成为了业务线子工程（上图中6个黑框竖列）。
- 业务线子工程分别包含PC端、H5端、KA端以及该业务线复用层的代码（上图中3个纯色背景横列）。

新的拆分使得子工程能够按照业务线进行划分，独立维护。在解决复用层的同时保证了子工程大小可控，即子工程只有单个业务线的代码。而单个业务线的复杂度并不高，也降低了工程维护的复杂度。
采用微前端拆分的方案，使得我们的业务不仅**在纵向上保有了复用的能力**，更重要的是**拥有了横向扩展的能力**，无论产品业务线如何膨胀，我们都可以更轻松地应对。那么为了实现以上的能力，我们做了哪些工作呢？下文我们会详细进行说明。
### 基于React技术栈的中心路由基座式微前端
微前端拆分的方案，我们命名为：基于React技术栈的中心路由基座式微前端。在具体实现上，我们会分为动态化方案、路由配置信息设计、子工程接口设计、复用方案设计和流程方案设计等几个模块来逐一进行说明。
#### 动态化方案
首先，我们需要**路由的管理方案**，使得子工程之间有能力互通切换。其次，我们需要**Store层的方案**，让子工程有能力使用全局Store。并且，我们还需要**CSS的加载方案**，来加载子工程的样式布局。下面来详细说明这三个方案。
**动态路由**
动态路由方案是想要进行路由级别的拆分，首先我们要确定用什么来管理路由？很多实现方案倾向于使用特制路由来管理模块。例如开源框架Single-Spa，实现了自己的一套路由监听来切换子工程，并且需要子工程实现特定的注册、挂载、卸载等接口来完成子工程和基座工程的动态对接，还需要特定的模块管理系统，例如systemjs来辅助完成这一过程。毋庸置疑，这对我们原有工程的改造成本很大，还需要添加额外库，进而造成包体积大小上的开销。并且子工程的开发者需要熟悉这些特定的接口，学习成本也比较高。显然，这对于我们的业务场景和需求来说很不划算。
那么，我们选择什么来做路由管理呢？最终我们使用了React-Router，这样能够保持我们原来的技术栈不变，同时对于工程的侵入也是最低，几乎可以忽略不计。此外，React-Router能完全可以满足我们的需求，而且自动会帮助我们管理页面的加载与卸载，而不是每次切换路由都重新初始化整个子应用，所以在加载速度体验上也是最优的，跟单页应用体验一致。
实现上也很简单，如下图：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967404369-11239540-e26b-45f1-b812-bec942a9b712.png#clientId=ua231b72a-ea5e-4&from=paste&id=u167d3028&margin=%5Bobject%20Object%5D&name=image.png&originHeight=698&originWidth=1548&originalType=url&ratio=1&size=112657&status=done&style=none&taskId=u5c4d0bc4-3dea-4d0c-82dc-a3c202e3738)
上面这个流程图，展示了我们在基座工程中切换到子工程路由时，加载子工程并进行展示的过程。这里的重点步骤是加载子工程入口文件，并动态注册子工程路由的过程。由于我们使用的是React-Router，显然要使用其提供的动态能力来完成。这一过程也非常轻量，由于React-Router从版本4开始有了“破坏级”的升级，于是我们就调研了两种方式进行动态加载路由（目前我们使用的是React-Router版本5），如下表所示：

| **React-Router 版本** | **动态加载方式** |
| --- | --- |
| 3 | 利用Route的getChildRoutes的API异步加载路由。 |
| 4及以上 | 版本4及以上，React-Router在实现思路上有了非常大的变动，即不再以提前注册路由的集中式路由为设计理念，转变成路由即组件的思路。对于动态加载路由来说，就是动态加载组件，使得我们的动态加载更加容易实现，无须依赖任何API，只需写一个异步组件即可。 |

React-Router版本3中，实现的基本代码思路如下：
_// react-router V3 用于接收子工程的路由_ **export** **default** () => (     <**Route**         path="/subapp"         getChildRoutes={(location: any, cb: any) => {             const { pathname } = location.location;             // 取路径中标识子工程前缀的部分, 例如 '/subapp/xxx/index' 其中xxx即路由唯一前缀             const id = pathname.split('/')[2];             const subappModule = (subAppMapInfo as any)[id];             if (subappModule) {                 if (subappRoutes[id]) {                     // 如果已经加载过该子工程的模块，则不再加载，直接取缓存的routes                     cb(null, [subappRoutes[id]]);                     return;                 }                 // 如果能匹配上前缀则加载相应子工程模块                 currentPrefix = id;                 loadAsyncSubapp(subappModule.js)                     .then(() => {                         // 加载子工程完成                         cb(null, [subappRoutes[id]]);                     })                     .catch(() => {                         // 如果加载失败                         console.log('loading failed');                     });             } else {                 // 可以重定向到首页去                 goBackToIndex();             }         }}     /> );
而在React-Router版本4中，实现的基本代码思路如下：
**export** **const** AyncComponent: React.FC<{ hotReload?: number; } & RouteComponentProps> = ({ location, hotReload }) => {     _// 子工程资源是否加载完成_     **const** [ayncLoaded, setAyncLoaded] = useState(false);     _// 子工程url配置信息是否加载完成_     **const** [subAppMapInfoLoaded, setSubAppMapInfoLoaded] = useState(false);     **const** [ayncComponent, setAyncComponent] = useState(null);     **const** { pathname } = location;     _// 取路径中标识子工程前缀的部分, 例如 '/subapp/xxx/index' 其中xxx即路由唯一前缀_     **const** id = pathname.split('/')[2];     useEffect(() => {         _// 如果没有子工程配置信息, 则请求_         **if** (!subAppMapInfoLoaded) {             fetchSubappUrlPath(id).then((data) => {                 subAppMapInfo = data;                 setSubAppMapInfoLoaded(true);             }).catch((url: any) => {                 _// 失败处理_                 goBackToIndex();             });             **return**;         }         **const** subappModule = (subAppMapInfo **as** any)[id];         **if** (subappModule) {             **if** (subappRoutes[id]) {                 _// 如果已经加载过该子工程的模块，则不再加载，直接取缓存的routes_                 setAyncLoaded(true);                 setAyncComponent(subappRoutes[id]);                 **return**;             }             _// 如果能匹配上前缀则加载相应子工程模块_             _// 如果请求成功，则触发JSONP钩子window.wmadSubapp_             currentPrefix = id;             setAyncLoaded(false);             **const** jsUrl = subappModule.js;             loadAsyncSubapp(jsUrl)                 .then(() => {                     _// 加载子工程完成_                     setAyncComponent(subappRoutes[id]);                     setAyncLoaded(true);                 })                 .catch((urlList) => {                     _// 如果加载失败_                     setAyncLoaded(false);                     console.log('loading failed...');                  });         } **else** {             _// 可以重定向到首页去_             goBackToIndex();         }     }, [id, subAppMapInfoLoaded, hotReload]);     **return** ayncLoaded ? ayncComponent : null; };
可以看到，这种方式实现起来非常简单，不需要额外依赖，同时满足了我们“拆分”的诉求。
**动态Store**
对于Store层，我们原工程使用的是Redux，子工程通过路由动态注册进来天然就可以访问到全局Store，所以对于Store的访问能够自动支持。那么，如果子工程想要注册自己的全局Store该怎么办呢？而且我们还用了redux-saga来作为异步处理方案。redux-saga如何动态注册呢？还是利用它们各自的API就可以达到我们的目的？从下图中可以看到，支持动态Store也是花费很小的改造成本就可以完成。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967404684-368895dc-a8f7-4747-b27b-f4fcd27d6f4e.png#clientId=ua231b72a-ea5e-4&from=paste&id=u40cb014a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=839&originWidth=1269&originalType=url&ratio=1&size=189756&status=done&style=none&taskId=u3d1537f1-1d4f-4e77-af2d-6968b60875c)
**动态CSS**
同样的对应子工程的样式布局，我们也需要通过某种途径加载到基座工程中来。这个很自然地用异步加载CSS文件通过style标签注入来完成，不过这里需要注意两个问题：
一个问题是，加载子工程的JS入口文件和CSS文件可以同时发起请求，但是需要保证CSS文件加载完成后再进行JS入口文件的路由注册。因为如果路由先注册了页面就会显示出来，如果这时CSS文件还没有加载完毕，就会出现页面样式闪动的问题。我们通过先加载CSS再加载JS的策略来避免这个问题的发生。
另一个问题是，怎么保证子工程的CSS不会和其他子工程冲突。我们利用PostCSS插件在编译子工程时，按照分配给子工程的唯一业务线标识，为每一组CSS规则生成了命名空间来解决这个问题。而子业务线开发者是没有感知的，可以没有“心智负担”地书写子工程的样式。
#### 路由配置信息方案
在动态加载方案确定之后，基座工程怎么才能知道子工程的资源路径，进而加载对应的JS和CSS资源呢？我们需要一组映射信息。如下图所示，业务线唯一标识为Key，相应的静态资源地址为Value。这样的话，当基座工程切换到子工程时就可以拉取这个配置信息，在路由切换时准确地找到对应的子工程，进而进行后续的资源加载过程。这里可能会遇到的一个问题，即如果JS和CSS过大，是否能进行拆分？
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967404938-3c009481-b119-4669-991f-6de7949cf340.png#clientId=ua231b72a-ea5e-4&from=paste&id=u0dbf35fc&margin=%5Bobject%20Object%5D&name=image.png&originHeight=545&originWidth=1209&originalType=url&ratio=1&size=115448&status=done&style=none&taskId=u216301ca-1839-41b5-badc-040df986d42)
根据我们业务的实际情况，目前静态资源的大小是可控的，无需注册多个，单一入口地址完全能够满足我们的业务需求，并且由于我们的改造完全基于现有技术栈。如果业务很复杂，完全可以在子工程中通过webpack的动态import进行路由懒加载，也就是说，子工程完全可以按照路由再次切分成chunks来减少JS的包体积。至于CSS本身就很小，长期也不会有进行切分的需要。
#### 子工程接口方案
子工程需要暴露它要注册给基座工程的对象，来进行基座工程加载子工程的过程。在子工程入口文件中定义registerApp来传递注册的对象，主要代码如下：
```vue
import reducers from 'common/store/labor/reducer';
import sagas from 'common/store/labor/saga';
import routes from './routes/index';
function registerApp(dep: any = {}): any {
    return {
        routes, // 子工程路由组件
        reducers, // 子工程Redux的reducer
        sagas, // 子工程的Redux副作用处理saga
    };
}
export default registerApp
```
我们这里暴露了子工程的三个对象：这里最重要的就是routes路由组件，就是在写React-Router（版本4及以上）的路由。子工程开发者只需要配置routes对象即可，没有任何学习成本，其代码如下：
```vue
/**
 * 子工程路由注册说明
 * 如注册的路由如下：
 * path: 'index'
 * 路由前缀会被追加上，路由前缀规则见变量urlPrefix
 * 在主工程的访问路劲为：/subapp/${工程注册名称}/index
 */
const urlPrefix = `/subapp/${microConfig.name}/`;
const routes = [
    {
        path: 'index',
        component: IndexPage,
    },
];
const AppRoutes = () => (
    <Switch>
        {
            routes.map(item => (
                <Route
                    key={item.path}
                    exact
                    path={`${urlPrefix}${item.path}`}
                    component={item.component}
                />
            ))
        }
        <Redirect to="/" />
    </Switch>
);
export default AppRoutes;
```
除了上方的routes对象，还剩下两个接口对象是：reducers和sagas，用于动态注册全局Store相关的数据和副作用处理。这两个接口我们在子工程中暂时没有开放，因为按照业务线拆分过后，由于业务线间独立性很强，全局Store的意义就不大了。我们希望子工程可以自行处理自己的Store，即每个业务线维护自己的Store，这里就不再展开进行说明了。
#### 复用方案
基座工程除了路由管理之外，还作为共享层共享全局的基建，例如框架基本库、业务组件等。这样做的目的是，子业务线间如果有相同的依赖，切换的时候就不会出现重复加载的问题。例如下面的代码，我们把React相关库都以全局的方式导出，而子工程加载的时候就会以external的形式加载这些库，这样子工程的开发者不需要额外的第三方模块加载器，直接引用即可，和平时开发React应用一致，没有任何学习成本。而和各个业务都相关的公用组件等，我们会放到wmadMicro的全局命名空间下进行管理。主要代码如下：
```vue
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';
import * as Axios from 'axios';
import * as History from 'history';
import * as ReactRedux from 'react-redux';
import * as Immutable from 'immutable';
import * as ReduxSagaEffects from 'redux-saga/effects';
import Echarts from 'echarts';
import ReactSlick from 'react-slick';
​
function registerGlobal(root: any, deps: any) {
    Object.keys(deps).forEach((key) => {
        root[key] = deps[key];
    });
}
registerGlobal(window, {
    // 在这里注册暴露给子工程的全局变量
    React,
    ReactDOM,
    ReactRouterDOM,
    Axios,
    History,
    ReactRedux,
    Immutable,
    ReduxSagaEffects,
    Echarts,
    ReactSlick,
});
export default registerGlobal;
```
#### 流程方案
在确定了程序拆分运行的整体衔接之后，我们还要确定开发方案、部署方案以及回滚方案。我们如何开始开发一个子工程？以及我们如何部署我们的子工程？
**开发流程**
有两种开发方案可以满足独立开发的目的：第一种是提供一个基座工程的Dev环境，子工程在本地启动后在Dev环境进行开发，这种开发方式要求有一套基座工程的更新机制，例如基座工程更新后要同步部署到Dev环境。第二种是子工程开发者拉取基座工程到本地并启动本地开发环境，然后拉取子工程到本地，再启动子工程本地开发环境进行开发，这种开发方式是目前我们使用的方式。如下图所示，我们提供了子工程脚手架来快速创建子工程，开发者无需做任何配置和额外学习成本，就可以像开发React应用一样进行开发。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967405232-7bc6e768-3307-493d-a8b2-c1dd0b68dbbe.png#clientId=ua231b72a-ea5e-4&from=paste&id=u27368156&margin=%5Bobject%20Object%5D&name=image.png&originHeight=840&originWidth=1410&originalType=url&ratio=1&size=150120&status=done&style=none&taskId=uf86828a6-75c8-475c-a351-761a1c7b9b9)
**热更新**
在开发过程中，我们希望我们的开发体验和开发单页应用的体验一致，也要支持热更新。由于我们的拆分，实际上有两个服务，即基座和子工程，所以我们以上图的方式完成了热更新的支持：在子工程的module.hot中通过再次触发基座工程中的JSONP钩子来通知基座工程，来再次触发renderApp达到子工程更新代码则页面热刷新的目的。主要代码如下：
_// 在子工程入口文件_ **import** routes **from** './routes/index'; **function** **registerApp**(dep: any = {}): **any** {     **return** {         routes,     }; } **if** ((module **as** any).hot) {     (module **as** any).hot.accept('./routes/index', (): any => {         window.wmadSubapp(registerApp, true); _// 支持子工程热加载的信息传递_     }); } **export** **default** registerApp
**Mock数据**
子工程目前Mock数据的方式有三种：一是在基座本地Mock，这种Mock方式天然支持，因为基座工程基于外卖工程化Nine脚手架进行开发，本身支持本地Mock。二是支持子工程本地Mock。三是使用公共Mock服务YAPI。目前子工程开发的Mock功能结合第一种方式和第三种方式进行。
#### 部署方案
最后是部署方案，我们达成了独立部署上线的目的，即子工程发布不需要基座工程的参与。之前所有子业务线都在一个工程中，打包速度随着业务线的膨胀越来越慢，而如下的方案使得子工程的开发和部署完全独立，单个业务线的打包速度会非常快，从之前的分钟级别降到了秒级别。如下图所示，可以看到，子工程部署只需要把子工程打包，并在上传CDN之后，把配置信息更新即可，因为配置信息中有子工程新的资源地址，这样就达到了发布上线的目的。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967405223-21cefae3-01c4-4a45-a778-e3f5c42f5735.png#clientId=ua231b72a-ea5e-4&from=paste&id=u09a70422&margin=%5Bobject%20Object%5D&name=image.png&originHeight=716&originWidth=1190&originalType=url&ratio=1&size=87333&status=done&style=none&taskId=u51cf930a-e3c5-4253-b3c9-b0dabb39c9c)
整个部署过程我们是托管到Talos（美团内部自研的部署工具）上的，配置信息我们是托管到Portm（美团内部自研的文件存储）上的（通过我们开发的Talos的插件UpdatePubInfo-To-Portm来更新我们的配置信息）。在静态资源上传到CDN之后，就可以更新配置信息，供主工程调用，也就完成了子工程上线的过程。利用美团现有服务，我们很迅速地完成了子工程单独部署上线的整个流程。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967405348-287c0bb1-116c-4b05-bfc2-72012eef1438.png#clientId=ua231b72a-ea5e-4&from=paste&id=u6740d7b1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=184&originWidth=1920&originalType=url&ratio=1&size=64535&status=done&style=none&taskId=u9dd947c3-10ca-4667-b28d-c42830a233f)
#### 回滚方案
在部署方案中，我们通过Talos进行部署，它本身就带有回滚功能。得益于子工程的发布和普通工程的发布并没什么本质不同，都是将静态资源放置到CDN上，通过静态资源的的contenthash值来区分不同版本，所以回滚的时候，Talos取到上个版本（或者某个前版本）的静态资源，再通过Portm更新我们的配置信息即可完成。整个过程和普通工程没有区别，发版人员只需简单地点下回滚按钮即可。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967406021-7cc46b12-52b4-411e-bb6a-198ba0b220cd.png#clientId=ua231b72a-ea5e-4&from=paste&id=uf79da91b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=348&originWidth=1920&originalType=url&ratio=1&size=69191&status=done&style=none&taskId=u07cb5342-6a9c-48ee-bcc4-0e20fe45d4e)
#### 监控方案
改变了原有的开发模式后，我们还对几个关键节点进行了监控报警的埋点。利用美团CAT（已经在GitHub上开源）和天网（美团内部的监控系统），我们分别在子工程的配置信息、静态资源加载等节点上进行了埋点上报，统计子工程加载成功率，及时发现可能出现的子工程切换问题。具体情况如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/100706/1633967406150-5d5cb71e-62a6-42a0-82fd-d6e7e6010ce0.png#clientId=ua231b72a-ea5e-4&from=paste&id=ufa3072b8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=469&originWidth=1920&originalType=url&ratio=1&size=141987&status=done&style=none&taskId=ud6ea54ec-ea0c-470b-a56b-84729cca3dd)
上方左图是按照端维度进行统计的示例，上方右图是PC端按照产品线统计加载成功数的示例。默认都是统计当天的数据，显示‘-’的表明当前没有数据。对资源加载的监控目前有三种类型：JSON、JS和CSS，资源加载失败的统计也包含这三种类型。天网的监控按照分钟级进行，每分钟内如果有加载失败就会发出报警，偶尔的报警可能是用户网络的问题，如果出现大批量的报警就要引起重视了。
### 总结
以上就是微前端在外卖商家广告端的实践过程。总的来说，我们完成了以下的目标：

- 按照领域（业务线）拆分工程，工程的可维护性得到提高，相关领域进行了内聚，无关领域进行了解耦。
- 子工程提供了PC、H5、KA三端的物理复用土壤，消除了工程膨胀问题，工程大小也变得可控。
- 子工程打包速度从分钟级降为秒级，提高了开发体验，加快了上线的速度。
- 子工程开发支持热更新，开发体验不降级。
- 子工程能够单独开发、单独部署、单独上线，业务线间互不影响。
- 整体工程改造成本低，插拔式开发，无侵入式代码，在正常业务开发的同时短期内就可以完成上线。
- 开发者学习成本低，完整地保留了单页应用开发的开发体验，开发者可快速上手。
- 目前在美团广告端，以微前端模式上线的子业务线已经有很多个。另外还有多个正在开发的微前端子工程，剩余在主工程中的子业务线后续也可以无痛迁移出来成为子工程。我们内部也在此过程中搜集了不少意见反馈，未来继续在实践中进行思考和完善。在此过程中，我们深知还有很多做得不够完善甚至存在问题的地方，欢迎大家跟我们进行交流，帮我们提出宝贵意见或者给予指导。当然也欢迎大家加入我们团队，一起共建。
### 作者简介
张啸、魏潇、天尧，均为美团外卖前端团队研发工程师。
### 招聘信息
美团外卖广告前端团队诚招高级前端开发、前端开发专家。我们为商家提供变现服务平台，为用户提供优质广告体验，是外卖商业变现中的重要环节。欢迎各位小伙伴的加入，共同打造极致广告产品。感兴趣的同学可投递简历至：tech@meituan.com（邮件标题注明：美团外卖广告前端团队）
