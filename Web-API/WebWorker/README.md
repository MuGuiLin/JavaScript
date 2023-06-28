# window.Worker

### 关于单线程的Javascript

> 由于JS最初设计是运行在浏览器中的，为了防止多个线程同时操作DOM，带来渲染冲突问题，所以JS执行器被设计成单线程。但随着前端技术的发展，JS能力远不止如此，当我们遇到需要大量计算的场景时（比如图像处理、视频解码等），JS线程往往会被长时间阻塞，甚至造成页面卡顿，影响用户体验。为了解决单线程带来的这一弊端，Web Worker 应运而生。

[Web Workers API 接口参考 | MDN (mozilla.org)]([Web Workers API - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API))

[Worker() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker)

###  什么是Web Worker 

> `Web Worker` 是 HTML5 标准的一部分，这一规范定义了一套 API，允许我们在 JS 主线程之外开辟新的 Worker 线程，并将一段 JS 脚本运行其中，它赋予了开发者利用 JS 操作多线程的能力。
>
> 因为是独立的线程，Worker 线程与 JS 主线程能够同时运行，互不阻塞。所以，在我们有大量运算任务时，可以把运算任务交给 Worker 线程去处理，当 Worker 线程计算完成，再把结果返回给JS 主线程。这样一来，JS 主线程只用专注处理业务逻辑，不用耗费过多时间去处理大量复杂计算，从而减少了阻塞时间，也提高了运行效率，页面流畅度和用户体验自然而然也提高了。





[一文彻底学会使用web worker - 掘金 (juejin.cn)](https://juejin.cn/post/7139718200177983524)



### 语法：

```js
otherWindow.postMessage(message, targeOrigin, [opt]);
```

字段解释：

- otherWindow：其他窗口的一个引用，比如执行window.open返回的窗口对象；

- message：将要发送到其他window的消息，它将被结构化克隆算法序列化。

- targetOrigin：目标window所在的源。通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"或者一个URI。

  

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

**event的四大属性：**

* type：指的是发送消息的类型；

- data：指的是从其他窗口发送过来的消息对象；

- source：指的是发送消息的窗口对象；

- origin：指的是发送消息的窗口所在的源。



**安全问题：**

（1）如果不希望从其他网站接收message，请不要为message事件添加任何事件侦听器。

（2）如果确实希望从其他网站接收message，请始终使用origin和source属性验证发送方的身份。

（3）当使用postMessage将数据发送到其他窗口时，应该始终指定明确的目标origin,而不是*。恶意网站可以在您不知情的情况下更改窗口的位置，因此它可以用来拦截使用postMessage发送的数据。

**注意：**任何窗口都可以向其他窗口发送消息，并且不能保证的是发送方不会发送恶意消息。但是验证身份后，我们仍然应该始终验证接收到的消息的语法。这是一个万无一失的方式来避免安全问题，防止不可信任的网站利用安全漏洞对您的网站进行跨站点脚本攻击。

