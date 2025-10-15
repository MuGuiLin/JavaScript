# Worker-JS多线程运行环境

> 如果你写过一些计算量稍大的 JavaScript 代码，比如图像处理、大量数据排序或者复杂的算法，你几乎肯定遇到过浏览器“卡死”的现象。点击页面没反应，动画也停了，就像整个世界都静止了。
>
> 这就是主线程被阻塞的典型后果。因为主线程既要负责执行 JavaScript，又要负责渲染页面、响应用户操作，一旦它被繁重的计算任务占满，就无暇顾及其他，用户体验便直线下降。
>
> 这个问题的根源，正是“主线程是单线程的”。那么，如何解决呢？
>
> 答案很简单：把这些耗时的计算任务，从主线程上挪开，交给一个**新的线程**去处理。主线程继续轻松地负责人机交互，计算任务在另一个线程里默默进行，算完了再把结果通知主线程。这样，页面不就不会卡顿了吗？
>
> 这，就是 **Web Worker** 诞生的核心思想。



## 关于JavaScript中的线程

> 由于JS最初设计是运行在浏览器中的，为了防止多个线程同时操作DOM，带来渲染冲突问题，所以JS执行器被设计成单线程。但随着前端技术的发展，JS能力远不止如此，当我们遇到需要大量计算的场景时（比如图像处理、视频解码等），JS线程往往会被长时间阻塞，甚至造成页面卡顿，影响用户体验。为了解决单线程带来的这一弊端，Web Worker 应运而生。



[Web Workers API 接口参考 | MDN (mozilla.org)]([Web Workers API - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API))

[Worker() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker)



## 0、postMessage 线程通信

**Web Worker 是 W3C 和 WHATWG 制定的一项标准，允许我们在后台创建一个独立的线程来执行脚本。这个后台线程和主线程是完全隔离的，它们之间通过 `postMessage` 和 `onmessage` API 来通信。**

**语法：**

```js
otherWindow.postMessage(message, targeOrigin, [opt]);

/*
字段解释：
	otherWindow：其他窗口的一个引用，比如执行window.open返回的窗口对象；
	message：将要发送到其他window的消息，它将被结构化克隆算法序列化。
	targetOrigin：目标window所在的源。通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"或者一个URI。
*/
```

**注意：**在发送消息的时候，如果目标窗口的协议、主机或端口三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有当三者完全匹配，消息才会被发送。*如果你明确地知道想要发送到哪个窗口，那么请始终提供一个有确切值的targerOrigin，而不是 ,不提供确切目标将导致数据泄露到任何对数据感兴趣的恶意网站。

**举例：**

```javascript
// 发送方 A页面
let myWindow = window.open();
myWindow.postMessage('Hello World!', 'http://www.xxx.com:8080');


// 接收方 B页面
window.addEventListener('message', function (event) {
	if (event.origin !== 'http://xxx.com:8080') 
		return;
		// 回传消息
		event.source.postMessage(`Hi,收到消息了：${event.data}`,event.origin);
}, false);
```

**event参数的四大属性：**

* type：指的是发送消息的类型；

- data：指的是从其他窗口发送过来的消息对象；

- source：指的是发送消息的窗口对象；

- origin：指的是发送消息的窗口所在的源。



**安全问题：**

（1）如果不希望从其他网站接收message，请不要为message事件添加任何事件侦听器。

（2）如果确实希望从其他网站接收message，请始终使用origin和source属性验证发送方的身份。

（3）当使用postMessage将数据发送到其他窗口时，应该始终指定明确的目标origin,而不是*。恶意网站可以在您不知情的情况下更改窗口的位置，因此它可以用来拦截使用postMessage发送的数据。



**注意：**任何窗口都可以向其他窗口发送消息，并且不能保证的是发送方不会发送恶意消息。但是验证身份后，我们仍然应该始终验证接收到的消息的语法。这是一个万无一失的方式来避免安全问题，防止不可信任的网站利用安全漏洞对您的网站进行跨站点脚本攻击。





## 1、Web Worker：把计算交给“后台”

