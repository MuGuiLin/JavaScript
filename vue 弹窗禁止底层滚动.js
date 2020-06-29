功能：Vue自定义弹窗显示时（如果弹窗有滚动条在滚动时），禁止底层的滚动条滚动！

原因：底层视图高度超出百分百，加入弹窗后再苹果浏览器隐藏上下栏的情况下遮罩层没有完全遮住底层。

处理：打开弹窗后禁止底层滚动调用stop事件，关闭则开启底层滚动调用move事件。

//禁止页面滚动
function stop() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.addEventListener("touchmove", function (e) {
        e.preventDefault();
    }, false);//禁止页面滑动
};

function move() {
    document.body.style.overflow = '';//出现滚动条
    document.body.style.position = 'initial';
    document.body.style.height = '1006px';
    document.removeEventListener("touchmove", function (e) {
        e.preventDefault();
    }, false);
};


// Vue || Uin-App
show() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.addEventListener("touchmove", function (e) { e.preventDefault() }, false);
},
close() {
    document.body.style.overflow = '';
    document.body.style.position = 'initial';
    document.body.style.height = '1006px';
    document.removeEventListener("touchmove", function (e) { e.preventDefault() }, false);
},


// 参考相关来源：

// https://www.cnblogs.com/fanbi/p/9648184.html

// https://blog.csdn.net/m0_37852904/article/details/79300719