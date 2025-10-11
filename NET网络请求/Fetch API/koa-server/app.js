import Koa from "koa";
import Cors from "koa2-cors";
import KoaRouter from "@koa/router";
import bodyParser from "koa-bodyparser";

let App = new Koa();

// 路由中间件
const Router = new KoaRouter({
  prefix: "/api/v1",
});

// 请数据解析中间件
App.use(bodyParser());

// 跨域处理中间件
App.use(
  Cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
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
  ctx.body = "欢迎使用 Koa Server！";
  await next();
})

  // get
  .get("/random.js", async (ctx, next) => {
    const arr = [
      "http://www.baidu.com",
      2,
      "https://www.2345.com/?kmupiao",
      4,
      "https://iniditordev.smgtech.net",
      "http://mall-test.smgtech.net/index.php",
      7,
      "http://www.runoob.com",
      9,
      10,
    ];
    ctx.body = {
      code: 200,
      data: {
        list: [],
        html: "<b>" + arr[parseInt(Math.random() * 10)] + "</b>",
      },
      message: "get ok!",
      timestamp: Date.now(),
    };
  })

  // post
  .post("/insert", async (ctx, next) => {
    console.log(ctx.request);
    console.log('query:', ctx.query);
    console.log('body:', ctx.request.body);

    ctx.body = {
      code: 200,
      data: {
        list: [],
        res: ctx.request.body,
      },
      message: "post ok!",
      timestamp: Date.now(),
    };
  })

  // put
  .put("/update", async (ctx, next) => {
    console.log(ctx.request);
    console.log('query:', ctx.query);
    console.log('body:', ctx.request.body);

    ctx.body = {
      code: 200,
      data: {
        list: [],
        res: ctx.request.body,
      },
      message: "put ok!",
      timestamp: Date.now(),
    };
  })

  // delete
  .delete("/del", async (ctx, next) => {
    console.log(ctx.request);
    ctx.body = {
      code: 200,
      data: {
        list: [],
      },
      message: "delete ok!",
      timestamp: Date.now(),
    };
  });

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
