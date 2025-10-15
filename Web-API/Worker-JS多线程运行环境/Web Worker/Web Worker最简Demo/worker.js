/**
 * 这里是JS的子线程，可以在这里面做一些最复杂的事情（尤其是会堵塞DOM渲染等主线程的事情）
 * 
 * 因为在JS的子线程，不会影响主线程。
 */

console.log('我是子线程 self：', self);

self.addEventListener('message', function (e) {
    /**
     * 在这里可以计算和处理来自主线程的复杂消息任务，不会堵塞主线程
     */
    console.log(e, e.data);

    if (e.data?.send) {
        self.postMessage({ send: true, msg: `👌收到主线程发来的消息：${e.data.msg}`, back: `🌹子线程返回的消息：${new Date()}` });
        setInterval(() => {
            console.log(e.data);

            // self.close();  // 关闭worker
        }, 1000);
    } else {
        self.postMessage('OK，我是子线程发来的消息！');
    }

}, false);

self.addEventListener('error', function (err) {

    console.error('当worker子线程内部出现错误时触发：', err);

}, false);

self.addEventListener('messageerror', function (err) {

    console.error('当 message 事件接收到无法被反序列化的参数时触发：', err);

}, false);
