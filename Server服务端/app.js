const Koa = require('koa');
const Router = require('koa-router')();

const App = new Koa();

/*
常用的请求方式：
    1、GET      获取资源
    2、POST     创建资源
    3、PUT      更新资源
    4、PATCH    修改资源
    5、DELETE   删除资源

    6、OPTIONS
    7、HEAD
    8、TRACT
    9、CONNECT
*/


Router
    // GET请求会向数据库发索取数据的请求，从而来获取信息，该请求就像数据库的select操作一样，只是用来查询一下数据，不会修改、增加数据，不会影响资源的内容，即该请求不会产生副作用。无论进行多少次操作，结果都是一样的。
    .get('/', (ctx, next) => {
        // console.log(ctx.header, ctx.url);
        ctx.body = Math.random();
    })

    // POST请求同PUT请求类似，都是向服务器端发送数据的，但是该请求会改变数据的种类等资源，就像数据库的insert操作一样，会创建新的内容。几乎目前所有的提交操作都是用POST请求的。
    .post('/api', (ctx, next) => {
        ctx.starts = 200;
        ctx.set('Set-Cookie', 'uid=1080598'); //在浏览器上设置cookie
        ctx.body = {
            starts: 1,
            data: {
                list: [{ name: 'mupiao', sex: '男', age: 28, job: 'Web前端开发' }],
                boox: ['HTML5', 'CSS3', 'ECMASCRIPT6', 'JQUEYR', 'ANGULAR', 'REACT', 'VUE', 'NODEJS', 'EXPRESS', 'KOA', 'EJS', 'JADE', 'TAR-TREMENT', 'GITHUB', 'WEBPACK', 'FIS3']
            }
        }
    })

    .post('/set', (ctx, next) => {
        ctx.starts = 200;
        ctx.set('Set-Cookie', 'uid=1080598'); //在浏览器上设置cookie
        ctx.body = {
            starts: 1,
            data:  ['HTML5', 'CSS3', 'ECMASCRIPT6']
        }
    })

    // PUT请求是向服务器端发送数据的，从而改变信息，该请求就像数据库的update操作一样，用来修改数据的内容，但是不会增加数据的种类等，也就是说无论进行多少次PUT操作，其结果并没有不同。
    .put('/put', (ctx) => {

        ctx.body = 'OK 更新成功！';
    })

    // DELETE请求顾名思义，就是用来删除某一个资源的，该请求就像数据库的delete操作。
    .delete('/del', ctx => {

        ctx.body = 'OK 删除成功！';
    })



App
    .use(async (ctx, next) => {

        // ctx.set("Access-Control-Allow-Origin", "*"); //允许所有请求源（域名）
        // ctx.set("Access-Control-Allow-Origin", "http://localhost:8000, http://baidu.com"); //只允许指定的请求源（域名）

        // console.log(ctx.header);
        ctx.set("Access-Control-Allow-Origin", ctx.header.origin); //自动获取请求源（域名） 设置cookie时要指定请求源（域名）才行哦！！！

        ctx.set("Access-Control-Allow-Credentials", true); //允许在浏览器上设置cookie

        //注：如果是非简单请求时：可以在这里设置允许请求的方法，以便响应二次请求
        if ('OPTIONS' === ctx.method.toUpperCase()) {
            console.log('发送了非简单请求！');
            ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
            ctx.set('Access-Control-Allow-Headers', 'xhr-mupiao');  //允许的自定义请求头名称
            ctx.set('Access-Control-Max-Age', '-1');  //是否缓存预检请求 -1 不缓存 或 缓存时间，以秒为单位
            ctx.body = '发送了非简单请求';
        };

        await next();

        if (404 == ctx.status) {
            ctx.body = 404;
        };
    })

    .use(Router.routes())

    .listen(3000, '127.0.0.1', function (par) {
        console.log('监听127.0.0.1:3000端口');
        //console.log('Koa', App, Router);
    });