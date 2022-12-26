const express = require('express')
const config = require('config')
const session = require('express-session')
const app = express()

// 设置加密字符串
app.set('secret', 'dnaoi7&*(*69{$#}[sds2]ssdsd4884[]')

// 信息交换格式设置
app.use(express.json())

// 跨域配置项
let corsOptions = {
	origin: 'http://localhost:8080'  // 允许跨域-源地址
}
// 开启跨域
app.use(require('cors')(corsOptions))

// 静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))

// 开启body内容解析
app.use(express.urlencoded({ extended: false }))

// session配置
app.use(session({
	secret: '%$dsdYNBDB(*NJD%sd',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false, // 安全标值，通过https获取数据
		maxAge: 1000 * 60 * 60
	}
}))

// 挂载路由
require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(5000, function () {
	console.log(`http://localhost:5000`);
})
