# Web前端开发标准 -> W3C标准

### 构成:

1、结构标准----html4.0 / xhtml1.0 / html5; （结构，骨架）
2、表现标准----css2.0 / css3.0; （样式，布局）
3、行为标准----javaScript, Jquery; （功能，操作）

**各种浏览器之间不兼容问题的解决办法**

| 问题                              | 解决办法          |
| --------------------------------- | ----------------- |
| 1、没有使用正确的DocType          | 正确声明doctype   |
| 2、各浏览器对不同标签的初始值不同 | 统一初始化CSS样式 |
| 3、自身代码书定不规范             | 加以改正          |
| 4、浏览器自身BUG引起              | css hack          |
|                                   |                   |
|                                   |                   |

**URL参数加解密（ASCII码）：**
encodeURIComponent()加密
decodeURIComponent()解码+

**toLocaleString() 方法**：

千分位：

```js
(1234567891024.32).toLocaleString('zh-CN', {
  style: 'currency',
  currency: 'CNY',
}) // '¥1,234,567,891,024.32'
```



下DOM中的默认事件对象
event.preventDefault() 取消事件默认行为
event.stopPropagation() 取消事件冒泡对当前节点无影响
event.stopImmediatePropagation() 取消事件冒泡同时阻止当前节点上的事件处理程序被调用

IE中的事件对象：（ 不符合W3C标准）
event.cancelBubble() 取消事件冒泡
event.returnValue() 取消事件默认行为


在IE下常见的BUG及解决办法(尤其是低版本的IE，如IE6，IE7等)

问题: 解决办法
1、盒模型BUG				使用严格doctype声明

2、双倍margin BUG				_display: inline;

3、不认识a: link				不加: link，直接a就行了

4、3像素margin BUG				规范浮动或清除浮动


点击超链接不跳转:

1：<a href="#"></a>

2：<a href="javascript:void(0)"></a>

3：<a href="javascript:void(null)"></a>

4：<a href="#" onclick="return false"></a>

##  JavaScript基础

网景公司：
作用: 实现用户交互行为, 网页特效, 数据验证等, 它是一种脚本语言, 是弱类型语言，
实现用户交互行为操作----- 通过一些事件-- - 来执行一些操作

js的出现最初就是为了表单的效检而发明的！

JavaScript组成;
1、ECMA Script; (是一个标准ECMA - 262定义) （是js语言的核心）作用： 解释器，翻译，如果没有它，你写的代码，浏览器根本不认识，因为计算机只认二进码：0和1；

2、DOM：Document Object Model: 网页文档  对象  模型   作用操作页面(document)提供访问网页内容的方法和接口

3、BOM：Browser Object Model: 浏览器  对象  模型  作用操作浏览器(window)提供与浏览器交互的方法和接口。


//浏览器对象的弹出方法
window.alert("我的浏览器对象（BOM）的警告框！");

//文档对象的弹出方法
document.write("我是文档对象（DOM）的输出方法！");

//把内容输出(打印)到控制台
console.info("我是输出到控制台的方法，不会在浏览器中显示！");



### 变量
在js中用 var 关键字来声明变量，


变量的命名规范:
1、可读性，能看懂，启有意义的变量名；
2、规范性，符合规则，不能启关键字为变量名；
3、变量名必须以字母a - z, A - Z、下划线"_"开头；
4、变量名区分大小写，如：Mupiao和mupiao是两个不同的变量；
5、变量名长度不能超过255个字符；
6、变量名中不能有空格；

①坨峰命名法：除第一个单词首字母小写外，其余所有单词首字母都大写
例如：var muPiao; 第二个字的首字母大写，

②帕斯卡命名法：与驼峰相似，区别就是所有单词首字母都大写。

例如：NavMenuRedButton

③匈牙利命名法：类型前缀，首字母大写,
	例如：var oDiv1; o表示对象类型，Div表示div

变量作用域：
1、全局变量：①（在方法(函数) 外面声明的），②（在方法内部，但没有加var关键字声明的变量）
例如：
var a = 3;
function test() {
	var a = 2;
	alert(a);
}
test();//执行函数，结果：2；不是3；
例如：
var a = 3;
function test() {
	var a = 2;
	a = 4;
	b = 123; //全局变量（因为没加var关键字）
	alert(a);
	alert(b);
}
test();//执行函数，结果1：4；不是3，或2；结果2:123

