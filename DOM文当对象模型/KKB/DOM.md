# DOM

## javascript 的组成部分
- DOM (document object model) 文档对象模型
- BOM (browers object model) 浏览器对象模型
- ECMAScript js 的核心

![DOM树](./DOMltree.gif)

## DOM 节点
- 节点分类
  - 元素节点：每个 HTML元素	
    - 属性节点：HTML元素的属性
  - 文本节点：HTML元素内的文本	
    - 注释节点：注释 <!---->
  - 文档节点：整个文档document		
- 节点类型 --- nodeType
  - 元素节点：1	
    - 属性节点：2
  - 文本节点：3	
    - 注释节点：8
  - 文档节点：9
- 节点名称 --- nodeName
  - 元素节点：与标签名相同	
  - 文本节点：为#text	
  - 注释节点：为#comment
  - 文档节点：为#document    

## DOM关系
- childNodes 子节点
- children 子元素 
- firstChild 第0个子节点
- firstElementChild 第0个子元素
- lastChild 最后一个子节点
- lastElementChild 最后一个子元素
- nextSibling 下一个兄弟节点
- nextElementSibling 下一个兄弟元素
- previousSibling 上一个兄弟节点
- previousElementSibling 上一个兄弟元素
- parentNode 父节点
- offsetParent 定位父级

## DOM 属性操作
注意 . 和 [] 都是 ECMAScript 中，对象的属性操作，对象属性的值会被存在内存中, 想要直接获取存在 文档中属性，或者 想把一个属性设置在文档中我们需要使用DOM 的属性操作
- el.attributes 元素所有属性的集合
- el.getAttribute("attr") 获取属性
- el.setAttribute("attr","val") 设置属性
- el.removeAttribute("attr") 移出属性
- el.hasAttribute("attr") 判断是否有这个属性
- 只要操作了innerHTML 元素的所有子元素上，存在内存中的事件和相关的属性都会丢失。如果希望元素的某些属性在操作了父级的innerHTML 之后，还存在就把这个属性加在 DOM 中

## data 自定义属性
- 在标签中定义data自定义属性：data-key="value";
- 在js操作该元素的 data 自定义属性：el.dataset
    - 获取：el.dataset.key
    - 设置: el.dataset.key = "value"

## 节点操作

### 创建节点
语法：element document.createElement("tagName"); 创建一个节点
参数：tagName 标签名称
返回值：创建好的节点

### 向页面中添加节点
- el.appendChild(node)  在元素的末尾添加一个子级
- el.insertBefore(newNode,oldNode) 在 oldNode 前边添加入 newNode 
- 在使用 appendChild 和 insertBefore时，如果添加是一个页面上已经存在的节点，会先从原位置删除，然后在添加到新的位置去。

### 删除节点
- parent.removeChild(el) 删除掉某个子元素

### 克隆节点
- node.cloneNode(deep) 
    - deep: 默认为false
    - deep 为 true, 克隆元素及属性，以及元素的内容和后代
    - deep 为 false, 只克隆元素本身，及它的属性

## 元素的尺寸获取
- offset
    - offsetWidth  可视宽度
    - offsetHeight 可视高度 
    - offsetLeft   距离定位父级的left坐标 
    - offsetTop    距离定位父级的top坐标

- client
    - clientWidth  可视宽度 - border
    - clientHeight 可视高度 - border
    - clientTop    上边框宽度
    - clientLeft   左边框宽度 

- scroll
    - scrollWidth   内容宽度
    - scrollHeight  内容高度
    - scrollLeft    左右滚动距离
    - scrollTop     上下滚动距离

- getBoundingClientRect()
    - left   元素左侧距离可视区左侧距离
    - top    元素顶部距离可视区顶部距离
    - right  元素右侧距离可视区左侧距离
    - bottom 元素底部距离可视区顶部距离
    - width  可视宽度 
    - height 可视高度

## 表格相关操作
- tBodies、tHead、tFoot、rows、cells

## 其他
- createDocumentFragment
- NodeList 和 HTMLCollection 