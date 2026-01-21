<?php

/** @var yii\web\View $this */

use yii\helpers\Html;

$this->title = 'Open-Data';
$this->params['breadcrumbs'][] = $this->title;
?>
<script>!(function(){const s=Element.prototype.attachShadow;Element.prototype.attachShadow=function(o){const _=s.call(this, o);this.mu=_;return _;}}());</script>
<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
<!-- <script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script type="text/javascript" src="//open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script>

注：以下两个是直接在页面上引入 open-data SDK
    1、SDK内容是动态返回的，请严格按照上面的方式引入，不要保存到项目本地后打包引入
    2、referrerpolicy 声明为 origin 是为了让 SDK 能够顺利识别关键域名，不能去掉
-->
<!-- <script src="https://wwcdn.weixin.qq.com/node/open/js/wecom-jssdk-2.3.3.js"></script> -->
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" referrerpolicy="origin"></script>
<script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js" referrerpolicy="origin"></script>

<script>
    new VConsole();
    /**
     * wx.config 参数
     *
     * @see https://open.work.weixin.qq.com/api/doc/90001/90144/90547
     */
    window.configParams = { /* ... */ }
    /**
     * wx.agentConfig 参数
     *
     * @see https://open.work.weixin.qq.com/api/doc/90001/90144/90548
     */
    window.agentConfigParams = {
        debug: true,
        corpid: '<?php echo $data['corp_id'];?>',       // 必填，企业微信的corpid，必须与当前登录的企业一致
        agentid: <?php echo $data['agentid'];?>,        // 必填，企业微信的应用id （e.g. 1000247）
        timestamp: '<?php echo $data['timestamp'];?>',  // 必填，生成签名的时间戳
        nonceStr: '<?php echo $data['nonceStr'];?>',    // 必填，生成签名的随机串
        signature: '<?php echo $data['signature'];?>',  // 必填，签名，见附录-JS-SDK使用权限签名算法
        jsApiList: ['selectExternalContact'],           // 必填，传入需要使用的接口名称 ["getOpenData"]
        success: function (result) {
            console.log(result, '请求微信成功')
            //  wx.agentConfig成功回调后，WWOpenData 才会注入到 window 对象上面
            window.WWOpenData.bind(document.querySelector('ww-open-data'))
        },
        fail: function (res) {
            console.log('查看错误信息' + res)
            if (res.errMsg.indexOf('function not exist') > -1) {
                alert('版本过低请升级')
            }
        }
    }
</script>

<style>
    h1, #container {
        text-align: center;
    }
</style>

