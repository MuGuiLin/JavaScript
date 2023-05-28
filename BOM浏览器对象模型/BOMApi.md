# BOM

## javascript 的组成部分
- DOM (document object model) 文档对象模型
- BOM (browers object model) 浏览器对象模型
- ECMAScript js 的核心

## BOM 下五大对象

### 1、window 对象
- innerWidth/innerHeight
- open 方法

window.open(URL,target,specs,replace)  
  - URL 新窗口地址
  - target 属性 新窗口打开方式
    - _blank
    - _self 
  - specs 新窗口规格
    - width=pixels	窗口的宽度.最小.值为100
    - height=pixels	窗口的高度。最小.值为100
    - location=yes|no|1|0	是否显示地址字段.默认值是yes
    - menubar=yes|no|1|0	是否显示菜单栏.默认值是yes
    - resizable=yes|no|1|0	是否可调整窗口大小.默认值是yes
    - scrollbars=yes|no|1|0	是否显示滚动条.默认值是yes
    - status=yes|no|1|0	是否要添加一个状态栏.默认值是yes
    - titlebar=yes|no|1|0	是否显示标题栏.被忽略，除非调用HTML应用程序或一个值得信赖的对话框.默认值是yes
    - toolbar=yes|no|1|0	是否显示浏览器工具栏.默认值是yes
- close 方法关闭窗口

- scroll 事件
- resize 事件
- 操作滚动条位置
  - window.scrollX、window.scrollY、window.scrollTo()
  - document.documentElment.scrollTop、document.documentElment.scrollLeft

- window 下的各类弹窗
  - alert()
  - confirm('message')
  - prompt([msg],[defaultText])

### 2、location 对象
- hostname
- port 
- protocol 
- href **
- hash **
  - hashChange
- search **
- reload() **
- replace()

### 3、history 对象 **
- back()、
- forward()
- go()
- state
- pushState()
- popstate 
  - history 路由实现原理

### 4、navigator 对象
- userAgent
- appName
  - appVersion

### 5、screen 对象
  width 、height