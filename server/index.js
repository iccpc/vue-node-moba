const express = require('express')
const config = require('config')
const chalk = require('chalk')
const session = require('express-session')
const app = express()

app.set('secret', 'dnaoi7&*(*69{$#}[sds2]ssdsd4884[]')

// 跨域及信息交换格式设置
app.use(express.json())
app.use(require('cors')())
// 静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))
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

app.listen(5000, function () {
  console.log(`http://localhost:5000`);
})
