# 从 WebSocket 到 SSE，实时通信的轻量化趋势

> 在实时 Web 的世界里，WebSocket 长期以来一直被视为“黄金标准”。每当我们需要构建聊天应用、在线游戏或协同编辑工具时，它强大的全双工通信能力都使其成为不二之选。

然而，在许多场景下，我们真的需要如此“重型”的武器吗？

想象一下这些常见的需求：

- 一个实时更新的**数据大屏**，展示最新的业务指标。
- 一个**新闻网站**，向用户推送突发新闻。
- 一个**后台系统**，当耗时任务完成后给用户发送通知。

在这些场景中，数据流是**单向**的：从服务器到客户端。客户端只是一个被动的接收者。如果这时我们依然选择 WebSocket，就好像为了寄一封信而专门建立了一条双向的私人高速公路——功能强大，但过于复杂且成本高昂。

是时候认识一下 WebSocket 的轻量级表亲了：**Server-Sent Events (SSE)**。它用一种极其优雅和简单的方式，完美解决了单向数据推送的难题。



### SSE 是什么？它为何如此轻量？

Server-Sent Events (SSE) 是一种允许服务器通过**单个、持久的 HTTP 连接**向客户端推送更新的技术。它的魅力在于它的**极简主义**。

**1. 它就是 HTTP，别无其他**

与 WebSocket 需要通过 `ws://` 协议进行复杂的“升级握手”不同，SSE 完全运行在标准的 HTTP/HTTPS 之上。这意味着：

- **无需特殊的服务器**：任何支持 HTTP 长连接的后端框架（Node.js, Python, Go, Java…）都能轻松实现。
- **无缝兼容现有网络**：代理、防火墙、负载均衡器都能自然地处理 SSE，因为对它们来说，这只是一个尚未结束的 HTTP 请求。
- **更少的协议开销**：没有复杂的帧封装，消息就是纯文本，简单直接。



**2. 客户端简单到令人惊喜**

在前端，你不需要引入任何第三方库。浏览器原生提供了 `EventSource` API，使用起来极其简单：

```js
let index = 1;
const msg = document.querySelector("#msg");

// 创建SSE对象，连接SSE服务器的事件流端点，路由为/api/v1/sse
const source = new EventSource("http://localhost:666/api/v1/sse");
console.log(source);

// 监听SSE打开事件
source.onopen = function (event) {
    console.log("onopen", event);
    msg.innerHTML = event.type;
};

source.onmessage = function (event) {
    console.log("onmessage", event.data);
    msg.innerHTML = event.type;
    const { time, message } = JSON.parse(event.data);
    const li = document.createElement("li");
    li.innerHTML = `${time} ${message}`
    ul.append(li);
};

source.addEventListener('update', (event) => {
    console.log(JSON.parse(event.data));
    msg.innerHTML = event.type;
    const { time, message } = JSON.parse(event.data);
    const li = document.createElement("li");
    li.innerHTML = `${time} ${message}`;
    ul.append(li);
});

source.onerror = function (event) {
    console.log("onerror", event);
    msg.innerHTML = event.type;
    // source.close(); // 注：如果不使用source.close()方法来断开连接，浏览器会自动重连的哦！
    const li = document.createElement("li");
    li.innerHTML = `错误重连 ${ index++} 次`;
    ul.append(li);
};

source.onclose = function (event) {
    console.log("onclose", event);
    msg.innerHTML = event.type;
};

```

**就是这么简单！没有复杂的连接状态管理，没有心跳检测，更没有手动重连逻辑。浏览器为你搞定了一切。**



### 直观对比：SSE vs. WebSocket

| 对比维度     | WebSocket                                            | Server-Sent Events (SSE)                                 |
| :----------- | :--------------------------------------------------- | :------------------------------------------------------- |
| **核心定位** | **双向通信**（客户端 ↔ 服务器）                      | **单向推送**（服务器 → 客户端）                          |
| **协议**     | 自定义协议 (`ws://`)，需升级握手                     | **标准 HTTP/HTTPS**，无额外握手                          |
| **复杂度**   | **高**。需要专门的库和服务器实现，需处理心跳和重连。 | **极低**。后端实现简单，前端原生`EventSource` API 即可。 |
| **自动重连** | 否，需要手动实现或依赖库                             | **是**，浏览器原生支持，这是“杀手级”特性。               |
| **数据格式** | 支持文本和二进制                                     | 仅支持 UTF-8 文本（二进制需 Base64 编码）                |
| **最佳场景** | 聊天室、在线游戏、协同编辑                           | **数据大屏、实时通知、状态更新**                         |

