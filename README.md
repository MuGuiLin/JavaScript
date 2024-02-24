# JavaScript 编程小常识

> JS是一门计算机编程语言（**Web 的编程语言**），是一门动态语言也称为脚本语言，是解析型编程语言。



### 一、JS中的是是非非 

> JS是一门计算机编程语言，
>
> 是一门动态语言也称为脚本语言，是解析型编程语言。
>
> 为什么是脚本？因为他本身不能执行，就是没有main函数或主程序的入口，必须被他的宿主环境（Web浏览器），也就是解析环境解析执行他。
>
> 为是什么是解析型？因为JS不会进行编程，链接，汇编等一系统的过程生成某个文件，再执行，他就是以字符串形式加载执行。



### 二、JS中的真真假假

```js
null、NaN、undefined、false、0、'' 、""  // 这些都为假, 其他都为真！
```



### 三、函数，类，对象，构造器有什么区别? 

​	在js中函数，类，对象，构造器可以说是没有任何区别的，我们可以说函数既为对象，对象既为类，类既为构造器。但一般情况下，我们称对象为那个类的实例，这是为了减少混乱。 
代码如下:

```js
function Person(){ 
} 
const person = new Person(); 

class Person(){ 
} 
const person = new Person(); 
//Person我们可以称为函数，类，对象，构造器(不带参数) 
//person称为对象的引用 
```



###  四、懂this关键字，你就懂JS的五分之一

*** this永远指向调用该方法(函数)的那个对象.(必背)  ***
首先要知道this是什么？ 

* this就是js中的一个对象。是一个对象，不是一个函数，此是的对象你可以看作是一个对象的引用，引用谁？引用调用方法的那个对象. 

* this这个对象存在哪里？存在JS代码中，一般存在于函数之中。如果你把this放到<script>标签中，你可以试下window === this，打印什么?为什么？ 

  代码如下:

```js
function ready() {
    alert(this === window);
}
ready();

//此时打什么？true，为什么？

function Person() {
    this.name = '张三';
    alert(this === window);
}
new Person();

//此时打印什么？false, 为什么？
//把代码加长点.加一个var perso = 
const person = new Person(); 
```



全世界的人都知道person引用了new Person产生的那个对象。new Person创建的是一个JS实例对象，我们就可以绑定属性和方法. 
看下面这段代码:

```js
fn = function () {
}
fn.ready = function () {
    alert(this === fn);
} 
```


当调用fn.ready()的时候打印什么？true ,为什么？ 
十分奇怪，this现在等于一个函数了..为什么？ 



### 五、JS中静态方法和属性将助你一臂之力. 

> 什么是静态.顾名思意:就是不动了，JS中不动的方法是什么？就是不需要创建实例，直接可以通过类名调用方法，哪里都没有动。方法就调用了。不需要任何额外的代码。这只是片面之言。所谓静态:就是属于类的属于类本身的特征. 
> Js中类既为对象，何不能直接绑定属性和方法。当然可以. 
> 代码如下:

```js
fn = function () {
}
fn.name = '张三';
fn.getName = function () {
    return fn.name;
} 
```

这也行，但为什么还要new 的过程，全都这样绑定不就可以了吗？思考 



### 六、prototype和constructor的在JS框架中的影响 

* prototype为原型,是一个对象。 

* constructor为构造器,是一个函数 

* 到现在为止，你要分清楚，什么时候的对象为对象，什么时候的对象是一个函数.也难为JS解析器，能解析运行如此灵活的代码。 

* prototype可以说他是一个类的静态的属性，他指向这个对象的实例。换句话说prototype是一个对象。

* prototype指向的对象和我们new的对象有何区别？建立了一种等价桥梁关系，但不是同一个。当我们在函数prototype上绑定属性的时候，那么属性和值就绑定到了prototype对象上，并没有正真的绑定到那个对象上去。

* 当需要访问那个对象上的这个属性的时候，JS解析器，首先会去从对象本身上去找这个属性，然后再到原型对象上找。 

  

  代码如下:

```js
function Person() {

};
var person = new Person();
    person.name ='张三';
    Person.prototype.name ='李四';

alert(person.name);
delete person.name;
alert(person.name);

// constructor指向一个对象的构造器。(什么是构造器？自己去复习。), 由此可以看出他是一个对象级别的属性。也就是要使用constructor这个属性，必须需要一个对象。
// 那么prototype是一个对象有没有constructor属性？当然有，既然constructor是指构造器，那有没有一个prototype属性？当然有，以此类推, 下面这两段代码是正确的。
constructor.prototype.constructor.prototype.constructor...
prototype.constructor.prototype.constructor.prototype...
```



其实我也不知道到底可以连多长？感兴趣可以试一下。顺便告诉你用递归算法。 
在众多的JS代码中，当我们已知一个对象，要求他的构造器，或者已知一个构造器，求他的对象。应入门了。 



