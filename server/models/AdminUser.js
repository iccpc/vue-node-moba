const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  aid: { type: String },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: true,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    },
    required: true
  },
  createdata: {
    type: Date
  }
})

module.exports = mongoose.model('AdminUser', schema)
