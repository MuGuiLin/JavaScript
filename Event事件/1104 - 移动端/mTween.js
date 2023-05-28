var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){ 
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
(function(){
    if(!window.requestAnimationFrame){
        var lastTime = 0;
        window.requestAnimationFrame = function(callback){
            var nowTime = Date.now();
            var dely = Math.max(0,16.7 - (nowTime - lastTime));
            lastTime = nowTime;
            return setTimeout(callback,dely);
        };
        window.cancelAnimationFrame = function(index){
           clearTimeout(index);
        };
    }
})();
var transformAttr = [
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "skewX",
    "skewY"
]; 
var normalAttr = [
    "width",
    "height",
    "left",
    "top",
    "right",
    "bottom",
    "marginBottom",
    "marginleft",
    "marginRight",
    "marginTop",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom"
];
function css(el,attr,val){
    if(typeof attr == "object"){
        for(var s in attr){
            css(el,s,attr[s]);
        }
        return ;
    }
    if(transformAttr.indexOf(attr) >= 0){
        return setTransform(el,attr,val);
    }
    if(val === undefined){
        val = getComputedStyle(el)[attr]; 
        return normalAttr.indexOf(attr)>=0||!isNaN(val)?parseFloat(val):val;
    } else {
        if(attr == "opacity"){
            el.style[attr] = val;
            el.style.filter = "alpha(opacity="+(val*100)+")";
        } else if(normalAttr.indexOf(attr)>=0) {
            el.style[attr] = val + "px";
        } else if(attr == "zIndex") {
            el.style[attr] = Math.round(val);
        } else {
            el.style[attr] = val;
        }
    }
}
function setTransform(el,attr,val){
    el.transform = el.transform||{};
    if(val === undefined){
        return  el.transform[attr];
    }
    el.transform[attr] = val;
    var transformVal = "";
    for(var s in  el.transform){
        switch(s){
            case "rotate":
            case "rotateX":
            case "rotateY":
            case "rotateZ":
            case "skewX":
            case "skewY":
                transformVal += s+'('+ el.transform[s]+'deg) ';
                break;
            case "translateX":
            case "translateY":
            case "translateZ":
                transformVal += s+'('+ el.transform[s]+'px) ';
                break;
            case "scale":
            case "scaleX":
            case "scaleY":
                transformVal += s+'('+ el.transform[s]+') ';
                break;       
        }
    }
    el.style.WebkitTransform = el.style.transform = transformVal.trim();
}
function mTween(op){
    var el = op.el,
    attr = op.attr,
    fx = op.fx||"easeOut",
    duration = op.duration||400,
    maxC = 0;
    if(el.animationTimer){
        return;
    }
    var t = 0;
    var b = {};
    var c = {};
    for(var s in attr){
        b[s] = css(el,s);
        c[s] = attr[s] - b[s];
        maxC = Math.max(maxC,Math.abs(c[s]));
    }
    if(typeof duration === "object"){
        var durationOption = duration;
        durationOption.multiple =  durationOption.multiple||2;
        duration = maxC * duration.multiple;
        duration =  durationOption.max?Math.min(duration,durationOption.max):duration;
        duration =  durationOption.min?Math.max(duration,durationOption.min):duration;
    }
    var d = Math.ceil(duration/(1000/60));
    move();
    function move(){
        el.animationTimer = requestAnimationFrame(function(){
            t++;
            if(t > d){
                el.animationTimer = null;
                op.cb&&op.cb();
            } else {
                for(var s in attr){
                    var val = Tween[fx](t,b[s],c[s],d);
                    css(el,s,val);
                    op.moveing&&op.moveing();
                }
                move();
            }
        });
    }
}
mTween.stop = function(el){
    cancelAnimationFrame(el.animationTimer);
    el.animationTimer = null;
};
function shake(op){
    var el = op.el,
    attr = op.attr,
    shakeLength = op.shakeLength||15,
    shakeArr = [];
    el.shakeStart = {};
    if(el.shake) {
        return ;
    } 
    if(typeof attr === "object" ){
        for(var i = 0; i < attr.length; i++){
            el.shakeStart[attr[i]] = css(el,attr[i]);
        }
    } else {
        el.shakeStart[attr] = css(el,attr);
    }
    for(var i = shakeLength; i >= 0; i--){
        shakeArr.push(i%2?i:-i);
    }
    move();
    function move(){
        el.shake = requestAnimationFrame(function(){
            if(shakeArr.length <= 0){
                el.shake = false;
                op.cb&&op.cb();
            } else {
                var nub = shakeArr.shift();
                for(var s in  el.shakeStart){
                    css(el,s, el.shakeStart[s] + nub);
                }
                move();
            }
        });
    }
}    
shake.stop = function(el){
    cancelAnimationFrame(el.shake);
    el.shake = false;
    for(var s in  el.shakeStart){
        css(el,s, el.shakeStart[s]);
    }
};

function mouseScroll(el,up,down){
    el.addEventListener("mousewheel",function(e){
        if(e.wheelDelta>0){
            up&&up.call(el,e);
        } else {
            down&&down.call(el,e);
        }
    });
    el.addEventListener("DOMMouseScroll",function(e){
        if(e.detail < 0 ){
            up&&up.call(el,e);
        } else {
            down&&down.call(el,e);
        }
    });
}