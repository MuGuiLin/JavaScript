<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PHP继承</title>
</head>

<body>
PHP的网页要存放在服务器环境www文件夹下
<?php
$a=12;
$b=6;
echo $a+$b;//输出ab的和
echo 'hello,world!';

class Person//类
{
	function __mupiao($name,$sex,$age)//构造函数
	{
		$this->name=$name;
		$this->sex=$sex;
		$this->age=$age;
	}
	function show()//方法
	{
		echo $this->name.$this->sex.$this->age;
	}
}

$p1=new Person('穆飘','男',24);//创建对象
$p1->show();//调用person类中的show方法

class Worker extends Person//继承Person这个类:extends继承关键字
{
	function __admin($name,$sex,$age,$job)
	{
		parent::__mupiao($name,$sex,$age);//继承父级的构造函数
		$this->job=$job;//添加子类的属性
	}
	function showJob()
	{
		echo $this->job;
	}
}
$w1=new Worker('穆林','女',22);
$w1->showJob();
?>
</body>
</html>