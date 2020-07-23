# js模块化的各种规范 之 CJS、AMD、CMD、UMD、ESM

## 模块化的作用及来由：
> * 主要是现实代码可复用，拥有独立的作用域，防止全局污染，提高开发效率、降低维护成本等等。
> * 有了模块后，我们就可以根据相应的需求加载对应的模块，想要什么功能，就加载什么模块，npm就是最大的模块仓库。
> * 尽管如此，在早些时候，JS模块化规范还是出现了多种规范。
> * 幸运的是，现在及将来，趋势将是ES6中原生支持的ESM规范一统江湖。

## JS模块化规范分类(大至如下5种)： CJS、AMD、CMD、UMD、ESM。

### 一、CJS规范
* 规范代表库：CommonJS
> common.js主要用于后端，在nodejs中，node应用是由模块组成，采用的commonjs模块规范。每一个文件就是一个模块，拥有自己独立的作用域，变量，以及方法等，对其他的模块都不可见。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
 模块加载的顺序，按照其在代码中出现的顺序。

<a target="_blank" href="http://www.commonjs.org">CommonJs官网</a>

#### 代码实例：
```js
    // 定义模块math.js
    var basicNum = 0;
    function add(a, b) {
      return a + b;
    }
    module.exports = { //在这里写上需要向外暴露的函数、变量
      add: add,
      basicNum: basicNum
    }
    
    /** 必须加./路径，不加的话只会去node_modules文件找 **/
    // 引用自定义的模块时，参数包含路径，可省略.js
    var math = require('./math');
    math.add(2, 5);
    
    // 引用核心模块时，不需要带路径
    var http = require('http');
    http.createService(...).listen(3000);
```


### 二、AMD规范：
* 规范代表库：require.js
> RequireJS 是一个JavaScript模块加载器（文件和模块载入工具），使用RequireJS加载模块化脚本将提高代码的加载速度和质量它针对浏览器使用场景进行了优化，并且也可以应用到其他 JavaScript 环境中，例如 Rhino 和 Node.js。

<a target="_blank" href="https://requirejs.org">RequireJS官网</a>、
<a target="_blank" href="https://requirejs.org/docs/download.html">require.js下载</a>

#### 代码实例：
```js
    /** 网页中引入require.js及main.js **/
    <script src="js/require.js" data-main="js/main"></script>
    
    /** main.js 入口文件/主模块 **/
    // 首先用config()指定各模块路径和引用名
    require.config({
      baseUrl: "js/lib",
      paths: {
        "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
        "underscore": "underscore.min",
      }
    });
    // 执行基本操作
    require(["jquery","underscore"],function($,_){
      // some code here
    });
```


### 三、CMD规范：
* 规范代表库：sea.js
> SeaJS是一个JavaScript模块加载框架，可以实现JavaScript的模块化开发及加载机制。
CMD与AMD很类似，不同点在于：AMD推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。此规范其实是在sea.js推广过程中产生的。

<a target="_blank" href="http://seajs.github.io/seajs/docs">SeaJs官网</a>、
<a target="_blank" href="https://github.com/seajs/seajs/releases">sea.js下载</a>

#### 代码实例：
```js
    define(function(require, exports, module) {
        var a = require('./a'); //在需要时申明
        a.doSomething();
        if (false) {
            var b = require('./b');
            b.doSomething();
        }
    });
    
    /** sea.js **/
    // 定义模块 math.js
    define(function(require, exports, module) {
        var $ = require('jquery.js');
        var add = function(a,b){
            return a+b;
        }
        exports.add = add;
    });
    
    // 加载模块
    seajs.use(['math.js'], function(math){
        var sum = math.add(1+2);
    });
```


### 四、UMD规范：
* UMD规范只是一种通用的写法，是在amd和cjs两个流行而不统一的规范情况下，才催生出umd来统一规范的，umd前后端均可通用。

#### 代码实例：
```js
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD
            define(['jquery', 'underscore'], factory);
        } else if (typeof exports === 'object') {
            // Node, CommonJS之类的
            module.exports = factory(require('jquery'), require('underscore'));
        } else {
            // 浏览器全局变量(root 即 window)
            root.returnExports = factory(root.jQuery, root._);
        }
    }(this, function ($, _) {
        // 属性
        var PI = Math.PI;
        
        // 方法
        function a() { };                   // 私有方法，因为它没被返回
        function b() { return a() };        // 公共方法，因为被返回了
        function c(x, y) { return x + y };  // 公共方法，因为被返回了
    
        // 暴露公共方法
        return {
            ip: PI,
            b: b,
            c: c
        }
    }));
```


### 五、ESM规范：
* esm规范是es6原生支持的，很多浏览器开始支持，类似commonjs的写法和同、异步加载机制能通过设置type=module，用于html中，而且在node中也开始支持啦！
> export 向外暴露或导出模块 export default xxx;

> import 引入暴露或导出的模块 import {xx, xx} from './xxx.js';

#### 代码实例：
```js
    /** 定义模块 math.js **/
    var basicNum = 0;
    var add = function (a, b) {
        return a + b;
    };
    export { basicNum, add };
    
    /** 引用模块 **/
    import { basicNum, add } from './math';
    function test(ele) {
        ele.textContent = add(99 + basicNum);
    }
```


 ## 无论有多少种模块化规范 只要搞懂：如何定义(导出)模块 和 如何使用(引用)模块 就OK了！！！** 