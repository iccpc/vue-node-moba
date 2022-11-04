module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const router = express.Router()

  router.get('/all', (req, res) => {

  })

  // 登录页面
  router.get('/login', (req, res) => {

  })

  router.post('/login', (req, res) => {
    
  })

  app.use('/web/api', router)

  // 首页
  app.get('/', (req, res) => {

  })
}