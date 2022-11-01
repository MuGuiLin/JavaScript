
	
	


	Server = function ()
	{
	    if(!window.TextData || window.TextData != '123')
	    {
	        alert("恭喜你：连接成功！");
	        setTimeout(FnServerA(),3000);
	//      setTimeout("api.closeWidget({id: 'A6998039096630', retData: {name:'closeWidget'},silent:true})",60000);
	    }
	    
	    else
	    {
	    	alert("恭喜你：连接成功，但是条件不满足！");
	    	setInterval(FnServerB(),3000);
	    }
	    
	    FnServerA = function ()
		{
			alert("定时器：定时调用成功，每3秒执行一次这个函数！");
		}
	    
	    FnServerB = function ()
		{
			alert("定时器：定时调用成功，每3秒执行一次这个函数！");
		}
	}
	
	
	
	
