module.exports = app => {
	const express = require('express')
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const svgCaptcha = require('svg-captcha')

	const router = express.Router({
		mergeParams: true
	})

	const AdminUser = require('../../models/AdminUser')

	// 自定义中间件
	const authMiddleware = require('../../middleware/auth')
	const resource = require('../../middleware/resource')

	router.get('/', async (req, res) => {
		const queryOptions = {}
		if (req.Model.modelName === 'Category') {
			queryOptions.populate = 'parent'
		}
		const items = await req.Model.find().setOptions(queryOptions).limit(150)
		res.send(items)
	})

	router.get('/:id', async (req, res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})

	router.put('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
		res.send(model)
	})

	router.delete('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndDelete(req.params.id)
		res.send(model)
	})

	
	router.post('/', async (req, res) => {
		const model = await req.Model.create(req.body)
		res.send(model)
	})

	app.use('/admin/api/rest/:resource', authMiddleware(), resource(), router)

	// 验证码
	// app.get('/admin/api/captcha', (req, res) => {
	// 	let captcha = svgCaptcha.create({
	// 		size: 4,
	// 		ignoreChars: '0o1i',
	// 		noise: 5,
	// 		color: true
	// 	})
	// 	req.session.captcha = captcha.text
	// 	res.type('svg')
	// 	res.status(200).send(captcha.data)
	// })
	// app.post('/admin/api/captcha', (req, res, next) => {
	// 	if (String(req.session.captcha).toLowerCase() !== req.body.check) {
	// 		return res.status(200).send({ code: 400, message: "验证码不正确！" })
	// 	}
	// 	res.send({ code: 200, message: "验证通过" })
	// })

	const multer = require('multer') // 文件操作中间件
	const upload = multer({ dest: __dirname + '/../../uploads' })
	app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
		const file = req.file
		file.url = `http://localhost:5000/uploads/${file.filename}`
		res.send(file)
	})

	// 登录
	app.post('/admin/api/login', async (req, res, next) => {
		// await AdminUser.insertMany({username, password})
		const { username, password } = req.body
		// 用户名等信息写入session
		req.session.username = username
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

	// 错误处理函数
	app.use((err, req, res, next) => {
		return res.status(err.statusCode || 500).send({
			message: err.message
		})
	})
}