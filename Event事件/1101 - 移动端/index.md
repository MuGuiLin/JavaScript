# 移动端事件
## 本节课目标
- 掌握 touchEvent
- 实现移动端幻灯片

## 本节课知识点
- 移动端touch事件 
  - touchstart
  - touchmove
  - touchend
  - touch 事件 和 mouse 事件的区别
  - 事件点透
    - mouse 事件的延迟问题
  - 阻止默认事件
    - 阻止 touchstart 事件带来的影响
    - 阻止 touchmove 事件带来的影响
- TouchEvent 对象详解
  - touches
  - targetTouches
  - changedTouches
- 案例：移动端滑屏切换的幻灯片
- orientationchange 监听横竖屏切换
- window.orientation 检测手机横竖屏
- devicemotion 监听手机加速度发生变化
  - acceleration 手机加速度检测
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
          var firstTime = true
          var timer;
          return function() {
            var args = arguments
            var _me = this
            if (firstTime) {
              _self.call(_me, args)
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
- 案例：摇一摇功能实现


## 下次课内容
- 移动端收尾
- 一二阶段回顾 (可以把问题提前整理一下)

## 今日任务
- 移动端幻灯片
- 整理一二阶段的问题 (周一中午12点前，提交给助教)




 




