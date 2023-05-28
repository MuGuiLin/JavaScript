var input = document.querySelectorAll('#fill_in input');
var target = document.querySelector('#target strong');
var go = document.querySelector('#go');
var ps = document.querySelectorAll('#date p');
var nowDate = new Date();
var wishDate = null;
var timer = null;
var onOff = true;

//初始化
init();
/** 
 * 可以利用日期对象相减，得到他们之间的毫秒数的差值
 * 
*/
go.onclick = function(){
    
    if (!onOff){
        return;
    }
    onOff = false;
    var year = input[0].value;
    var month = input[1].value - 1;
    var day = input[2].value;
    
    wishDate = new Date(year, month, day);

    
    //把获取到的差值毫秒数换算成对应的天数
    
    timer = setInterval(function(){
        upDate();
    },1000);
    upDate();
    
}



//初始化
function init(){
    input[0].value = nowDate.getFullYear();
    input[1].value = nowDate.getMonth() + 1;
    input[2].value = nowDate.getDate();

    target.innerHTML = setFormat();
}
//设置格式
function setFormat(){
    var txt = nowDate.getFullYear() + '年' + (nowDate.getMonth() + 1) + '月' + nowDate.getDate() + '日';
    return txt;
}
//根据差值计算出对应的天数
function countDate(dis){
    var timeArr = [];
    
    var oneDay = 1000 * 60 * 60 * 24 ;
    var oneHour = 1000 * 60 * 60;
    var oneMinute = 1000 * 60;
    var oneSecond = 1000;

    timeArr[0] = parseInt(dis / oneDay);
    dis = dis % oneDay;
    timeArr[1] = parseInt(dis / oneHour);
    dis = dis % oneHour;
    timeArr[2] = parseInt(dis / oneMinute);
    dis = dis % oneMinute;
    timeArr[3] = parseInt(dis / oneSecond);

    // console.log(timeArr);
    for (var i = 0; i < timeArr.length;i++){
        timeArr[i] = fillZero(timeArr[i]);
    }

    console.log(timeArr);

    for (var i = 0; i < timeArr.length;i++){
        ps[i].innerHTML = timeArr[i];
    }

    // console.log(days, hours, minutes, seconds);

}
//补零
function fillZero(value){
    var str = '' + value;
    // console.log(str.length);
    if(str.length<2){
        str = '0' + str;
    }
    return str;
    
}

function upDate(){
    nowDate = new Date();
    var dis = wishDate - nowDate;
    if (dis <= 0) {
        alert('不需要执行倒计时');
        clearInterval(timer);
        onOff = true;
        return;
    }
    countDate(dis);
}