**一言以蔽之：** 当你需要双向对话时，用 WebSocket。当你只需要听服务器“广播”时，SSE 是更聪明、更轻量的选择。



### 实战演示：一个简单的实时时钟

让我们看看用 Node.js (Koa) 实现一个 SSE 服务有多简单。

**后端 (koa-service.js):**

```js
import Koa from "koa";
import Cors from "koa2-cors";
import KoaRouter from "@koa/router";
import bodyParser from "koa-bodyparser";

let App = new Koa();

// 路由中间件
const Router = new KoaRouter(
    { prefix: "/api/v1" }
);

// 请数据解析中间件
App.use(bodyParser());

// 跨域处理中间件
App.use(
    Cors({
        origin: function (ctx) {
            // 设置允许来自指定域名请求
            if (ctx.url === "/test") {
                return "*"; // 允许来自所有域名请求
            }
            // return "http://localhost:8080"; //只允许http://localhost:8080这个域名的请求
            return "*";
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
        // allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
        // exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
    })
);

// 默认get路由
Router.get("/", async (ctx, next) => {
    ctx.body = "欢迎使用 Koa Service 666 端口启动成功！";
    await next();
}).get("/sse", async (ctx, next) => {
    // 必须禁用Koa的默认响应处理，否则然会覆盖SSE的响应头
    ctx.respond = false;

    // 设置SSE必须的头部信息
    ctx.res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache", // 禁用缓存
        "Connection": "keep-alive", // 连接控制为持久连接
        "X-Accel-Buffering": "no", // 如果是Nginx反向代理，防止代理服务器缓冲

        // "Access-Control-Allow-Origin": "*", // 允许跨域
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        // "Access-Control-Allow-Headers": "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With",
        // "X-Powered-By": "3.2.1",
    });

    // 每秒向客户端发送数据（当前时间）
    const interval = setInterval(() => {
        // 发送SSE事件, 类型为update
        ctx.res.write(`event: update\n`);

        // 自定义SSE发送事件，类型为message 发送数据
        ctx.res.write(`data: ${JSON.stringify({
            time: new Date().toLocaleTimeString(),
            message: `服务端推送数据${Math.random()}`,
        })}\n\n`); // 数据格式‌：每条消息以\n\n结尾，支持自定义事件类型
    }, 1000);

    // 监听当客户端断开连接时，清除定时器
    ctx.res.on("close", () => {
        clearInterval(interval);
        console.log("客户端已断开连接！");
        ctx.res.end();
    });
})


// 全局中间件
App.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*"); //允许来自所有域名请求(不携带cookie请求可以用*，如果有携带cookie请求必须指定域名)
    //   console.log(ctx);

    await next();
    if (404 == ctx.status) {
        ctx.body = 404;
    }
})

    .use(Router.routes())

    .listen(666, "127.0.0.1", () => {
        console.log(
            "\n\nKoa服务器已启动, 监听 http://127.0.0.1:666 端口，API前缀为 /api/v1！"
        );
    });

```

后端代码清晰明了：设置头部，然后在一个循环里用 `res.write()` 发送格式化的数据即可。

前端代码更是嵌入在 HTML 中，只有短短几行。



### 结论：拥抱简单，选择合适的工具

技术的世界里没有银弹，只有最适合的工具。WebSocket 无疑是强大的，但它的强大也带来了相应的复杂性。对于大量存在的单向数据推送场景，我们完全可以放下手中的“重锤”，拾起 SSE 这把轻巧而锋利的“刻刀”。

下次当你需要实现一个实时数据看板或消息通知系统时，请问自己一个问题：“我真的需要客户端回话吗？”

如果答案是否定的，那么恭喜你，SSE 将以其无与伦比的轻量级魅力，为你节省大量的开发时间和维护成本，让你的应用更加简洁、高效和稳健。