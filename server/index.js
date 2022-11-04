const express = require('express')
const config = require('config')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

// 跨域及信息交换格式设置
app.use(express.json())
app.use(require('cors')())
app.use(express.urlencoded({ extended: false }))

// session配置
app.use(session({
  secret: '%$dsdYNBDB(*NJD%sd=sd2212%4&^7ijj',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))

// 挂载路由
require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(config.get('server.port'), function () {
  console.log(`服务启动...| 端口【${config.get('server.port')}】监听中`);
})
