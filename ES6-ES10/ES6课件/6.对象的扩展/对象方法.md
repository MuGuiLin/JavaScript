# ES6+ 新增对象方法

## Object.assign
Object Object.assign(target, ...sources) 将所有可枚举属性的值从一个或多个源对象复制到目标对象

参数:
    target
        目标对象
    sources
        源对象
返回值：
    目标对象

## Object.is
Boolean Object.is(value1, value2) 判断两个值是否是相同的值。 

规则：
    两个值都是 undefined
    两个值都是 null
    两个值都是 true 或者都是 false
    两个值是由相同个数的字符按照相同的顺序组成的字符串
    两个值指向同一个对象
    两个值都是数字并且
        都是正零 +0
        都是负零 -0
        都是 NaN

## 对象简洁表示法
- 属性简洁表示
- 方法简洁表示

## 属性名表达式