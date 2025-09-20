# WebAssembly（wasm）编译目标



**🚀官网：[Web 汇编 --- WebAssembly](https://webassembly.org/)**



### [WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)是什么？

[WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Concepts) 是一种能把**除了JavaScript**以外的编程语言(C/C++、C#、Go、Java、Rust、Python等)编写的代码，经过编译器编译转换为能在现代浏览器中运行的代码.wasm的技术。

[WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Concepts) 是一种高性能二进制格式、用于在各种现代硬件上快速运行，与web生态系统无缝集成。2019年12月5日，其正式成为**W3C标准**。

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

![在Web应用中嵌入WebAssembly](D:\GitHub\JavaScript\WebAssembly-编译目标\在Web应用中嵌入WebAssembly.png)





## 实例：将C/C++编译为WebAssembly



[Emscripten](https://emscripten.org/) 是一个开源项目，主要用于将C和C++代码编译为WebAssembly（Wasm），使其能够在Web浏览器、Node.js以及其他支持WebAssembly的运行时环境中运行。



**[🚀下载安装：Download and install — Emscripten 4.0.15-git (dev) documentation](https://emscripten.org/docs/getting_started/downloads.html)**



**[🚀编译 C/C++ 为 WebAssembly - WebAssembly | MDN](https://developer.mozilla.org/zh-CN/docs/WebAssembly/Guides/C_to_Wasm)**



1.下载emsdk

```shell
# emsdk克隆项目代码
git clone https://github.com/juj/emsdk.git

# 进入emsdk目录
cd emsdk
```



2.在Windows上安装

```shell
# 在 Linux 或者 Mac macOS 上
./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
./emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit
# 如果在你的 macos 上获得以下错误
Error: No tool or SDK found by name 'sdk-incoming-64bit'
# 请执行
./emsdk install latest
# 按照提示配置环境变量即可
./emsdk activate latest

# 在 Windows 上
emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit
```



3. C语言代码 hello.c

   ```c
   #include <stdio.h>
   #include <emscripten/emscripten.h>
   
   int main(int argc, char ** argv) {
       printf("Hello World\n");
   }
   
   #ifdef __cplusplus
   extern "C" {
   #endif
   
   int EMSCRIPTEN_KEEPALIVE myFunction(int argc, char ** argv) {
     printf("我的函数已被调用\n");
   }
   
   #ifdef __cplusplus
   }
   #endif
   ```

   

4. 
