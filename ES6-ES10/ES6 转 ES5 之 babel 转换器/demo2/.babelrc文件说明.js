{ 
 // presets 是用来设置转码规整的，es2015就是ES6,
  "presets": ["es2015", "stage-2"], // stage-2其实是一个系列，它是ES7的编码规则，有stage-0[,1,2,3], 四选一

  // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
  "plugins": ["lodash", "transform-runtime"],

  //下面指的是在生成的文件中，不产生注释
  "comments": false
}



一：配置presets选项

1、ES2015:
    check-es2015-constants                        // 检验const常量是否被重新赋值
    transform-es2015-arrow-functions              // 编译箭头函数
    transform-es2015-block-scoped-functions       // 函数声明在作用域内
    transform-es2015-block-scoping                // 编译const和let
    transform-es2015-classes                      // 编译class
    transform-es2015-computed-properties          // 编译计算对象属性
    transform-es2015-destructuring                // 编译解构赋值
    transform-es2015-duplicate-keys               // 编译对象中重复的key，其实是转换成计算对象属性
    transform-es2015-for-of                       // 编译for…of
    transform-es2015-function-name                // 将function.name语义应用于所有的function
    transform-es2015-literals                     // 编译整数(8进制/16进制)和unicode
    transform-es2015-modules-commonjs             // 将modules编译成commonjs
    transform-es2015-object-super                 // 编译super
    transform-es2015-parameters                   // 编译参数，包括默认参数，不定参数和解构参数
    transform-es2015-shorthand-properties         // 编译属性缩写
    transform-es2015-spread                       // 编译展开运算符
    transform-es2015-sticky-regex                 // 正则添加sticky属性
    transform-es2015-template-literals            // 编译模版字符串
    transform-es2015-typeof-symbol                // 编译Symbol类型
    transform-es2015-unicode-regex                // 正则添加unicode模式
    transform-regenerator                         // 编译generator函数

2、 ES2016: 使用es2016的相关插件， 也就是es7
    transform-exponentiation-operator // 编译幂运算符

3、 ES2017: 使用es2017的相关插件， 也就是es8
    syntax-trailing-function-commas // function最后一个参数允许使用逗号
    transform-async-to-generator // 把async函数转化成generator函数

4、latest:
    latest是一个特殊的presets，到目前为止包括了es2015，es2016，es2017的插件。

5、react:
    加入了flow，jsx等语法.

6、stage-x(stage-0/1/2/3/4):
    按照JavaScript的提案阶段区分的，一共有5个阶段。而数字越小，阶段越靠后.





二：配置plugins选项

引入需要的插件,以下仅以引入箭头函数举例

{
  "plugins": ["transform-es2015-arrow-functions"]
}

另外babel还支持自定义presets 和 plugins