// JavaScript Document

function getStyle(obj,attr)<!--------------用getStyle代替offsetWidth------------->
//用getStyle代替offsetWidth(因为offsetWidth加上border后会有很BUG，以后都不建议用offsetWidth了)
{
	if(obj.currentStyle)//判断传进来的参数(Div)是否支持currentStyle,
	{
		return obj.currentStyle[attr]
	}
	else
	{
		return getComputedStyle(obj,false)[attr];
	}
}


function YunDong(obj, json, fn)<!--------------运动框架--------------->
{
	clearInterval(obj.DSQ);//先关闭定时器，防第2次运动时加快运动速度
	
	obj.DSQ=setInterval(function()//建立一个定时器，并赋给当前标签元素它自己，(就是把定时器分给每个标签元素，让它们不抢定时器)
	{
		var bStop=true;
		for(var attr in json)
		{
			//1、取当前的值
	 		//判断传来的值是要处理透明度的元素,还是其他元素选择的问题
			var iCur=0
			if(attr=='opacity')//如果传来的参数是opacity透明度，就执行下面这条语句
			{
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//100是为了不影响其他的元素，因为透明度有兼容性问题，FF是整数，IE是小数，所以转为浮点数，又再转为整数，因为小数问题很难搞，比如银行里的钱，是1.35元钱，实际存储为135分钱(没有小数)
			}
			else
			{
				iCur=parseInt(getStyle(obj,attr));//把getStyle转为整数值类型，并赋给iCur
			}
			  
			//2、获取和计算速度
			var iSpeed=(json[attr]-iCur)/12;<!--这是运动的关键，-->
			
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);//Math.ceil小数向上取整Math.floor小数向下取整
			
		    //3、检测停止
		    if(iCur!=json[attr])//如果没有到达运动终点时,再等下一个到终点
			{
			   bStop=false;
			}

			if(attr=='opacity')//这是处理带有透明度元素的
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
			//obj.style.width=parseInt(obj.style.width)+iSpeed+'px';parseInt将字符串转为数值类型，这是用来取行间样式的
			obj.style[attr]=iCur+iSpeed+'px';//这是处理正常元素的,可改变宽，高，大，小
			} 
	  }
			if(bStop)//如果循环结束后，传来的值都终点了！
			{
				 clearInterval(obj.DSQ);//关闭定时器  
				 if(fn)//在关闭定时器以后，再执行下一个函数，就是链式运动,这是判断有没有传第4个参数过来，
				 {
					  fn();//只有传了第4参数以后才执行这个fn匿名函数
				 }	
		}
		
	},30)
	
}