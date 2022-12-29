/**
 * 院校分类表
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String },
	parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	// description: { type: String },
})

schema.virtual('chilren', {
	localField: '_id',
	foreignField: 'parent',
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