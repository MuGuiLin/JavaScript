// define([
//     'require',
//     'dependency'
// ], function(require, factory) {
//     'use strict';

// });

var PI = Math.PI;

function Sum(a, b) {
    return a + b;
};

// 导出
define({
    name: '沐枫',
    age: 28,
    sum: Sum,
    pi: PI
});