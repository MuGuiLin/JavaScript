# ES6+ 新增字符串方法

## str.includes
Boolean str.includes(valueToFind[, fromIndex]) 判断字符串是否包含一个指定的值
详细： 参考数组的 includes

## str.endsWith
Boolean str.endsWith(searchString[, length]) 判断当前字符串是否是以另外一个给定的子字符串“结尾”

参数
    searchString
        要搜索的子字符串。
可选参数
    length
        作为 str 的长度。默认值为 str.length
返回值
    如果传入的子字符串在搜索字符串的末尾则返回true；否则将返回 false。

## str.startsWith
Boolean str.startsWith(searchString[, position]) 判断当前字符串是否以另外一个给定的子字符串开头

参数
    searchString
        要搜索的子字符串。
可选参数
    position
        在 str 中搜索 searchString 的开始位置，默认值为 0，也就是真正的字符串开头处。
返回值
    如果传入的子字符串在搜索字符串的开始则返回true；否则将返回 false。

## str.repeat

String str.repeat(count) 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本

参数
    count
        介于0和正无穷大之间的整数。表示在新构造的字符串中重复了多少遍原字符串

返回值
    生成的新字符串

## 模板字符串
模板字面量 是允许嵌入表达式的字符串字面量。你可以使用多行字符串和字符串插值功能。它们在ES2015规范的先前版本中被称为“模板字符串”。    