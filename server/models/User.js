const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  uid: { type: String }, 
  username: { type: String, required: true },
  password: {
    type: String,
    select: true, 
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    },
    required: true
  },
  email: { type: String },
  iphone: { type: String }
})

module.exports = mongoose.model('User', schema)