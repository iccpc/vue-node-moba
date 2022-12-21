/**
 * 访问鉴权
 * @param {鉴权配置选项} options 
 */
module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    try {
      // 1. 解析请求头携带 token 令牌
      const token = String(req.headers.authorization || '').split(' ').pop()
      assert(token, 401, '未登录')

      // 2. 校验token令牌是否合法 
      const { id } = jwt.verify(token, req.app.get('secret'))
      assert(id, 401, 'token不合法')

      // 3. 查询用户是否存在
      req.user = await AdminUser.findById(id)
      assert(req.user, 401, '账号不存在')
			
			// 通过验证
      await next()
    } catch (err) {
			// 未通过验证，抛出错误
      await next(err)
    }
  }
}