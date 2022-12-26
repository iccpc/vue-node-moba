/**
 * 登录接口
 */
const express = require('express')
const svgCaptcha = require('svg-captcha')

const router = express.Router({
	mergeParams: true
})

// 验证码模块
router.get('/admin/api/login', async (req, res) => {
	
})

router.get('/test', (req, res) => {
	console.log('/test -' + req.session.captcha);
})

// 登录
router.post('/admin/api/login', async (req, res, next) => {
	// await AdminUser.insertMany({username, password})
	const { username, password } = req.body

	//  判断验证码 - 成功

	try {
		// 1. 用户校验
		const user = await AdminUser.findOne({ username }).select('+password')
		assert(user, 422, '用户不存在！')
		// 2. 密码校验
		const isValid = require('bcrypt').compareSync(password, user.password)
		assert(isValid, 422, '密码错误！')
		// 3. 生成token - 登录凭证
		const rules = {
			id: user._id
		}
		const token = jwt.sign(rules, app.get('secret'))
		res.status(200).send({ message: '登录成功', token })
	} catch (err) {
		next(err)
	}

})

module.exports = router