2、局部变量：①（在方法(函数) 里面声明的并且用var声明的变量），
例如：
function test() {
	var a = 3;
	alert(a);
}
test();//结果：2；不是3；
闭包(父级关系):
1、子函数可以使用父函数中的局部变量
2、父函数不能使用子函数中的变量



###  常用的JS关键字

var 是根据你所赋的值来决定数据类型的，一个变量最好只存一种数据类型
typeof () 判断数据类型
单体对象：【Global对象 和 Math对象：】

1、Global对象常用的方法:
isNaN() 判断不是数字 如果不是就返回true，如果是就返回false；
parseInt()将字符转为整数
parseFloat()将字符转为小数
eval（变量名，对象名，数组名等); //它能将字符串、对象、数组等 解析 为js代码（用途很多如：传参数，传脚本，动态解析执行等）;

2、Math对象常用的方法:
Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数；
Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数(这也是我们在数学课上学到的舍入规则)


this 当前发生事件的元素!
innerHTML: 几乎所有的元素都有innerHTML属性, 它是一个字符串(获取HTML当前标签的起始和结束里面的内容)


JavaScript eval()函数可计算某个字符串，并执行其中的的 JavaScript 代码
例：
eval("x=10;y=20;document.write(x*y)") //结果：200

document.write(eval("2+2"))  //结果：4
var x = 10
document.write(eval(x + 17))  //结果：27



### JS数据类型
JS数据类型共有两大类：基本类型，引用类型（复合类型）
typeof () 判断数据类型： typeof 返回值有六种可能： "number," "string," "boolean," "object,(注：Null属于object类型)" "function," 和 "undefined."
例如：
var a = 123;
alert(typeof a)
结果：Number
一、基本类型：Number, String, Boolean, Undefined, Null 5种
①Number： 数字类型（整数，小数【最高精度17位小数】，NaN不是一个数(注：js里面 唯一只有NaN 自己不于自己本身的，如：if (NaN == NaN) { 结果：不等于 }) ，lnfinity正无穷，-lnfinity负无穷 ）

* 小数精度例如：
  var a = 0.1, b = 0.2;
  if (a + b == 0.3) {
  alert("等于0.3") ；
  }
  else {
  alert("不等于0.3") ；
  }
  结果：不等于0.3
  * NaN例如：
    var a = parseInt('abc') //将字符转为整数；
    alert(a);
    结果：NaN //不是一个数
    var a = parseInt('123abc') //将字符转为整数；
    alert(a);
    结果：123 //从第1个值开转换，如果第1个值是数字类型就以此再往后，直到不是数字类型就停止
    var a = parseInt('a123abc') //将字符转为整数；
    alert(a);
    结果：NaN //

②String：字符串（单个字符，多个字符）

③Boolean：布尔（真：true，假：false）
什么是真: true: 非零数字, 非空字符串, 非空对象
什么是假: false零数字, 空字符串, 空对象 null

④Undefined：表示：未定义（没有被定义）//一般是变量声明了，但没赋值
⑤Null：表示：空值、空对象 //没有内容/数据               

三、引用类型（复合类型）： object, function;
对象      函数义

JS中一切皆是对象object：因为object由number, string, boolean, undefined, 组成；



### 运算符:

算术运算符：+ ， - ， * ， / ， %

赋值运算符：= ， += ， -= ， *= ， /= ， %=

关系运算符：> ，< ，>= ，<= ，== ，=== ，!= ，!==

=表示【赋值】
== 表示【普通等】，可以经过自动转换，比效的是值，
=== 表示【严格等、全等、恒等】可以经过自动转换，先比效值，再比效数据类型

	* 变量的自动转换：

①例如：
var a1 = 1;
var b2 = true;
if (al == b2) { alert("相等"); }

var a1 = "1";
var b2 = true;
if (al == b2) { alert("相等"); }

var a1 = 1;
var b2 = true;
if (al === b2) { alert("相等"); }
else { alert("不相等") }
结果：不相等
②例如：
var a = "1";
var b = 10;
alert(a + b);
结果：110；//注：此时的+是字符拼接，不是数值计算。

