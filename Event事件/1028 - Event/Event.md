# 事件详解（三）
## 上节课重点知识回顾
- 事件监听
    - target.addEventListener("type",fn,是否捕获|option);
    - target.removeEventListener("type",fn,是否捕获);
- 事件流
    - 事件流顺序：捕获 -> 事件源 -> 冒泡
    - 事件冒泡：当元素触发事件之后，事件会从目标元素开始由下至上逐级依次传播，直到window对象为止，在传递过程中元素也有对应的事件处理函数就会执行，这个过程就是冒泡。
    - 事件捕获：当我们触发一个事件的时候，window 会最先收到消息，会逐级下捕获事件具体发生在哪个元素上，在捕获的过程中，如果元素有对应的事件处理函数，就会执行
- 事件对象
    - e.target 事件源
    - e.stopPropagation() 和 e.cancelBubble = true 取消冒泡
    - e.preventDefault() 和 return false
    - 鼠标位置： e.pageX/e.pageY、e.clientX/e.clientY
- 事件代理
    事件代理(事件委托)：利用冒泡机制将事件统一委托在父祖级上执行，在通过事件源获取到相关元素 - 优点：1)减少事件注册，节省内存; 2)可以给将来的元素添加事件
    - 缺点：1)建议就近委托，否则会导致浏览器频繁的调用处理函数;2)容易出现误判，所以写好相应判断        

## 正课内容
- 滚轮事件
    - mousewheel 和 DOMMouseScroll 事件
    - e.wheelDelta 和 e.detail 滚轮方向
    - 滚轮处理兼容
- 自定义滚动条添加滚轮处理   
- 键盘事件
    - keydown、keyup
    - event.keyCode
    - event.ctrlKey、event.altKey、event.shiftKey
    - event.button
    - 组合键
- 鼠标按键    
- 案例：组合键提交
- 常用表单事件汇总：
    focus、blur、change、input、submit
- 常用表单方法汇总：
    focus()、blur()、select()、submit()
- 案例：自定义提示信息
- 自定义事件 - 扩展：
new Event(typeArg, eventInit)
    typeArg 事件名称
    eventInit
        "bubbles"，可选，Boolean类型，默认值为 false，表示该事件是否冒泡。
        "cancelable",可选，Boolean类型，默认值为 false， 表示该事件能否被取消。
dispatchEvent(event)
- 练习: 键盘操作图片切换
    功能：
        1. 滑动切换，向哪个方向滑动，就向哪个方向切换
        2. 点击箭头，点击哪个方向，切换哪个方向
        3. 键盘：按下哪个方向的按键，就切换哪个方向

## 下节课内容
- 掌握移动端 touch 事件使用
- 掌握 touch 事件和 mouse 事件的区别
- 掌握 touchEvent
- 实现移动端幻灯片