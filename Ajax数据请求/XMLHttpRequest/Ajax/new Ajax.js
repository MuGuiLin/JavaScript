function ajax(url,fnSucc,fnFaild)
{
	//1、创建ajax对象，oAjax=new XMLHttpRequest()
	var oAjx=null;
	if(window.XMLHttpRequest)//解决IE6和其他浏览器下的兼容性问题！。。
	{
		oAjax=new XMLHttpRequest();//在其他所有浏览器下可用
	}
	else
	{
		oAjax=new ActiveXObject("Microsoft.XMLHTTP");//只能在IE6下可用
	}
	//alert(oAjax);
	
	//2、连接服务器
			//  方法,文件名,是否异步，(同步：一件一件的做，异步：多件事一起做)
	oAjax.open('GET','url',true)
	
	//3、向服务器发送请求
	oAjax.send();
	
	//4、接收服务器返回的响应：OnReadyStateChange
    oAjax.OnReadyStateChange=function()//OnReadyStateChange请求状态监控事件
	{
	    if(oAjax.readyState==4);//readyState请求状态：0:未初始化，1载入中，2载入完成，3正在解析，4完成解析;
		{
			if(oAjax.Status==200)//Status请求结果：
			{
				alert("凋用成功！。。");
				fnSucc(oAjax.responseText);//responseText:取出服务器通返回的数据
			}
			else
			{
				if(fnFaild)
				{
					fnFaild();
					alert("凋用失败！。。");
				}
			}
		}
	}
}

// JavaScript Document