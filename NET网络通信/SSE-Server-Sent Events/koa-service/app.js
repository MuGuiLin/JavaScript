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
})

    // get
    .get("/sse", async (ctx, next) => {
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