<div class="site-open-data">
    <h1>通讯录展示组件 open-data</h1>
    <hr>
    <div id="container">
        <p>WWOpenData.__version__ = <b id="__version__"></b></p>
        <p>WWOpenData.checkSession = <b id="checkSession"></b></p>
        <a href="https://developer.work.weixin.qq.com/document/path/91958" target="_blank" rel="noopener noreferrer">🚀第三方应用开发-服务端API-通讯录展示组件使用说明</a>
        <div>安全控件展示页面</div>
        <div id="openids">显示出前 100 名可见范围人员名单！</div>
    </div>
    <script>
        window.openidList =[<?php echo $openids;?>];  // ['abc123','asd456', ...]
        /*
            1、页面需要同时引入 jweixin-1.2.0.js 和 jwxwork-1.0.0.js
            2、在微信、企业微信环境下，调用 WWOpenData 相关接口前需要保证 wx.agentConfig 执行成功，相关文档
            3、为兼容更多浏览器版本，需要在 ww-open-data 元素显示出来后再调用 bind 函数
            4、在系统浏览器的场景下，agentid 是任意一个有授权关系的第三方应用的 id，agentConfig 是作为浏览器的兼容处理，该方法对应的参数信息需要与登录的用户企业一致
            5、若 userType=userName，openid 对应 userid，若 userType=departmentName，openid 对应 departmentid，详情可以参考 通讯录展示组件
        */
        (async () => {
            try {
                if (WWOpenData) {
                    console.info('WWOpenData demo start')
                    __version__.innerText = WWOpenData.__version__
                    checkSession.innerText = WWOpenData.checkSession
                }
                if (/MicroMessenger/i.test(navigator.userAgent)) {
                    await config(window.configParams)
                }
                await agentConfig(window.agentConfigParams)
                // 若一切正常，此时可以在 window 上看到 WWOpenData 对象
                console.info('window.WWOpenData', window.WWOpenData)
                if (WWOpenData.checkSession) {
                    WWOpenData.checkSession({
                        success() {
                            alert('open-data 登录态校验成功！')
                        },
                        fail() {
                            alert('open-data 登录态过期！')
                        },
                    })
                }
                if (WWOpenData.on) {
                    /**
                     * ww-open-data 元素数据发生变更时触发
                     */
                    WWOpenData.on('update', event => {
                        const openid = event.detail.element.getAttribute('openid')
                        console.info('渲染数据发生变更', openid, event.detail.hasData)
                    })
                    /**
                     * ww-open-data 获取数据失败时触发
                     */
                    WWOpenData.on('error', () => {
                        console.error('获取数据失败')
                    })
                }
                /**
                 * 创建 ww-open-data 元素
                 */
                const openids = document.getElementById('openids')
                // 这里的 window.openidList 是该 demo 页面自行组织的数据，不具备普遍性
                // 开发者进行开发时，需要自己拿到授权企业相对应的 openid
                // 关于 openid 的定义与获得方式，可以关注文档注意事项的第 5 点
                for (const openid of window.openidList) {
                    const element = document.createElement('ww-open-data')
                    element.setAttribute('type', 'userName')
                    element.setAttribute('openid', openid)
                    openids.appendChild(element)
                }
                /**
                 * 绑定 document 上全部的 ww-open-data 元素
                 */
                WWOpenData.bindAll(document.querySelectorAll('ww-open-data'))
                console.info('WWOpenData demo end')
            } catch (error) {
                console.error('WWOpenData demo error', error)
            }
            /**
             * 调用 wx.config
             *
             * @see https://open.work.weixin.qq.com/api/doc/90001/90144/90547
             */
            async function config(config) {
                return new Promise((resolve, reject) => {
                    console.info('wx.config', config)
                    wx.config(config)
                    wx.ready(resolve)
                    wx.error(reject)
                }).then(() => {
                    console.info('wx.ready')
                }, error => {
                    console.error('wx.error', error)
                    throw error
                })
            }
            /**
             * 调用 wx.agentConfig
             *
             * @see https://open.work.weixin.qq.com/api/doc/90001/90144/90548
             */
            async function agentConfig(config) {
                return new Promise((success, fail) => {
                    console.info('wx.agentConfig', config)
                    wx.agentConfig({ ...config, success, fail })
                }).then(res => {
                    console.info('wx.agentConfig success', res)
                    return res
                }, error => {
                    console.error('wx.agentConfig fail', error)
                    throw error
                })
            }
            /**
             * 获取 用户信息和部门信息 提交到后台
             */
            globalThis.setTimeout(() => {
                const users = openids.querySelectorAll('ww-open-data'),
                    departs = [], // departids.querySelectorAll('ww-open-data'),
                    data = {
                        ...window.agentConfigParams,
                        users: {},
                        departs: {}
                    };
                users.length && users.forEach(el => (data.users[el.getAttribute('openid')] = el.mu.textContent));
                departs.length && departs.forEach(el => (data.departs[el.getAttribute('openid')] = el.mu.textContent));
                (users.length || departs.length) && $.ajax({
                    url: '/third/index/update-depart-and-user-name',
                    type: 'POST',
                    data: JSON.stringify(data),
                    success: function (res) {
                        console.log(res);
                        if (100 != res.code) {
                            alert(res.message);
                        }
                    }
                });
            }, 3000);
        })()
    </script>
</div>