[一文彻底学会使用web worker - 掘金 (juejin.cn)](https://juejin.cn/post/7139718200177983524)

**什么是Web Worker？** 

> `Web Worker` 是 HTML5 标准的一部分，这一规范定义了一套 API，允许我们在 JS 主线程之外开辟新的 Worker 线程，并将一段 JS 脚本运行其中，它赋予了开发者利用 JS 操作多线程的能力。
>
> 因为是独立的线程，Worker 线程与 JS 主线程能够同时运行，互不阻塞。所以，在我们有大量运算任务时，可以把运算任务交给 Worker 线程去处理，当 Worker 线程计算完成，再把结果返回给JS 主线程。这样一来，JS 主线程只用专注处理业务逻辑，不用耗费过多时间去处理大量复杂计算，从而减少了阻塞时间，也提高了运行效率，页面流畅度和用户体验自然而然也提高了。



**特点：**

1. **独立线程**：Worker 运行在自己的线程里，不会阻塞主线程。
2. **环境隔离**：Worker 线程无法访问主线程的 `window`、`document` 等 DOM 对象，也没有 `alert`、`confirm` 这类 UI 方法。它拥有一个独立的全局对象 `self`。
3. **受限的 API**：出于安全考虑，Worker 内部可以使用的 API 是有限的，但一些常用的 Web API，如 `fetch`、`XMLHttpRequest`、`setTimeout`、`indexedDB` 等还是可以使用的。
4. **同源策略**：Worker 加载的脚本文件必须与主页面同源。



**如何使用？**

使用 Web Worker 非常直观。假设我们有一个耗时的阶乘求和计算。

**`main.js` (主线程)**

```javascript
javascript 体验AI代码助手 代码解读复制代码// 创建一个新的 Worker
const worker = new Worker("worker.js");

// 向 Worker 发送消息，开始计算
console.log("主线程：开始计算...");
worker.postMessage({ number: 40 });

// 监听来自 Worker 的消息
worker.onmessage = function (event) {
  // event.data 是 Worker 返回的结果
  console.log("主线程：收到计算结果 ->", event.data);
};

// 监听错误
worker.onerror = function (error) {
  console.error("主线程：Worker 发生错误 ->", error.message);
};
```

**`worker.js` (Worker 线程)**

```javascript
javascript 体验AI代码助手 代码解读复制代码// 监听来自主线程的消息
self.onmessage = function (event) {
  console.log("Worker：收到计算任务 ->", event.data.number);

  // 执行耗时计算
  let result = 0;
  for (let i = 0; i < 2000000000; i++) {
    result += i; // 模拟一个耗时操作
  }

  // 将结果发送回主线程
  self.postMessage(result);

  // 计算完成后，可以关闭自己
  self.close();
};
```

通过这种方式，即使用户在等待计算结果时，依然可以流畅地与页面进行交互。Web Worker 就像是主线程雇佣的一个计算专家，脏活累活都交给他，自己则专注于“门面工作”。



## 2、Service Worker：网络请求的“代理”

Web Worker 解决了计算密集型任务的问题，但现代 Web 应用面临的另一个巨大挑战是网络。不稳定的网络环境（比如在地铁上）常常导致应用无法使用。我们希望能像原生 App 一样，即使在离线状态下，也能展示一些基本内容，或者在网络恢复后自动同步数据。

**Service Worker** 应运而生。

你可以把它理解为一个位于浏览器与网络之间的**可编程代理服务器**。它也是一个运行在后台的独立线程，但它的职责不是计算，而是**拦截和处理网络请求**。这赋予了它强大的能力，比如：

- **离线缓存**：拦截页面的网络请求，如果发现网络断开，它可以从缓存中返回预先存储好的资源（HTML、CSS、JS、图片等），让应用具备离线访问能力。这就是 PWA (Progressive Web App) 的核心技术之一。
- **消息推送**：即使在浏览器关闭的情况下，也能接收从服务器推送过来的消息，并在桌面弹出通知。
- **后台同步**：在网络恢复时，自动将用户在离线期间产生的数据同步到服务器。

**生命周期：**

Service Worker 的生命周期比 Web Worker 复杂，主要包括三个阶段：`install`（安装）、`activate`（激活）和 `fetch`（拦截请求）。

1. **注册 (Register)**：在主线程中注册 Service Worker 文件。
2. **安装 (Install)**：注册成功后，浏览器会下载并解析 Service Worker 脚本，触发 `install` 事件。这通常是我们缓存核心资源的最佳时机。
3. **激活 (Activate)**：安装成功后，进入 `activate` 状态。这个事件通常用于清理旧版本的缓存。
4. **空闲 (Idle) / 拦截 (Fetch)**：激活后，Service Worker 便会控制其作用域下的页面，监听 `fetch` 事件来拦截网络请求。为了节省资源，如果一段时间没有事件，浏览器可能会终止它，并在下次需要时再唤醒。

**示例：一个简单的离线缓存**

**`main.js` (主线程)**

```javascript
javascript 体验AI代码助手 代码解读复制代码if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker 注册成功，作用域：", registration.scope);
    })
    .catch((error) => {
      console.log("Service Worker 注册失败：", error);
    });
}
```

**`sw.js` (Service Worker 线程)**

```javascript
javascript 体验AI代码助手 代码解读复制代码const CACHE_NAME = "my-cache-v1";
const urlsToCache = ["/", "/styles/main.css", "/script/main.js"];

// 安装阶段，缓存核心资源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("缓存已打开");
      return cache.addAll(urlsToCache);
    })
  );
});

// 拦截网络请求
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果在缓存中找到了匹配的资源，则返回它
      if (response) {
        return response;
      }
      // 否则，正常发起网络请求
      return fetch(event.request);
    })
  );
});
```

Service Worker 的出现，极大地模糊了 Web 应用和原生应用的界限，让 Web 的体验更加可靠和强大。



## 3、Worklet：更轻量、更底层的“插件”

Web Worker 和 Service Worker 功能强大，但它们也有自身的局限。它们是相对“重”的实现，与主线程通信是**异步**的，这意味着存在一定的延迟。在某些需要**高频**和**低延迟**的场景下，比如实时处理音频、在渲染流程中绘制动画，这种延迟是不可接受的。

为了解决这个问题，社区提出了 **Worklet** 的概念。

Worklet 是一种非常轻量、高度专用的 Worker。你可以把它想象成浏览器渲染管线上的一个“插件”或“钩子”（Hook），允许开发者将一小段 JavaScript 代码注入到浏览器渲染引擎的底层流程中。

**核心特点：**

- **轻量**：它们的创建开销很小，生命周期也更短。
- **与主线程不在同一个事件循环**：它们运行在渲染引擎的特定阶段，独立于主线程的事件循环，因此不会被主线程阻塞。
- **上下文受限**：它的 API 限制比 Web Worker 更严格，通常只能访问其特定任务所需的 API。
- **同步执行**：在某些场景下，它的执行是与渲染管线同步的，从而保证了低延迟。

目前，已经落地或正在标准化的 Worklet 主要有以下几种：

1. **PaintWorklet (CSS Painting API)**：允许你用 JavaScript 来绘制 CSS `background-image`、`border-image` 等。当元素的样式需要重绘时，浏览器会调用你的 PaintWorklet 代码，你可以使用一个类似 Canvas 的 API 在指定的区域内进行绘制。
2. **AnimationWorklet**：允许你创建不依赖主线程、与设备刷新率同步的高性能动画。即使用户的主线程卡顿，这些动画依然能流畅运行。
3. **AudioWorklet**：在 Web Audio API 中，它允许开发者直接在音频处理管线中编写 JavaScript 代码来生成、处理或分析音频，实现更复杂的自定义音频效果，而不会因为主线程的延迟导致声音卡顿或爆音。
4. **LayoutWorklet (CSS Layout API)**：这是一个实验性的 API，允许开发者用 JavaScript 自定义元素的布局方式，相当于用代码实现类似 Flexbox 或 Grid 的新布局模式。

**示例：使用 PaintWorklet 创建一个波点背景**

**`main.js` (主线程)**

```javascript
javascript 体验AI代码助手 代码解读复制代码// 注册 PaintWorklet
if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule("houdini-checkerboard.js");
}
```

**`style.css`**

```css
css 体验AI代码助手 代码解读复制代码textarea {
  background-image: paint(checkerboard);
}
```

**`houdini-checkerboard.js` (PaintWorklet)**

```javascript
javascript 体验AI代码助手 代码解读复制代码// 定义一个名为 'checkerboard' 的绘制器
registerPaint(
  "checkerboard",
  class {
    paint(ctx, size) {
      // ctx 是一个类似 Canvas 2D 的上下文
      // size 包含了要绘制的区域的宽和高
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, size.width / 2, size.height / 2);
      ctx.fillRect(
        size.width / 2,
        size.height / 2,
        size.width / 2,
        size.height / 2
      );

      ctx.fillStyle = "#ccc";
      ctx.fillRect(size.width / 2, 0, size.width / 2, size.height / 2);
      ctx.fillRect(0, size.height / 2, size.width / 2, size.height / 2);
    }
  }
);
```

Worklet 将 Web 的可编程性带入了一个新的维度，它让我们有能力去干预和定制浏览器最底层的渲染行为，这是过去无法想象的。

## 总结

回顾一下今天我们认识的这些“工人们”：

- **Web Worker**：是**计算工人**。适合处理与 UI 无关的、密集的计算任务，避免主线程卡顿。
- **Service Worker**：是**网络代理**。负责拦截和处理网络请求，赋予 Web 应用离线能力和消息推送能力。
- **Worklet**：是**渲染插件**。它更轻量、更底层，用于在渲染管线的特定阶段执行高性能、低延迟的代码，如图形绘制、动画和音频处理。

现在，我们再回过头看“JS 是单线程的”这句话，就会有更深刻的理解。

**主线程确实是单线程的**，它依然遵循着事件循环的机制来处理任务。但浏览器这个平台，通过提供 Worker 和 Worklet 这些机制，为我们打开了通往**多线程协作**的大门。

它们就像一个分工明确的团队：主线程是“项目经理”，负责统筹全局、与用户打交道；Web Worker 是“数据分析师”，埋头处理复杂计算；Service Worker 是“后勤总管”，保障网络和离线资源；而 Worklet 们则是“美术和音效专家”，专注于优化最终的视听呈现。

正是有了这些“工人”的协同工作，我们才能在小小的浏览器窗口中，构建出越来越复杂、体验越来越接近原生应用的 Web 世界。



## 推荐链接

- [Web Worker 使用教程 - 阮一峰](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2018%2F07%2Fweb-worker.html)
- [WebWorker 与 ServiceWorker - free-coder](https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1j44y1w7v1)
- [How to communicate with Service Workers - Felix Gerschau](https://link.juejin.cn?target=https%3A%2F%2Ffelixgerschau.com%2Fhow-to-communicate-with-service-workers%2F)

