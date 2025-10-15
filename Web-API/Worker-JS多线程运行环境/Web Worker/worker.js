// 监听来自主线程的消息
console.log("Worker：self对象：", self);
self.onmessage = function (event) {
    console.log("\n\nWorker：收到计算任务 ->", event.data.loopNumber, typeof event.data.loopNumber);

    if (typeof event.data.loopNumber !== "number") {
        self.postMessage("对不起：loopNumber参数必须是数字！");
        return;
    }
    
    // 执行耗时计算
    let result = 0;
    // for (let i = 0; i < event.data.loopNumber; i++) { // 巨坑：经过多次测试后发现，将从主线程发送过来的参数event.data.loopNumber，直接放在for循环中，会导致循环计算的时间会大大增加（当loopNumber的值为2000000000的情况下，循环耗时90.44秒），原因：由于for循环中的参数event.data.loopNumber，在每循环一次都会重新计算，导致循环时间变长！
    let loop = event.data.loopNumber;                    // 所以：一定要将参数loopNumber，提前计算好，放在一个变量中（这样当loopNumber的值为2000000000的情况下，循环耗时2.03秒，整整少了88秒的耗时！！），循环中直接使用变量loop，从而避免每次循环都重新计算参数event.data.loopNumber，从而提高循环效率！
    for (let i = 0; i < loop; i++) {
        result += i; // 模拟一个耗时操作
    }

    // 将结果发送回主线程
    console.log("Worker：计算完成 ->", result);
    self.postMessage(result);

    // 计算完成后，可以关闭自己
    self.close();
    console.log("Worker：关闭自己！");
};