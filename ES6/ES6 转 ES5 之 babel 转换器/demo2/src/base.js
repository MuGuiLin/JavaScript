"use strict";
(function (win, doc) {
    class Login {
        constructor(params) {
            this.user = document.querySelector('#user').value;
            this.pswd = document.querySelector('#pswd').value; 
            this.$ = (id) =>{
                return document.getElementById(id);
            }
        };

        Ajax(o){
            let xhr = null;
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
                alert(1)
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    alert(2)
                } catch (e) {
                    xhr = new XMLHttpRequest();
                    alert(3)
                }
            }

            xhr.open(o.type, o.url);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    o.success(xhr.responseText);
                }
            };
            
            xhr.send(null);

        };
        
        Login(){
            return document.querySelector('#user').value;
        };
    };

    win.U = new Login();

    document.querySelector('#login-btn').addEventListener('click', function(){
        alert(U.$('user').value)
        U.Ajax({
            type: "post",
            url: "http://127.0.0.1:666/list",
            data:{
                user: "沐枫自然"
            },
            success: function(o){
                console.log(o)
                alert(o);
            }
        });
    }, false);
}(window, document))