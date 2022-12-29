const config = require('../config/default.json')

module.exports = app => {
	const mongoose = require('mongoose')
	mongoose.connect(config.db.host, {
		useNewUrlParser: true
	})

	// 引用所有数据模型 - 避免模型索引找不到
	require('require-all')(__dirname + '/../models')
}