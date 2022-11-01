define([
    // 导入模块
    './a',
    './a2',
    './a3'
], function(require, factory, mya3) {  //注：这里的参数和导入的模块是一一对应的，名字可以自定义
    'use strict';
        console.log('获取a模块导出的数据：')
        console.log(require)
        console.log(factory)
        console.log(mya3)

        factory.alert(666);

        var res = require.sum(12, 20);
        console.log(res)

        // 导出模块
        return{
            b: 'b.js',
            ...require,
            ...mya3
        }
});