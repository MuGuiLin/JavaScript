
// fetch Api封装
async function ajax(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', // 请求方法： GET, POST, PUT, DELETE, etc.
        mode: 'cors', // 请求模式： no-cors, *cors, same-origin
        cache: 'no-cache', // 缓存模式： *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // 请求凭证： include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'multipart/form-data',
        },
        redirect: 'follow', // 重定向： manual, *follow, error
        referrerPolicy: 'no-referrer', // 引用策略： no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) //  请求体： body data type must match "Content-Type" header
    });
    return response.json(); //  返回：将JSON响应解析为JavaScript对象
};

// 调用
ajax('https://xxx.com/api', { age: 18 }).then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
});