"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (win, doc) {
    var Login = function () {
        function Login(params) {
            _classCallCheck(this, Login);

            this.user = document.querySelector('#user').value;
            this.pswd = document.querySelector('#pswd').value;
            this.$ = function (id) {
                return document.getElementById(id);
            };
        }

        _createClass(Login, [{
            key: 'Ajax',
            value: function Ajax(o) {
                var xhr = null;
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                    alert(1);
                } catch (e) {
                    try {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                        alert(2);
                    } catch (e) {
                        xhr = new XMLHttpRequest();
                        alert(3);
                    }
                }

                xhr.open(o.type, o.url);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        o.success(xhr.responseText);
                    }
                };

                xhr.send(null);
            }
        }, {
            key: 'Login',
            value: function Login() {
                return document.querySelector('#user').value;
            }
        }]);

        return Login;
    }();

    ;

    win.U = new Login();

    document.querySelector('#login-btn').addEventListener('click', function () {
        alert(U.$('user').value);
        U.Ajax({
            type: "post",
            url: "http://127.0.0.1:666/list",
            data: {
                user: "沐枫自然"
            },
            success: function success(o) {
                console.log(o);
                alert(o);
            }
        });
    }, false);
})(window, document);