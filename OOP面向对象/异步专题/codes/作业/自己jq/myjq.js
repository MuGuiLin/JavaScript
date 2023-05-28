class Jq {
    constructor(arg, root) {
        if (typeof root === "undefined") {
            this.prevObject = new Jq(document, null);
        }
        if (root) {
            this.prevObject = root;
        }
        if (typeof arg === "string") {
            //字符串
            let res = document.querySelectorAll(arg);
            // console.log(res);
            // this['res'] = res;
            // return res;
            // 获取的原生节点挂在 this上 ，方便后续操作
            this.addEle(res);
        } else if (typeof arg === "function") {
            // 函数 -->等待dom结构加载完成执行函数；
            window.addEventListener("DOMContentLoaded", arg);
        } else {
            // 原生节点
            if (typeof arg.length === "undefined") {
                // 对象；
                console.log("1个对象节点")
                this[0] = arg;
                this.length = 1;
            } else {
                // 数组
                this.addEle(arg);
            }
        }
    }
    eq(index) {
        // return this[index];
        return new Jq(this[index], this);
    }
    end() {
        return this.prevObject;
    }
    click(fn) {
        // console.log("click...",fn);
        // fn();
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener("click", fn);
        }
    }
    on(eventName, cb) {
        let arr = eventName.split(" ");
        for (let j = 0; j < arr.length; j++) {
            for (let i = 0; i < this.length; i++) {
                this[i].addEventListener(arr[j], cb);
            }
        }
    }
    addEle(ele) {
        ele.forEach((item, key) => {
            this[key] = item;
        })
        this.length = ele.length;
    }
    css(...arg) {  //剩余参数 rest；
        // console.log(arguments)
        if (arg.length > 1) {
            // 传入2个参数位置；set
            // $(".box").css("background","yellow"); 设置样式；
            for (let i = 0; i < this.length; i++) {
                if(arg[0] in $.cssHooks){
                    $.cssHooks[arg[0]].set(this[i],arg[1]);
                }else{
                    this.setStyle(this[i], arg[0], arg[1]);
                }
            }
        } else {
            if (typeof arg[0] === 'string') {
                // $(".box").css("background"); //获取样式
             //    传入一个参数；get
                if(arg[0] in $.cssHooks){
                    $.cssHooks[arg[0]].get(this[0]);
                }else{
                    this.getStyle(this[0], arg[0]);
                }
            } else {
                // $(".box").css({"background":"yellow","width":200}); 设置样式
                for (let j in arg[0]) {
                    for (let i = 0; i < this.length; i++) {
                        this.setStyle(this[i], j, arg[0][j]);
                    }
                }
            }
        }
    }
    getStyle(ele, styleName) {
        return window.getComputedStyle(ele, null)[styleName];
    }
    setStyle(ele, styleName, styleValue) {
        if (typeof styleValue === "number" && !(styleName in $.cssNumber) ) {
            styleValue = styleValue + "px";
        }
        ele.style[styleName] = styleValue;
    }
}


//工厂模式
function $(arg) {
    // console.log(arg);
    return new Jq(arg);
}
// 扩展；
$.cssNumber = {
    columnCount: true,
    fillOpacity: true,
    fontWeight: true,
    lineHeight: true,
    opacity: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}

$.cssHooks = {

}

// axios();  axios.get();

//1. 实现传入对象的css方法： {"background":"yellow","width":200};
//思考： 2. 处理css方法中是否加单位的问题；