const express = require('express')
const app = express()
const config = require('config')

app.use(require('cors')())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(config.get('server.port'), function () {
  console.log(`服务启动...| 端口【${config.get('server.port')}】监听中`);
})
