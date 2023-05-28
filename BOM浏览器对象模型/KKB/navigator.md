// 判断PC
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

// 判断设备
var ua = navigator.userAgent.toLowerCase();
if (/android|adr/gi.test(ua)) {
    // 安卓
     
}else if(/\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(ua)){
    //苹果
     
}

// 判断不同客户端：新浪微博为1，QQ客户端为2，微信低于6.0.2版本为3，高于6.0.2版本为4，其他为0。

var ua = navigator.userAgent.toLowerCase();  
if(ua.match(/weibo/i) == "weibo"){  
    console.log(1);
}else if(ua.indexOf('qq/')!= -1){  
    console.log(2);
}else if(ua.match(/MicroMessenger/i)=="micromessenger"){  
var v_weixin = ua.split('micromessenger')[1];  
    v_weixin = v_weixin.substring(1,6);  
    v_weixin = v_weixin.split(' ')[0];  
if(v_weixin.split('.').length == 2){  
    v_weixin = v_weixin + '.0';  
}  
if(v_weixin < '6.0.2'){  
    console.log(3);
}else{  
    console.log(4);  
}  
}else{  
    console.log(0); 
}

// 区分各个浏览器
var ua=navigator.userAgent.toLowerCase();  
if(/msie/i.test(ua) && !/opera/.test(ua)){  
    alert("IE");  
    return ;  
}else if(/firefox/i.test(ua)){  
    alert("Firefox");  
    return ;  
}else if(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)){  
    alert("Chrome");  
    return ;  
}else if(/opera/i.test(ua)){  
    alert("Opera");  
    return ;  
} else if(/webkit/i.test(ua) &&!(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))){  
    alert("Safari");  
    return ;  
}else{  
    alert("unKnow");  
}