### 七、==和===将判断进行到底

***  ==和===神像形不象.不要去考虑，一眼就看出是做断判是否相等。 ***
有木有区别? 
==判断变量是否相等。 
===判断变量的值相等。 
以此类推:====用来干嘛的？？用来报错的.你懂的.这里只想告诉你，只有==和=== 
JS中变量是弱类型的，都懂。 
代码如下:

```js
var a = 3;
var b = '3';
alert(a == b); //true

// JS中变量的值是强类型的。你懂的.
var a = 3;
var b = '3';
alert(a === b); //false
```



都是var 类型的变量，但他们的值不一样，一个是整形，一个是字符串型. 
var类型和var类型相比，当然是true,整形和字符串型比，当然是false. 
==用来比较他们值是否一样。不会是计较值的类型，只要他们的变量是var类型就可以了。当然是这废话，难不成，你不还能声明第二种变量类型的变量？. 
===用来比较，会去判断他们的值是否为同一类型。如果不是，没有的比较。JS中变量的值是强类型的，有整形，字符串，数字，布尔等。



### 八、typeof和instanceof完成了判断未成的使命 

typeof用来判断基本数据类型 
instanceof 用来判断对象类型是否为某一个类型号 



### 九、5种继承让你如虎添翼.

1、对象冒充 
2、apply 
3、call 
4、prototype 
5、for循环方式 
用法：*** 永远只须记住，JS中的继承只是属性和方法的拷贝。***



### 十、DOM模型结构改变你的思想 

DOM是一种思想，一种将数据以树状结构数据的思想。

* 学习DOM只需要掌握任何一个节点都有一个父节点和0到多个子节点.任何一个节点都有一个页面上的标签表现形式和一个内存对应着一个标签对象.页面只是展示数据的地方，内存中才是DOM对象数据保存地方。

* 任何一个DOM对象只能有一个父节点对象。

* 父子关系可以随时改变。 

> 对象操作：查、增，修，删 
> 内容操作：innerHTML,innerText等 
> 事件操作：mouse,key 
> 样式操作：id、target、class 
> 属性操作：attribute 



### 十一、回调函数减少编写代码 

*** 什么是回调函数? ***

> 在JS中函数名是用来标识一个函数的。既我们可以传递给某个函数一个函数 名(函数名柄),然后由那个函数来自动调用我们的函数完成相关的处理。 
> 调用者与被调用者分开，我们不需要关心调用者，和被调用者。回调可用于通知机制，事件。 



### 十二、函数和arguments 

* 函数名就是函数的句柄，指针，函数名是唯一的，这也成就了JS中没有函数重载。只有函数覆盖。函数名才是唯一标识函数的。 
* 永远需牢访，JS中的函数调用就是在函数名后面加对括号() 
* 函数调用参数可有可无，无论什么情况下，参数都会保存在函数体中的arguments对象中，你可以直接使用他，他是一个对象，参数是以数组形式存放。 



### 十三、闭包(匿名函数)为开发开辟了捷径 

* 闭包是函数内调用函数外的参数，一般也可称为匿名函数，但两者有所不同。 
* 闭包的价值在于可以作为函数对象或者匿名函数，对于类型系统而言这就意味着不仅要表示数据还要表示代码。
* 支持闭包的多数语言都将函数作为第一级对象，就是说这些函数可以存储到变量中、作为参数传递给其他函数，最重要的是能够被函数动态地创建和返回. 
  匿名函数减少了变量名称的冲突，为没有权限作用域的JS提供了权限作用域。
* 当我们需要提供一个接口，但又不想让这个接口对象为全局变量就需要用匿名函数: 

```js
(function () {
    //局部代码，外部永远无法访问，除非你提供一个入口
})();

setInterval(function() {
	//局部代码，外部永远无法访问，除非你提供一个入口
}, 1000);
```



# 五段实用的js高级技巧
> 以下几个js技巧还是蛮实用的，前提是你没用使用别人的js框架，用原生创造效率为前提的代码. 



### 技巧一、【setTimeout】

应用案例:比如你想一个函数循环执行10次,怎么办?以前通常是先setInterval,然后clearInterval,技巧一就是克服这个问题 
代码如下:

```js 
(function () {
    var i = 0;
    function job() {
        console.log(i++);
        if (i < 10) {
            setTimeout(job, 1000);
        }
    }
    job();
})();
```

** 上面这个job函数就只会乖乖的执行10次.然后自动停止 **



### 技巧二、【高效的for循环 】

应用案例: 抛弃传统的循环方式 
代码如下:

```js
(function () {
    var arr = [];
    for (var i = arr.length; i--;) {
        doStuff();
    }
})(); 
```



+ 这个方式为什么高效? 
  - 1、少了一个参数l = arr.length; 
  - 2、for语句中间那个玩意少进行了一次计算,以前的话是for(i = 0; i < l; i++) // 这样的话中间的语句会先比较 i < l 然后比较出来的结果在跟true 或者false比较,自然多了次计算;



