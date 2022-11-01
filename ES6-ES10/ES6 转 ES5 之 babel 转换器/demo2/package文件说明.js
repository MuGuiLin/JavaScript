{
  "name": "deom",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "babel-cli": "^6.26.0",           //babel脚手架
    "babel-polyfill": "^6.26.0",      //babel辅助工具
    "babel-preset-es2015": "^6.24.1"  //ES6转换
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "by": "babel src -w -d js"    //运行 npm run by 命令时， 将 src目录下的所有js文件 转为 ES5 到 js目录下，并实时监听src目录下的js文件有变化时自动编译！！！
  },
  "author": "",
  "license": "ISC",
  "description": ""
}