逻辑运算符: && ，|| ，!
	&& 与: 并且, 必须两个为真,

	|| 或: 或者, 两个中只要一个为真即可,
	
	!非: 相反, 单目运算符, 如果是真, 就假, 如果是假, 就真;

( ) 括号, 用括号括起来的优先计算,



### 流程控制: 

if判断语句：
①if (条件) { 执行体。。。 };
②if (条件) { 执行体1。。。 } else { 执行体2。。。 };
②.①	var a = 10 > 2 ? 5 : 3
条件 ? 真：假
alert(a);
结果：5

③if (条件) { 执行体。。。 } else if (条件) { 执行体。。。 } else { 执行体。。。 };


switch判断语句：switch 语句是 if 语句的兄弟语句(在性能上比if..else要好)。

switch (表达式) {
	case 1:
		执行体。。。;
		break;
	case 2:
		执行体。。。;
		break;
	default:
		执行体。。。;
}

每个情况（case ）都是表示“如果 expression 等于 value，就执行 statement”。
关键字 break 【不能少】会使代码跳出 switch 语句。如果没有关键字 break，代码执行就会继续进入下一个 case 。
关键字 default 说明了表达式的结果不等于任何一种情况时的操作（事实上，它相对于 else 从句）。


if (i == 20) { alert("20"); }
else if (i == 30) { alert("30"); }
else if (i == 40) { alert("40"); }
else { alert("other"); }
等价的 switch 语句是这样的：

switch (i) {
	case 20:
		alert("20");
		break;
	case 30:
		alert("30");
		break;
	case 40:
		alert("40");
		break;
	default: //和else差不多意思
		alert("other");
}


使用while语句应注意以下几点：
1、while语句中的表达式一般是关系表达或逻辑表达式，只要表达式的值为真(非0)即可继续循环。
2、循环体如包括有一个以上的语句，则必须用{ } 括起来，组成复合语句。

一、while循环
var i = 1;
while (i < 5) {
	alert(123);
	i++;
}
其中表达式是循环条件，语句为循环体。
while语句的语义是：计算表达式的值，当值为真(非0)时， 执行循环体语句。

二、do while循环 
var i = 1;
do {
	alert(123);
	i++;
} while (i < 5);
这个循环与while循环的不同在于: 它先执行循环中的语句, 然后再判断表达式是否为真, 如果为真则继续循环；
如果为假, 则终止循环。因此, do -while循环至少要执行一次循环语句。

①、for ()循环for()循环
for (var i = 0; i < 100; i++) {
	alert("执行体。。。") ；
},
①.①、for (；；)
{
	alert("无限循环") ；
}

②、for in ()循环
for (var x in x <)

	break: 终止所有循环；(循环结束，到此为止)

continue: 结束当前某一次循环，但是并没有跳出整个循环，只结束一次，而整个循环还在进行

return: 返回值(false, 变量，数值) ：



### 数组: 
定义1: var mupiao = [45, 'abc', 845, true, 1, new Date()];
定义2: var mupiao = new Array([45, 'abc', 845, true, 1, new Date()]);
上面这两种定义方法效果完全相同；
数组的属性：.length
数组的排序：sort([比效函数])



###  Json 

Json和数组的用法一样,

	它们的区别就是:

数组：1、用下标[0123456.....], 2、用lenght取长度，
avr arr = [12, 89, 120];
alert(arr[0]) === 12

Json：1、用字母{ a: 59456, b: "asdfsadf"c: 65.....} 2、Json不能取长度，（取出来就是一串字符串）
var obj = { a: 12, b: 89, c120 };
alert(obj['a']) === 12;

for (var i in obj)//json的下标从1开始的
{ }

Json和数组一起使用，（在Json中可以放：数组，而在数组中可以放：Json）for in
	json: var oBj = { a: 564, b: 4568, c: 'asdas', d: [1, 2, 3, 44, 5] }在Json中同时存：数字，字符串，数组；

		alert(oBj.d[2])输出第4个序号的第3个值: 44;

