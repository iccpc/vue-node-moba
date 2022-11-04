module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const svgCaptcha = require('svg-captcha')
  const router = express.Router()

  const AdminUser = require('../../models/AdminUser')

  router.get('/register', function (req, res) {
    let captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: 5,
      color: true
    })
    req.session.captcha = captcha.text
    res.type('svg')
    res.status(200).send(captcha.data)
  })

  router.post('/register', function (req, res) {
    if (String(req.session.captcha).toLowerCase() !== req.body.check) {
      res.status(200).send({ code: 400, message: "验证码不正确！" })
    }
    res.send({ code: 100, message: "验证通过" })
  })

  app.use('/admin/api', router)

  app.post('/admin/api/login', async (req, res) => {
    // await AdminUser.insertMany({username, password})
    const { username, password } = req.body
    // 用户校验
    const user = await AdminUser.findOne({ username }).select('+password')
    if (!user) {
      return res.send({ code: 401, message: "用户不存在！" })
    }
    // 密码校验
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.send({ code: 402, message: "密码错误！" })
    }
    // 生成token - 登录凭证
    const token = jwt.sign({ id: user._id }, "dnaoi7&*(*69{}[sds2]")
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}