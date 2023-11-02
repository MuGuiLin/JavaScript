/**
 * 导出对象【就是向外导出（暴露）变量、常量、函数、对象、类等】
 */

// 独立导出对象（向外导出（暴露）变量、常量
export const PI = Math.PI;

// 独立导出对象
export const sum = (n1, n2) => {
    return n1 + n2;
};

export function isOdd(n) {
    return n % 2 === 1 || n % 2 === -1;
};

export class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello！ 我是${this.name}`);
    }
};

// 独立导出对象
export let count = 0;

// 集中导出多个对象
export {
    sum as add,
    isOdd as odd,
};

// 默认导出对象
/*
export default function () {
    return 'Hello！ 我是默认1个导出对象；';
};
*/

// 导出多个默认对象
export default {
    isOdd, // 将
    sum: (n1, n2) => {
        return n1 + n2;
    },
    random: Math.random(),
};

/**
 * 注：export default 默认导出 一个模块不能具有多个默认导出（就是在一个js模块文件中 能只出现一次！！！）
 */