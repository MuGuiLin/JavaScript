
/*
 * mupiao NameSpace【命名空间】
 */
var mupiao = {};

/*
 * Interface Class【接口类】
 * 接口类需要传2个参数：
 * 参数1：接口的名字（string类型）；
 * 参数2：接收方法名的集合（array类型）；
 */

mupiao.Interface = function(InterfaceName , MethodsArray)
{
	if(arguments.length !== 2)
	{
		alert('参数长度必须为2个！');
		throw new Error('参数长度必须为2个！');
	}
	
	this.InterfaceName = InterfaceName;
	this.MethodsArray = [];
	
	for(var i = 0; i < MethodsArray.length; i++)
	{
		if(typeof MethodsArray[i] !== 'string')
		{
			alert('参数的方法名必须为字符串数组！');
			throw new Error('参数的方法名必须为字符串数组！');
		} 
		else 
		{
			this.MethodsArray.push(MethodsArray[i]);
		}
	}
}

/*
 * Interface 检验接口里面的方法，检测不过就抛出错误，不做其他操作
 */
mupiao.Interface.DetectMethods = function(object)
{
	if(arguments.length < 2)
	{
		alert('参数长度必须为2个！');
		throw new Error('参数长度必须为2个！');
	}
	
	for(var i = 1; i < arguments.length; i++)
	{
		var InterfaceType = arguments[i];
		if(InterfaceType.constructor !== mupiao.Interface)
		{
			alert('参数长度必须为2个！');
			throw new Error('参数长度必须为2个！');
		}
		for(var j = 0; j < InterfaceType.MethodsArray.length; j++ )
		{
			
		}
		
	}
}

/*
 * 继承的公共方法【实现只继承父类的原型对象】
 */

//在此 先创建一个方法：用于 实现只继承1次父类模板 目的：实现只继承父类的原型对象，不继承父类的模板！
mupiao.HeirMethod = function(Subclass, Fatherclass)//传两个参数：1、子类的构造函数，2、父类的构造函数
{
	var Fn = Function(); //1、创建一个空函数，用于中转父的原型对象
	Fn.prototype = Fatherclass.prototype // 2、把父类的原型对象 赋给 上面空函数Fn的原型对象 【此时就屏蔽掉了父类的模板啦！】
	Subclass.prototype = new Fn(); //3、再把父类的实例 赋给 子类的原型对象！【在此基本上就达到目的啦！】
	
	Subclass.prototype.constructor = Subclass // 还原子类的构造器；
	
	//保存一个父类的原型对象：用于 一方面方便解耦；另一方面获得父类的原型对象
	Subclass.SubAttr = Fatherclass.prototype; //给子类定义一个静态属性 用于 接收父类的原型对象
	
	//判断父类的原型对象的构造器(加保险)
	if(Fatherclass.prototype.constructor == Object.prototype.constructor)
	{
		Fatherclass.prototype.constructor = Fatherclass; //还原父类原型对象的构造器
	}
}

