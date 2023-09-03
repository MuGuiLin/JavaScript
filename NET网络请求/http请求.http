# http请求 有3个部分组成：请求行Line、请求头Headers、请求体Body（非必传）

# http响应 有3个部分组成：响应行Line、响应头Headers、响应体Body


# 注：
# 1、其实请求 和 响应的数据都是字符串
# 2、而且请求地址URL、Headers中不能用中文因为它是用ASCII编码
# 如一定要用中文可通过encodeURIComponent('沐枫')编码，注：空格也是：encodeURIComponent(' ') 是 %20， encodeURIComponent('/') 是 %2F
#                 通过decodeURIComponent('%E6%B2%90%E6%9E%AB') 或 decodeURI('%E6%B2%90%E6%9E%AB') 解码。
# 3、http协议的GET、POST等请求都是明文传男传输的，所有尽量用https协议，
# 4、GET请求会有历史记录，POST请求没有





# 1 请求行（只有1行）: Request Method / 
# 2 请求头 Headers（可以有多行）【注在请求头的下面要换两行，因为要保留两个换行符】


# 3 请求体 Body 【在Headers中设置不同的Content-Type时，请求体Body中的数据格式也不同！！可以说Content-Type是用来设置请求体数据格式的！！，如果没有请求体那么可能Content-Type也没有】



# 【注：在VSCode中使用REST Client插件 做http请求时，在一个xxx.http文件中，只能有一个请求(点击 Send Request 发送请求），这里为了演示，在一个.http文件写了多个http请求】

# # GET请求实例1
# GET / HTTP/1.1
# Host: admin.muguilin.com


# GET请求实例2
# GET / HTTP/1.1
# Host: www.taobao.com


# GET请求带参数实例：https://www.baidu.com/s?wd=沐枫
GET /?wd=沐枫 HTTP/1.1
Host: www.baidu.com


# POST实例：
# POST /api/v1/user/login HTTP/1.1
# Host: admin.muguilin.com
# Content-Type: application/x-www-form-urlencoded; charset=UTF-8


# username=root&password=123456&captcha=8


# POST /api/v1/user/login HTTP/1.1
# Host: admin.muguilin.com
# Content-Type: application/json; charset=UTF-8


# {
#     "username":"root",
#     "password":"123456",
#     "captcha": "8"
# }





# POST文件上传实例：
# POST /api/file HTTP/1.1
# Host: study.duyiedu.com
# Content-Type: multipart/form-data; boundary=asdf


# --asdf
# Content-Disposition: form-data; name="cover"; filename="./files/001.jpg"
# Content-Type: image/jpeg

# < ./files/001.jpg
# --asdf--


# GET文件下载 在服务端写API时可通过设置响应头Content-Type: application/octet-stream 二进制数据 或 Content-Disposition: attachment 附件 来让客户端在请求时触发下载行为
# app.get('/api/v1/file/xxx.txt', (req, res) => {
#     res.set('Content-Type', 'application/octet-stream');
#     res.set('Content-Disposition', 'attachment; filename="xxx.txt');
#     res.send(`<h1>666</h1> Hello World!`)
# });
 