const jwt = require('jsonwebtoken');
//检查token是否过期

function jwtValidation(req, res, next) {
  console.log('start jwtValidation :>> ');
  // 获取请求头文件中的token信息
  let token = req.body.token || req.query.token || req.headers['authorization'];
  console.log('typeof token in jwtValidation: ', typeof token);
  console.log(' token in jwtValidation: ', token);

  // 解析 token
  if (token) {
    // 确认token是否正确
    let decoded = jwt.decode(token);
    if (decoded.user_id !== req.body.username) {
      return res.json({ success: false, message: 'invalid token' });
    }
    // 验证token是否过期
    if (token && decoded.exp <= new Date() / 1000) {
      return res.json({ success: false, message: 'token expired' });
    } else {
      return next();
    }
  } else {
    // 如果没有token，则返回错误
    return res.status(403).send({
      success: false,
      message: '没有提供token！',
    });
  }
}
module.exports = jwtValidation;
