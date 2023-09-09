/*
	js - scroll判断页面是向上滚动还是向下滚动
	
	原理： 那当前的scrollTop和之前的scrollTop对比
	
	如果变大了， 表示向下滚动（ scrollTop值变大）；

	如果变小了， 表示向上滚动（ scrollTop值变小）。



	js获取，设置滚动条位置

	注： document.documentElement.scrollTop 和 document.documentElement.scrollTop 会有一个为0

*/


//获取document信息
function ScollPostion() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return {
        top: t,
        left: l,
        width: w,
        height: h
    };
}


//设置滚动条位置
window.scrollTo(0,scrollTop);


// 方法一： js代码：

$(document).ready(function() {

	var p = 0,

		t = 0;

	$(window).scroll(function() {

		p = $(this).scrollTop();

		if (t < p) {
			//下滚
		} else {
			//上滚
		}
		setTimeout(function() {
			t = p;
		}, 0)

	})

})

// 方法二：
// 1. 单纯判断滚动条方向：

function scroll(fn) {

	var beforeScrollTop = document.body.scrollTop,

		fn = fn || function() {};

	window.addEventListener("scroll", function() {

		var afterScrollTop = document.body.scrollTop;

		delta = afterScrollTop - beterScrollTop;

		if (delta === 0) {
			return false;
		}

		fn(delte > 0 ? "dowm" : "up");

		beforeScrollTop = afterScrollTop;

	}, false);

})

// 调用方法： 
scroll(function(direction) {
	console.log(direction)
});





// 以上方法苹果手机浏览器事件会跳动， 解决方法代码改进

scrollDirect: function(fn) {

	var beforeScrollTop = document.body.scrollTop;

	fn = fn || function() {};

	window.addEventListener("scroll", function(event) {

		event = event || window.event;

		var afterScrollTop = document.body.scrollTop;

		delta = afterScrollTop - befterScrollTop;

		befterScrollTop = afterScrollTop;

		var scrollTop = $(this).scrollTop();

		var scrollHeight = $(document).height();

		var windowHeight = $(this).height();

		if (scrollTop + windowHeight > scrollHeight - 10) {

			fn("up");

			return;

		}

		if (afterScrollTop < 10 || afterScrollTop > $(document.body).height - 10) {

			fn("up");

		} else {

			if (Math.abs(delta) < 10) {

				return false;

			}

			fn(delta > 0 ? "down" : "up");

		}

	}, false);

}

// 调用方法：

var upflag = 1;

var downflag = 1;

//scroll滑动，上滑和下滑只执行1次！

crollDirect(function(direction) {

	if (direction == "down") {

		if (downflag) {

			$(".footer_wrap").slideUp(200);

			downlag = 0;

			upflag = 1;

		}

	}

	if (direction == "up") {

		if (upflag) {

			$(".footer_wrap").slideDown(200);

			downflag = 1;

			upflag = 0;

		}

	}

});



// 滚动条滚动到底部和头部判断

BottomJumpPage: function() {

	var scrollTop = $(this).scrollTop();

	var scrollHeight = $(document).height();

	var windowHeight = $(this).height();

	if (scrollTop + windowHeight == scrollHeight) { //滚动到底部执行事件

		console.dir("我到底部了")

	}

	if (scrollTop == 0) { //滚动到头部执行事件

		console.dir("我到头部了")

	}

}

//调用方法：
$(window).scroll(BottomJumpPage);
