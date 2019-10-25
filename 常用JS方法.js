;(function() {
    let o = function() {
		// this.getById ? ( d.find.ID = function (a, b) {
		// 			if ("undefined" != typeof b.getElementById && p) {
		// 				var c = b.getElementById(a);
		// 				return c ? [c] : []
		// 			}
		// 		})
		// 		:
		// 		(delete d.find.ID, d.filter.ID = function (a) {
		// 			var b = a.replace(ba, ca);
		// 			return function (a) {
		// 				var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
		// 				return c && c.value === b
		// 			}
		// 		})
	};

    o.prototype = {
		//判断两个数据是否相等
    	arrayEqual: function(arr1, arr2) {
			if (!arr1 || !arr2) {
				return false;
			}
    		if (arr1 === arr2) {
    			return true;
    		}  
    		if (arr1.length != arr2.length) {
    			return false;
    		}
    		for(var i = 0; i < arr1.length; ++i) {   
    			if(arr1[i] !== arr2[i]) {
    				return false;
    			}	
    		}   
    		return true;
		},
		
		//判断是否为手机号
		isPhoneNum: function (str) {
			return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
		},
		
		//判断是否为邮箱地址
		isEmail: function (str) {
		  	return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
		},

		//判断是否为身份证号
		isIdCard: function (str) {
			return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
		},
		
		//判断是否为URL地址
		isUrl: function (str) {
			return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
		},

		//获取Cookie
		getCookie: function (name) {
			var arr = document.cookie.replace(/\s/g, "").split(';');
			for (var i = 0; i < arr.length; i++) {
				var tempArr = arr[i].split('=');
				if (tempArr[0] == name) {
					return decodeURIComponent(tempArr[1]);
				}
			}
			return '';
		},
		
		//设置Cookie
		setCookie: function (name, value, days) {
			var date = new Date();
			date.setDate(date.getDate() + days);
			document.cookie = name + '=' + value + ';expires=' + date;
		},

		//删除Cookie
		delCookie: function (name) {
			this.setCookie(name, '1', -1); //设置已过期，系统会立刻删除cookie
		},

		//获取滚动条距顶部的距离
		getScrollTop: function () {
			return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		},
		
		//获取当前操作系统
		getOS: function () {
			var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '',
			 	vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '',
				appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
			if (/mac/i.test(appVersion)) return 'MacOSX'
			if (/win/i.test(appVersion)) return 'windows'
			if (/linux/i.test(appVersion)) return 'linux'
			if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
			if (/android/i.test(userAgent)) return 'android'
			if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
		},

		//获取浏览器类型和版本
		getExplore: function () {
			var sys = {}, ua = navigator.userAgent.toLowerCase(), s;
			(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
			(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
			(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
			(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
			(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
			(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
			(s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;

			// 根据关系进行判断
			if (sys.ie) return ('IE: ' + sys.ie)
			if (sys.edge) return ('EDGE: ' + sys.edge)
			if (sys.firefox) return ('Firefox: ' + sys.firefox)
			if (sys.chrome) return ('Chrome: ' + sys.chrome)
			if (sys.opera) return ('Opera: ' + sys.opera)
			if (sys.safari) return ('Safari: ' + sys.safari)
			return 'Unkonwn';
		}
		
		//随机生成颜色
		randomColor: function () {
			return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
		},

		// 生成指定范围随机数
		randomNum: function (min, max) {
			return Math.floor(min + Math.random() * (max - min));
		}
    }
    window.O = new o();
}());