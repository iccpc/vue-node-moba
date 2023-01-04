/**
 * 院校分类表
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String },
	parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
})

// 虚拟子表
schema.virtual('chilren', {
	localField: '_id', // 
	foreignField: 'parent', // 外键
	justOne: false,
	ref: 'Category'
})

schema.virtual('newsList', {
	localField: '_id',
	foreignField: 'categories',
	justOne: false,
	ref: 'Article'
})

module.exports = mongoose.model('Category', schema)