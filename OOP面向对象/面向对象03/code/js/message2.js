class MyEvent {
    constructor() {
        this.handle = {};
    }
    addEvent(eventName, fn) {
        if (typeof this.handle[eventName] === 'undefined') {
            this.handle[eventName] = [];
        }
        this.handle[eventName].push(fn);
    }
    trigger(eventName) {
        this.handle[eventName].forEach(event => {
            event && event();
        })
    }
    removeEvent(eventName, fn) {
        for (let i = 0; i < this.handle[eventName].length; i++) {
            if (this.handle[eventName][i] === fn) {
                this.handle[eventName].splice(i, 1);
                break;
            }
        }
    }
}


class Dailog extends MyEvent{
    constructor(options) {
        super();
        //默认配置合并；方式一；
        // let { width="40%", height="240px"} = options;
        // let newOpts = {
        //     width,
        //     height
        // }
        // console.log(newOpts);
        // 方式二：
        let opts = Object.assign({
            width: "20%",
            height: "100px",
            title: "默认标题",
            content: "默认内容",
            dragable: true, //是否可拖拽
            maskable: true, //是否有遮罩
            isCancel: false //是否有取消
        }, options);
        // console.log(opts);
        this.opts = opts;
        this.init();
    }
    init() {
        // 节点生成（节点隐藏）
        this.renderView();
        // 关闭对话框；
        this.close();
    }
    // 显示对话框；
    showDailog() {
        //通过样式显示隐藏；
        if (this.opts.maskable) {
            this.divEle.querySelector(".k-wrapper").style.display = "block";
        }
        this.divEle.querySelector(".k-dialog").style.display = "block";
    }
    close() {
        // 隐藏对话框；隐藏遮罩；
        // document.querySelector(".k-wrapper").getElementsByClassName.display = "none";
        console.log(this.divEle);
        //    let that = this;
        // 原因
        // if (this.divEle.querySelector(".k-default")) {
        //     this.divEle.querySelector(".k-default").onclick = () => {
        //         this.divEle.querySelector(".k-wrapper").style.display = "none";
        //         this.divEle.querySelector(".k-dialog").style.display = "none";
        //         // document.querySelectorAll(".k-wrapper").style.display = "none";
        //         // document.querySelectorAll(".k-dialog").style.display = "none";
        //     }
        // }

        // this.divEle.querySelector(".k-primary").onclick = () => {
        //     this.divEle.querySelector(".k-wrapper").style.display = "none";
        //     this.divEle.querySelector(".k-dialog").style.display = "none";
        // }
        // this.divEle.querySelector(".k-close").onclick = () => {
        //     this.divEle.querySelector(".k-wrapper").style.display = "none";
        //     this.divEle.querySelector(".k-dialog").style.display = "none";
        // }
        this.addEvent("hideDailog",this.hideDailog.bind(this));

        this.divEle.querySelector(".k-dialog").addEventListener("click", e => {
            console.log(e.target.className);
            switch (e.target.className) {
                case "k-close":
                    // this.hideDailog();
                    this.trigger("hideDailog");
                    break;
                case "k-default":
                    // this.hideDailog();
                    this.trigger("hideDailog");
                    break;
                // default:
                //     this.divEle.querySelector(".k-wrapper").style.display = "none";
                //     this.divEle.querySelector(".k-dialog").style.display = "none";
                //     break;
                case 'k-primary':
                    this.trigger("hideDailog");
                    // this.hideDailog();
                    break;
            }
            // if(e.target.classsName)
        })
    }
    hideDailog() {
        console.log("??",this);
        this.divEle.querySelector(".k-wrapper").style.display = "none";
        this.divEle.querySelector(".k-dialog").style.display = "none";
    }
    //渲染视图；
    renderView() {
        let divEle = document.createElement("div");
        divEle.innerHTML = `<div class="k-wrapper"></div>
        <div class="k-dialog" style="width:${this.opts.width};height:${this.opts.height}">
            <div class="k-header">
                <span class="k-title">${this.opts.title}</span><span class="k-close">X</span>
            </div>
            <div class="k-body">
                <span>${this.opts.content}</span>
            </div>
            <div class="k-footer">
                ${this.opts.isCancel ? '<span class="k-default">取消</span>' : ''}
                <span class="k-primary">确定</span>
            </div>
        </div>`;
        document.querySelector("body").appendChild(divEle);
        this.divEle = divEle;
    }
}

//作业： 实现dragable配置及功能；拖拽功能；
// 文本框：1通过继承；2点击确定时候获取 input框内容；
