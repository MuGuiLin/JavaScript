/* 2015 */
       $(document).ready(function () {
           LayObj.initObj(); //加载样式
           LayObj.LayMove(); //加载移动
           LayObj.Click();
       });
       var LayUrl = {
           path: function() {
               var strFullPath = window.document.location.href;
               var strPath = window.document.location.pathname;
               var pos = strFullPath.indexOf(strPath);
               var prePath = strFullPath.substring(0, pos);
               var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
               return (prePath + postPath);
           }
       };
       var LayObj = {
           initObj: function () {
               var url = LayUrl.path() + "/LayPannel/Default/image/pic12.gif";
               var divobj = '<div id="LayMain" class="LayMain LayDashed">';
               divobj += '<div id="LayMainAll" class="LayMainAll ">';
               divobj += '<div id="LayMainTop" class="LayMainTop LayDashed">本次幸运儿<span id="LaySpan" title="关闭" class="LaySpan"><img src="' + url + '"></span></div>';
               divobj += '<div id="LayMainMiddle" class="LayMainMiddle">LayMainMiddle</div>';
               divobj += '<div id="LayMainFooter" class="LayMainFooter">LayMainFooter</div>';
               divobj += '</div></div><div id="LayShade" class="LayShade"></div>';
               document.body.innerHTML += divobj;
           },
           LayMove: function () {
               var bool = false;
               var offsetX = 0;
               var offsetY = 0;
               $("#LayMainTop").mousedown(function (event) {
                   bool = true;
                   offsetX = event.offsetX ? event.offsetX : event.layerX;
                   offsetY = event.offsetY ? event.offsetY : event.layerY;
                   $("#LayMainTop").css('cursor', 'move');
               })
                .mouseup(function () {
                    bool = false;
                    $("#LayMainTop").css('cursor', 'default');
                })
               $(document).mousemove(function (event) {
                   if (!bool) {
                       return;
                   }
                   else {
                       var x = event.clientX - offsetX;
                       var y = event.clientY - offsetY;
                       $("#LayMain").css("left", x);
                       $("#LayMain").css("top", y);
                   }
               })
           },
           Open: function () {
               $("#LayMain").show(); $("#LayShade").show();
           },
           Close: function () {
               $("#LayMain").hide(); $("#LayShade").hide();
           },
           Click: function () {
               $("#LaySpan").click(function () {
                   LayObj.Close();
               });

           },
           image: function (value) {
        	   var url;
//               var url = LayUrl.path() + "/LayPannel/Default/image/messager_info.gif";
//               if (value == 1) { url = LayUrl.path() + "/LayPannel/Default/image/messager_question.gif"; }
               return url;
           },
           SetLayMainMiddle: function (Value) {
               $("#LayMainMiddle").html(Value);
           },
           SetLayMainFooter: function (Value) {
               $("#LayMainFooter").html(Value);
           },
           SetSize: function (width, height) {
               $("#LayMain").css({ width: width, height: height });
               $("#LayMainAll").css({ width: width - 4, height: height - 4 });
               $("#LayMainMiddle").css({ height: height - 50 - 35 });
           }
       };
       var Message = {
           alter: function (message) {
//               var info = '<div id="MegInfo" class="MegInfo"><img src="' + LayObj.image(0) + '">' + message + '</div>';
               LayObj.SetSize(300, 180);
               var btn = '<input type="button" class="LayBtn LayDashed"  id="LayOK"  value="OK">';
               LayObj.SetLayMainFooter(btn);
//               LayObj.SetLayMainMiddle(info);
               LayObj.Open();
               $("#LayOK").click(function () {
                   LayObj.Close();
               });
           },
           config: function (message,fn) {
               var info = '<div id="MegInfo" class="MegInfo">' + message + '</div>';
               LayObj.SetSize(200, 220);
               var btn = '<img src="LayPannel/Default/image/confirm.gif" class="LayBtn LayDashed" id="LayBtnOK" />';
               btn += '<img src="LayPannel/Default/image/off.gif" class="LayBtn LayDashed" id="LayBtnCancel" />';
               LayObj.SetLayMainFooter(btn);
               LayObj.SetLayMainMiddle(info);
               LayObj.Open();
               $("#LayBtnOK").click(function () {
                   LayObj.Close();
                   if (fn) {
                       fn(true);
                       return true;
                   }
               });
               $("#LayBtnCancel").click(function () {
                   LayObj.Close();
                   if (fn) {
                       fn(false);
                       return true;
                   }
               });
           }
       };
   