var arr = [{ a: 1, b: 2, c: 3, d: 'mupiao' }, { a: '你好', b: 132456 }

alert(arr.[0].d)输出第1个序号的第4个值: mupiao;


<script>
	function mupiao(obj,json)//建立一个函数,mupiao (标签,json=(样式,值))
{
   //obj.style[attr]=value;


     var attr='';
     for(attr in json)//用for in 循环
     {
    	obj.style[attr] = json[attr];
        //alert(attr+'==='+json[attr]);
     }

}
window.onload=function()
{
	var oDiv=documetn.getElementById('div1')
	mupiao(oDiv,{width:'100px',heitht:'100px',background:'blue'})//调用上面的json
}
</script>

### 函数:  
function()匿名函数
{ }
function mupiao() { }
function mupiao(noe, two)有参函数
{ erturn; }

arguments: 可变参（不定参：不确定要传多少个参数）可来获取有多个参数，它和数组一起配合使用

用for(){ } 循环，arguments.length; 获取总共有多少个参数

function sum() {
	var result = 0;
	for (var i = 0; i < arguments.length; i++) {
		reseult += arguments[i]
	}
	alert(result);
}
sum(12, 8, 207, 456, 2, 548, 65, 4, 86); 传参；

如：arguments[0]: 这就是获取多个参数中的第1个参数



###  数组: 
定义1: var mupiao = [45, 86, 845, 65, 1, 56];
定义2: var mupiao = new Array[45, 86, 845, 65, 1, 56];
上面这两种定义方法效果完全相同；
数组的属性：.length
数组的排序：sort([比效函数])



### 事件:  
document: 是什么 ?, 本质: document.childNodes[0].tagName
document就是网页(文档), 它位于整个网页的第1个父节点, 是最大最外面的一个标签, 哪怕是头文件, 或者是HTML这个标签都被document包含在里面, 可以这样说: 网页上的所有东西都包含在document里面, 所以它是网页中最顶层的父节点;


1、鼠标事件:
onclick = onmousedown + onmouseup

onclick: 鼠标点击事件

onmousedown: 鼠标按下事件
onmousemove: 鼠标拖动事件
onmouseup: 鼠标抬起事件

onmouseover: 鼠标移入事件
onmouseout: 鼠标移出事件

2、键盘事件:
onpress = onkeydown + onkeyup

onkeydown: 按下按键时的事件
onkeyup: 松开按键时的事件

keyCode: 键盘键值（检测用户按下了哪个按键）

## DOM
document: 是什么 ?, 本质: document.childNodes[0].tagName
document就是网页(文档), 它位于整个网页的第1个父节点, 是最大最外面的一个标签, 哪怕是头文件, 或者是HTML这个标签都被document包含在里面, 可以这样说: 网页上的所有东西都包含在document里面, 所以它是网页中最顶层的父节点;

DOM作用：
它是JS的组件（组成）用来帮助JS操作网页，页面中的元素，如标签，DIV，点击改背景色等，

其是网页是由很多很多的标签(元素)组成的，而标签也叫节点，元素节点分为父节点，和子节点（子节点只有一层，而子节点下面的节点是不算的，比如，ul, 和li, 而li下如果还有标签的节点是不算的，）

创建DOM元素：
createElement(标签名): 创建一个节点；
appendChild(节点) ：追加一个节点；
insertBefore(节点，原有节点) ；在已有元素前插入一个节点；

删除DOM元素：
removeChild(节点) ：删除一个节点；

DOM节点:
childNodes: 获取标签元素的子节点
parentNode(父节点): 获取标签元素的父节点。
nodeType: 节点类型的识别，nodeType == 1 其1是表示元素节点; 3是表示文本节点;
如：alert(document.body.childNodes[0].nodeType): 弹出节点类型
children这个就是childNodes获取元素的子节点的升级版，因为它兼容更多的浏览器, 它作用也是获取元素的子节;

DOM节点：
首尾子节点（有兼容性问题）
兄弟节点（有兼容性问题）

元素属性的操作：
第一种：oDiv.style.display = 'block';
第二种：oDiv.style.['display'] = 'block';
第三种：如下

DOM方式操作元素属性：
获取元素属性：getAttribute('属性名')
设置元素属性：setAttribute('属性名'，'属性值')
删除元素属性：removeAttribute('属性名')

DOM元素的获取方式：
1、document.getElementById('ID名'); 一次选1个，
2、document.getElementsByTagName('标签名'); 标签相同的都被选中，用for（length）
3、document.getElementsByClassName('标签名')函数调用，className
【同时添加多个样式属性】

firefox等可以使用
document.getElementById("id").setAttribute("style", "top:20px;left:20px;color:red;");

IE中则必须使用style.cssText
document.getElementById("id").style.cssText = "top:20px;left:20px;color:red;";

## BOM
作用：是JS用来操作浏览器的(window)
系统对话框：
1、警告框：alert("内容");
2、选择框：confirm（"要提问的内容"），返回boolean布尔值
3、输入框：prompt(), 返回用户输入的字符，或null;

window对象常用事件：

window.onload：当页面加载完成的时候
window.onscroll：当页面滚动的时候
window.onresize：当页面重定大小的时候

window.onresize = window.onload = window.onscroll = function ()


window.scrollTo(100, 500) ：窗口的滚动位置（左上角 X，Y）

alert(window.navigator.userAgent);//弹出查看当前浏览器的版本！

尺寸和坐标:

窗口尺寸、工作区尺寸
function(ev) {
	var oEvent = ev || event;
}

一、可视区尺寸：
1、document.documentElement.clientWidth; 可视区宽度
2、document.documentElement.clientHeight; 可视区高度


二、滚动条距离：
document.body.scrollTop:
document.documentElement.scrollTop滚动条上项部距离
document.documentElement.scrollLeft滚动条左边距离


三、鼠标位置：
event.clientX页面可视区鼠标位置的横坐标
event.clientY页面可视区鼠标位置的竖坐标


四、标签元素尺寸、工作区距离：
offsetParent获取标签元素在页面上的实际位置。

offsetWidth: 获取DIV的宽度, 它包含了DVI的border, padding; 边框，内边距
offsetHeight: 获取DIV的高度, 它包含了DVI的border, padding; 边框，内边距
offsetLeft - 10'px': 元素左边距
offsetTop + 10'px': 元素上边距

### 用getStyle代替offset
function getStyle(obj, attr)//用getStyle代替offsetWidth(因为offsetWidth加上border后会有很BUG，以后都不建议用offsetWidth了)
{
	if (obj.currentStyle)//判断传进来的参数(Div)是否支持currentStyle,
	{
		return obj.currentStyle[attr]
	}
	else {
		return getComputedStyle(obj, false)[attr];
	}
}

### Ajax 
ajax的作用: ajax是一种网页开发技术,
	1、从服务器读取文件（数据）; 如（请求静态的TXT文件，动态数据, json, DOM创建元素，等）
2、无刷新数据读取，(减少服务器压力,)
3、它只能在服务器上去读取数据，
4、局部刷新(异步交互) ：请求前显示部分网页文件, (传统的网页的区别是整体刷新)
5、提高用户体验，
XMLHttpRequest：(IE6不支持)用于在后台与服务器交换数据，在不重新加载整个网页的情况下，对网页的某部分进行更新，

### 文档碎片 
document.createDocumentFragment()文档碎片，

可以提高DOM的操作性能，但在实际应用中也快不了多少，就快几十毫秒左右，
//它是将做的事情，先进行集合，然后再进行一次全部加载，

### cookie的作用 
cookie它就只是一个字符串，让它保存在本地浏览器上，便用户减少输入时间，（记住用户名，记住密码，自动登录笔，）可它cookei进行，创建，查找，删除，
用来保存本地浏览器上页面上的信息，如自动登录, 记信用户名, 记住密码之类的
1.它和浏览器缓存没有任何关系，
2.它完全由JavaScript控制的，
3.在一个网站中共享一套的cookie，
4.cookie有数量（理论上50个）的限制，
5.cookie文件大小也有限制的，
6.cookie有过期时间的，
7cookie是完全存储在本地浏览器的，
8.cookie是在服务器端运行的，

### 日期对象 
var oDate = new Date();//创建日期对象

alert(oDate.getFullYear() + '年' + (oDate.getMonth() + 1) + '月' + oDate.getDate() + '号');//获取当前年，月(是从0开始，所以+1)，日
var myDate = new Date();
myDate.getYear();  //获取当前年份(2位)
myDate.getFullYear();  //获取完整的年份(4位,1970-????)
myDate.getMonth();  //获取当前月份(0-11,0代表1月)
myDate.getDate();  //获取当前日(1-31)

myDate.getDay();  //获取当前星期X(0-6,0代表星期天)

myDate.getTime();  //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours();  //获取当前小时数(0-23)
myDate.getMinutes();  //获取当前分钟数(0-59)
myDate.getSeconds();  //获取当前秒数(0-59)
myDate.getMilliseconds();  //获取当前毫秒数(0-999)

myDate.toLocaleDateString();  //获取当前日期
myDate.toLocaleTimeString();  //获取当前时间
myDate.toLocaleString();  //获取日期与时间

### JS运动 
setInterval(fnuction(), 30)定时器

clearInterval(obj.mupiao)//清除鼠标当前DIV的定时器

obj.mupiao = setInterval(function ()//定义一个定时器，并赋给mupiao

iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);//取整，把iSpeed取出来的小数点去掉，

obj.style.width = obj.offsetWidth + iSpeed + 'px';//向目标移动，



## 面向对象

面对过程: 写起来简单, 直观, 用起来不方便
面向对象: 写起来复杂, 用起来简单

什么是对象:?
	在使用对象时, 只关注对象所提供的功能, 不用关注它的内部细节!(如收音机, JQuery)

面向对象是一种通说的思想, 并非只有在编程中能用, 其实任何事情都可以用!它是在现实生活的些具体事物的转换,

	JS中的面向对象:

可分为: 普通对象(自己手写的) 和 函数对象(系统自带的)

普通对象__proto__ 内部属性 - 指向构造函数 的 原型对象

每个函数对象 对象prototype

封装: 封装对象, 函数, 让外部调用,
	继承: 在已有对象的基础上继承过来, 可增加
多态: 多种功能,

	JS对象的组成:

属性: 变量, 状态, 静态的
方法: 函数, 过程, 动态的


构造函数: 用函数构造一个对象(函数里面装对象)

函数 == (函数, 方法, 事件处理函数, 构造函数)这4种其实都是函数: 当作用不同时, 叫法就不一样!

类           模子
对象(实例)    蛋糕

例: var arr = new Array();

Array类   不具备实际功能, 只能用来构造一个对象
arr对象   真正有功能的, 是实被类构造出来的,


	prototype: 原型(类) = 给一类对元素加方法

重要作用: 可以扩展系统对象

Array.prototype.sum = function ();

JS系统对象:
Window Document Element Function Object Arrar

//构造函数
function Btn(txt, css) {
	this.txt = txt;
	this.css = css;
	//this.toDom = function () {
	//return '<button class="btn '+this.css+'">'+this.txt+'</button>';
	//}
};

//原型方法
Btn.prototype.toDom = function () {
	return '<button class="btn ' + this.css + '">' + this.txt + '</button>';
}

//实例化构造函数 并传参
var red = new Btn('确认', 'red');

//调用实例化方法
document.body.innerHTML = red.toDom();

### JS中给正则表达式加变量
一、字面量
其实当我们定义一个字符串，一个数组，一个对象等等的时候，我们习惯用字面量来定义，例如:
var s = "string";
var a = [1, 2];
var o = {};


如果需要加入变量，那也是十分简单的事情，比如:
var v = "bl";

var s = "string" + v;  //"stringbl"
var a = [1, v];  //[1,"bl"]
var o = { first: v };  //{first : "bl"}


但是，如果碰到了用正则字面量，貌似一切就没这么好了。
var v = "bl";
var re = /^\d+$/gim;
这时，假如你想给\d + 后面加入v这个变量，你会发现，没法弄。因为无论你怎么写，都会被当作正则的一部分来处理。


二、构造函数
在JS的世界中。除了null，undefined。其余皆是对象。
不过，这里肯定有人说，string、number、boolean怎么会是对象呢。
其实虽然我上面那句话不准确，但确实是最直观的感受。因为string、number、boolean在你用的时候，会默认的被相应的基本包装类型给转换成对象。
然后我们又知道，在JS中，所有的对象都是通过构造函数来生成的。
那么，我们就可以用构造函数来代替字面量定义法，例如:
var s = new String("string"); //String对象，toString()后为"string"
var a = new Array(1, 2); //[1,2]
var o = new Object();  //{}


相应的，我们也可以用构造函数来生成正则表达式
var re = new RegExp("^\\d+$", "gim"); //注意，反斜杠需要转义
那么，给它加变量，就和我们前面写的给字符串加变量一样了。
var v = "bl";
var re = new RegExp("^\\d+" + v + "$", "gim"); // re为/^\d+bl$/gim
至此，最初的问题问题也完全解决了。


另外，还有一种方法是用过eval动态执行一段字符串的方法，不过我觉得从各方面来说，都属下策。
var re = eval("/^\\d+" + v + "$/gim")




### 常用JS方法的封装
;(function() {
    let o = function() {
		// this.getById ? ( d.find.ID = function (a, b) {
		// 			if ("undefined" != typeof b.getElementById && p) {
		// 				var c = b.getElementById(a);
		// 				return c ? [c] : []
		// 			}
		// 		})
		// 		:
		// 		(delete d.find.ID, d.filter.ID = function (a) {
		// 			var b = a.replace(ba, ca);
		// 			return function (a) {
		// 				var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
		// 				return c && c.value === b
		// 			}
		// 		})
	};

    o.prototype = {
    	//判断两个数据是否相等
    	arrayEqual: function(arr1, arr2) {
    		if (!arr1 || !arr2) {
    			return false;
    		}
    		if (arr1 === arr2) {
    			return true;
    		}  
    		if (arr1.length != arr2.length) {
    			return false;
    		}
    		for(var i = 0; i < arr1.length; ++i) {   
    			if(arr1[i] !== arr2[i]) {
    				return false;
    			}	
    		}   
    		return true;
    	},
    	
    	//判断是否为手机号
    	isPhoneNum: function (str) {
    		return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
    	},
    	
    	//判断是否为邮箱地址
    	isEmail: function (str) {
    	  	return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    	},
    
    	//判断是否为身份证号
    	isIdCard: function (str) {
    		return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
    	},
    	
    	//判断是否为URL地址
    	isUrl: function (str) {
    		return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
    	},
    
    	//获取Cookie
    	getCookie: function (name) {
    		var arr = document.cookie.replace(/\s/g, "").split(';');
    		for (var i = 0; i < arr.length; i++) {
    			var tempArr = arr[i].split('=');
    			if (tempArr[0] == name) {
    				return decodeURIComponent(tempArr[1]);
    			}
    		}
    		return '';
    	},
    	
    	//设置Cookie
    	setCookie: function (name, value, days) {
    		var date = new Date();
    		date.setDate(date.getDate() + days);
    		document.cookie = name + '=' + value + ';expires=' + date;
    	},
    
    	//删除Cookie
    	delCookie: function (name) {
    		this.setCookie(name, '1', -1); //设置已过期，系统会立刻删除cookie
    	},
    
    	//获取滚动条距顶部的距离
    	getScrollTop: function () {
    		return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    	},
    	
    	//获取当前操作系统
    	getOS: function () {
    		var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '',
    		 	vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '',
    			appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
    		if (/mac/i.test(appVersion)) return 'MacOSX'
    		if (/win/i.test(appVersion)) return 'windows'
    		if (/linux/i.test(appVersion)) return 'linux'
    		if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
    		if (/android/i.test(userAgent)) return 'android'
    		if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
    	},
    
    	//获取浏览器类型和版本
    	getExplore: function () {
    		var sys = {}, ua = navigator.userAgent.toLowerCase(), s;
    		(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
    		(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
    		(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
    		(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
    		(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
    		(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
    		(s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    
    		// 根据关系进行判断
    		if (sys.ie) return ('IE: ' + sys.ie)
    		if (sys.edge) return ('EDGE: ' + sys.edge)
    		if (sys.firefox) return ('Firefox: ' + sys.firefox)
    		if (sys.chrome) return ('Chrome: ' + sys.chrome)
    		if (sys.opera) return ('Opera: ' + sys.opera)
    		if (sys.safari) return ('Safari: ' + sys.safari)
    		return 'Unkonwn';
    	}
    	
    	//随机生成颜色
    	randomColor: function () {
    		return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    	},
    
    	// 生成指定范围随机数
    	randomNum: function (min, max) {
    		return Math.floor(min + Math.random() * (max - min));
    	}
    }
    window.O = new o();
}());