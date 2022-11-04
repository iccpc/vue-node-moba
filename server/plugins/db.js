const config = require('../config/default.json')

module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect(config.db.host, {
    useNewUrlParser: true
  })
}