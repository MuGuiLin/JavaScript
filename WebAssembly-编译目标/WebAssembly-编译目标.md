# WebAssembly（wasm）编译目标



**🚀官网：[Web 汇编 --- WebAssembly](https://webassembly.org/)**



### [WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)是什么？

[WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Concepts) 是一种能把**除了JavaScript**以外的编程语言编写的代码经过编译器编译转换为能在现代浏览器中运行的代码的技术。

![webassembly.org/css/webassembly.svg](https://webassembly.org/css/webassembly.svg)





### 为什么WebAssembly比JavaScript更快？

就如第一部分所提，`WebAssembly`的性能优势是针对 JavaScript 而言的，下面我们分别从 JavaScript 和 WebAssembly 的执行过程一一对比优势到底在哪：

![js-wb-excute](D:\GitHub\JavaScript\WebAssembly-编译目标\WebAssembly为什么快.png)

**简间来说，**JavaScript 代码一般是人写的，而 WebAssembly 是由编译器编译出来的，是直接针对机器产生的代码，会包含更多对机器性能优异的指令（instructions），这部分差异针对不同的功能代码 WebAssembly 可能会比 JavaScript **快 10%~800%**。

**总的来说，大多数场景下 WebAssembly 比 JavaScript 性能更好是因为：**

- WebAssembly 代码更小的体积；
- 解码 WebAssembly 比解析转译 JavaScript 用的时间更少；
- 优化 WebAssembly 的用时比优化 JavaScript 的更短，因为前者是已经经过一次编译优化并且面向机器的代码；
- WebAssembly 没有重优化这个过程；
- WebAssembly 包含对机器更友好的指令；
- JavaScript 无法人为控制垃圾回收，而 WebAssembly 可以有效控制内存回收的时机；

