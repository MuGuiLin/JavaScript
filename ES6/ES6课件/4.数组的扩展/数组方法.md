# ES6+ 新增数组方法

## Array.from
Array Array.from(arrayLike[, mapFn[, thisArg]]) 将类数组转换成数组

参数：
    arrayLike 类数组

可选参数:    
    mapFn 类似 map 方法，循环类数组时的回函函数，返回值组成新数组
    thisArg mapFn 函数执行时的 this 指向

返回值
    根据 arrayLike 生成的新数组


## Array.isArray

Boolean Array.isArray(data) 检测数据是否是个数组

参数：
    data 要检测的数据

返回值:
    true 数组，false 非数组


## Array.of

Array Array.of(element0[, element1[, ...[, elementN]]]) 将参数转成一个数组

参数：
    elementN 要放入数组中的数据

返回值：   
    新数组


## arr.find
Value arr.find(callback[, thisArg]) 查找数组中满足要求的第一个元素的值

参数：
    callback
        在数组每一项上执行的函数，接收 3 个参数：
            element
                当前遍历到的元素。
            index[可选]
                当前遍历到的索引。
            array[可选]
                数组本身

可选参数               
    thisArg
        执行回调时用作this 的对象
返回值
    数组中第一个满足所提供测试函数的元素的值，否则返回 undefined


## arr.findIndex
Index arr.findIndex(callback[, thisArg]) 查找数组中满足要求的第一个元素的值的索引

参数:
    callback
        针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
        element
            当前元素。
        index
            当前元素的索引。
        array
            调用findIndex的数组。
可选参数：            
    thisArg
        执行callback时作为this对象的值

返回值：
    满足要求的值的索引

## arr.flat
Array arr.flat([depth]) 扁平化多维数组

可选参数：
    depth
        指定要提取嵌套数组的结构深度，默认值为 1。

返回值：
    一个包含将数组与子数组中所有元素的新数组

## arr.flatMap
Array arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])  方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些

参数：
    callback
        可以生成一个新数组中的元素的函数，可以传入三个参数：
        currentValue
            当前正在数组中处理的元素
        index可选
            可选的。数组中正在处理的当前元素的索引。
        array可选
            可选的。被调用的 map 数组
可选参数：
    thisArg
        执行 callback 函数时 使用的this 值
返回值：
    一个包含将数组与子数组中所有元素的新数组


## arr.fill 

Array arr.fill(value[, start[, end]]); 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引

参数：
    用来填充数组元素的值。
可选参数：
    start 
        起始索引，默认值为0。
    end 
        终止索引，默认值为 arr.length    

## arr.includes

Boolean arr.includes(valueToFind[, fromIndex]) 判断数组中是否包含一个指定的值

参数：
    valueToFind 需要查找的值

可选参数：
    从 fromIndex 处开始向后查找  

返回值：
    true 代表数组中包含 valueToFind， false 代表数组中不包含 fromIndex