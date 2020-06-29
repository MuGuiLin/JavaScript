# 移动端事件

## 上节课内容回顾
- 实现移动端幻灯片

## 本节课知识点
- orientationchange 监听横竖屏切换
- window.orientation 检测手机横竖屏
- devicemotion 监听手机加速度发生变化
  - acceleration 手机加速度检测
  - 案例：摇一摇功能实现
  - accelerationIncludingGravity 手机重力加速度检测
  - 案例: 方块移动
    - IOS 和 安卓的兼容处理
    `
      function getIos(){
          var u = window.navigator.userAgent;
          return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      }
    `
- 扩展：函数防抖和函数节流
  - 函数防抖[debounce]
    - 希望函数只执行一次，哪怕我进行了多次调用
      `
        function debounce(fn) {
          var timer
          var _self = fn
          return function() {
            clearTimeout(timer)
            var args = arguments // fn所需要的参数
            var _me = this // 当前的this
            timer = setTimeout(function() {
              _self.call(_me, args)
            }, 200)
          }
        }
      `
  - 函数节流[throttle]
    - 让函数保持在一个可接受的固定频率执行
      `
        function throttle(fn, interval) {
          var _self = fn;
          var firstTime = true;
          var timer;
          return function() {
            var args = arguments
            var _me = this
            if (firstTime) {
              _self.call(_me, args)
              firstTime = false;
            }
            if (timer) {
              return false
            }
            timer = setTimeout(function() {
              clearTimeout(timer)
              timer = null
              _self.call(_me, args)
            }, interval || 500)
          }
        }
      `
## 下节课内容
1）工厂模式
2）new运算符
3）构造函数
4）原型prototype
5）面相对象和面相过程编程
6）类和对象

## 下节课讲师
余维海
web全栈工程师，由后端到前端，曾致力于将本地OA及ERP互联网化的开发与研究工作，为企业提供一体化定制服务。6年互联网工作经验，3年教学经验，教学期间参与教学及研发任务，所带学员就职于知名互联网企业。参与《web前端开发项目化教程》一书的编写工作。精通后端语言php、nodejs后端框架thinkphp、前端框架vuejs、reactjs、avalonjs、reactnative、微信小程序、微信公众号开发等等。





 




