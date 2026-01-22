<?php
/** @var yii\web\View $this */
use yii\helpers\Html;
$this->title = 'api';
$this->params['breadcrumbs'][] = $this->title;
?>
<script src="/js/jquery.min.js"></script>
<script>!(function(){const s=Element.prototype.attachShadow;Element.prototype.attachShadow=function(o){const _=s.call(this, o);this.mu=_;return _;}}());</script>
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" referrerpolicy="origin"></script>
<script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js" referrerpolicy="origin"></script>
<script>
    console.log(<?php json_encode($data,320);?>)
    window.agentConfigParams = {
        corpid: '<?php echo $data['corp_id'];?>',           // 必填，企业微信的corpid，必须与当前登录的企业一致
        agentid: <?php echo $data['agentid'];?>,            // 必填，企业微信的应用id（e.g. 1000247）
        timestamp: '<?php echo $data['timestamp'];?>',      // 必填，生成签名的时间戳
        nonceStr: '<?php echo $data['nonceStr'];?>',        // 必填，生成签名的随机串
        signature: '<?php echo $data['signature'];?>',      // 必填，签名，见附录-JS-SDK使用权限签名算法
        jsApiList: ['selectExternalContact'],               // 必填，传入需要使用的接口名称
        success: function (result) {
            window.WWOpenData.bind(document.querySelector('ww-open-data'))
        },
        fail: function (error) {
            console.error(error)
            if (error.errMsg.indexOf('function not exist') > -1) {
                alert('版本过低请升级！')
            }
        }
    }
</script>
<section id="openids"></section>
<section id="departids"></section>
<script>
    !(async () => {
		try {
			const openids = document.getElementById('openids');
			const departids = document.getElementById('departids');
			await agentConfig(window.agentConfigParams);
			/**
			 * 创建 ww-open-data 元素
			 */
			[<?php echo $data['openids'];?>].forEach(function (openid) {
				const el = document.createElement('ww-open-data')
				el.setAttribute('type', 'userName')
				el.setAttribute('openid', openid)
				openids.appendChild(el)
			});
			[<?php echo $data['departids'];?>].forEach(function (openid) {
				const el = document.createElement('ww-open-data')
				el.setAttribute('type', 'departmentName')
				el.setAttribute('openid', openid)
				departids.appendChild(el)
			});
			/**
			 * 绑定 document 上全部的 ww-open-data 元素
			 */
			WWOpenData.bindAll(document.querySelectorAll('ww-open-data'))
		} catch (error) {
			console.error(error)
		}
		/**
		 * 调用 wx.agentConfig
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
				departs = departids.querySelectorAll('ww-open-data'),
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
    })();
</script>