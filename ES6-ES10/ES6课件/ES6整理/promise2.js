/**
 * Created by strive-智能社 on 2016/8/9.
 */
const fs=require('fs');

fs.readFile('let123.html',function(err,data){
    var p1=new Promise(function(resolve,reject){
        if(err){
            reject(err);
        }else{
            resolve(data);
        }
    });

    p1.then(function(value){
        console.log(value.toString());
    },function(value){
        console.log(value);
    });
});





































