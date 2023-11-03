/**
 * 导入导出所有模块
 * 简单来讲：就是将 module-3.js模块文件中 所有被声明向外导出的 变量、常量、函数、对象属性等全部都原封不动的向外导出。
 * 大白话：就是在外部使用时，只要引用了当前 module-2.js 文件 同时也引用 module-3.js 
 */
export * from "./module-3.js";


import * as all from "./module-3.js";
console.dir(all)

// export { AudioTrackList, AudioTrackRequest } from './';


/**
 * 导入导出默认模块
 */
// export { default } from './module-3.js';

/**
 * 导入导出默认模块 并更名为myDef
 */
// export { default as myDef } from './module-3.js';