/**
 * 导出对象【就是向外导出（暴露）变量、常量、函数、对象、类等】
 */

// 独立导出对象（向外导出（暴露）变量、常量
let count = 666;

// 独立导出 常量
export const PI = Math.PI;

const sum = (n1, n2) => {
    return n1 + n2;
};

// 独立导出 函数
export function isOdd(n) {
    return n % 2 === 1 || n % 2 === -1;
};

// 独立导出 类
export class Person {
    constructor(name = '') {
        this.name = name;
    }
    sayHello() {
        console.log(`Hello！ 我是${this.name}`);
    }
};

// 默认导出
export default {
    // 默认导出 变量
    count: count,

    // 默认导出 函数
    sum,

    // 默认导出 类
    Person,

    // 默认导出 字符变量 （可直接创建 并 导出[ 变量、常量、函数、对象、类] 等对象）
    pi: '3.141592653589793',

    // 默认导出 函数 方式1
    is: function (val, type) {
        return toString.call(val) === `[object ${type}]`;
    },

    // 默认导出 函数 方式2
    isArray: (arr = []) => {
        return Object.prototype.toString.call(arr) === '[object Array]' || Array.isArray(arr);
    },
    // 默认导出 函数 方式3
    isObject(val) {
        // 注：在这里还可以通过 this关键字 来调用当前默认导出模块中的 其他导出属性内容
        // 如 this.pi; this.sum(1, 2);
        return val !== null && this.is(val, 'Object') || (typeof val === 'object' && val !== null);
    },
    // 默认导出 类
    AudioTrack: class {
        constructor(trackId = '', trackName = '', trackUrl = 'https://') {
            this.trackId = trackId;
            this.trackName = trackName;
            this.trackUrl = trackUrl;
        };
        start() {
            console.log(`开始播放${this.trackName}`);
        };
        stop() {
            console.log(`停止播放${this.trackName}`);
        };
    }
};


/* 默认导出对象
export default function () {
    return 'Hello！ 我是默认1个导出对象；';
};
*/

/**
 * 注：export default 默认导出 一个模块不能具有多个默认导出（就是在一个js模块文件中 能只出现一次！！！）
 */