### 技巧三、【高效赋值 】

应用案例:抛弃传统的if判断赋值 
代码如下:

```js
var i = 1, ret;
ret = i !== 1 || true;
console.log(ret); 
```

以上代码会很神奇的告诉你ret会是true.高效吧不用if(i!==1)了在赋值了 



### 技巧四、【强悍的简短的attr 】

应用案例:setAttribute,getAttribute.这个方法不仅可以设置标准的属性,还可以设置任意属性,兼容好 
代码如下:

```js
function attr(elem, name, value) {
    var ret;
    if (value) {
        if (/msie [6-7]\.0/i.test(navigator.userAgent)) {
            ret = elem.getAttributeNode(name);
            if (!ret) { //ie6 7不合法的属性设置捕鸟,通过这里可以设置 
                ret = document.createAttribute(name);
                elem.setAttributeNode(ret);
            }
            ret.nodeValue = value + "";
        } else {
            elem.setAttribute(name, value);
        }
        return elem;
    } else { //ie6 7有得属性获取不鸟 
        ret = elem.getAttribute(name);
        fixIe = elem.getAttributeNode(name).nodeValue;
        ret = ret ? ret : fixIe ? fixIe : undefined;
        return ret;
    }
}

//以上方法如何测试呢 ?
attr(document.getElementById("test"), "classxx", "xx");
alert(attr(document.getElementById("test"), "classxx")); 
```



### 技巧五、【getElementsByClassName】 

应用案例 :以前js没什么框架的时候,大家都再模仿这个方法,看看今天我是怎么高效的模仿出它来.这也不愧是js初学者的经典代码 。
代码如下:

```js
(function () {
    var getElementsByClassName = function (cls, context) {
        var root = context || document;
        return document.querySelectorAll ? root.querySelectorAll("." + cls) : root.getElementsByClassName ?
            root.getElementsByClassName(cls) : help("*", cls, context);
    }
    var help = function (tagName, cls, context) {
        var root = context || document,
            ret = [], elems, i,
            rcls = new RegExp("^|\\s+" + cls + "\\s+|$");
        elems = root.getElementsByTagName(tagName || "*");
        for (i = elems.length; i--;) {
            if (rcls.test(elem[i].className)) {
                ret.push(elems[i]);
            }
        }
        return ret;
    }
})(); 
```







## Web浏览器回流 和 重绘的详解

![img](https://pics0.baidu.com/feed/9a504fc2d5628535b1839a989305c5cda6ef6319.png@f_auto?token=8d4a7c54394e3132271cc044ceb1b3b7)

#### 一、浏览器的回流

回流的另一种说法就是重排，它是一种非常明显的改变，它会重新的渲染HTML的渲染树。那为什么我们将重排叫做回流呢？那是因为浏览器的渲染模型是基于从上到下的“流式”模型，也就是我们所了解的文档流模型。当我们在浏览器中，改变页面的DOM或CSSDOM的时候，会触发文档流的联动更改。我们可以把文档流看做是一条河，想像一下，当我们往河里丢一块石头的时候，那么整条河中的每一滴水都会受到影响，都会重新排列，所以我们经常说回流，而不说重排。

> 根据以上信息，也就可以说明，当页面中的一个节点发生了变化时，浏览器就会对结构重新计算，页面会涉及重新布局，而根据重新布局，我们更以根据布局的范围来分为全局布局和局部布局。

**（一）全局布局**

全局布局指的从整个页面中根节点HTML开始 ，根据渲染树的节点信息将整个树都进行重新布局。能够触发全局布局的一些场景有如：更改整个浏览器的窗口大小、修改HTML的字体大小等。

**（二）局部布局**

局部布局指的是根据渲染树所变化的结果，只会对整个渲染树的部分或一个渲染对象来进行重新布局，但局部布局不会渲染整个结构。

总体来说，能够引起浏览器进行回流的一些变化有以下场景：

（1）、页面的初始加载

（2）、浏览器窗口更改大小

（3）、元素字体大小变化

（4）、元素内容变化

（5）、js删除或增加元素

（6）、功能性伪类触发

涉及到的一些代码有以下属性或方法：offsetTop、offsetLeft、offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight、getComputedStyle() 、currentStyle(）。



#### 二、浏览器的重绘

重绘是指的是HTML元素外观的改变而触发的浏览器重新绘制的行为，例如改变元素的vidibility、color等属性。浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。重绘不会带来重新布局，所以不一定会产生回流。但是，如果触发回流的话就一定会涉及重绘。

> 根据重绘的特点，我们可以让经常需要变化的元素，脱离文档流。如采用position、transfrom、display这些可以脱离文档流的元素来进行元素的改变，因为它们可以让元素脱离文档流，所以它们的改变是不会触发重排的。
