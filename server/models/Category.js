/**
 * 院校分类表
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: { type: String },
})

module.exports = mongoose.model('Category', schema)