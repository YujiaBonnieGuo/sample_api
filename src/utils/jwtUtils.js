const jwt = require('jsonwebtoken');

function jwtValidation(req, res, next) {
  console.log('start jwtValidation :>> ');
  let token = req.body.token || req.query.token || req.headers['authorization'];
  console.log('typeof token in jwtValidation: ', typeof token);
  console.log(' token in jwtValidation: ', token);

  // 解析 token
  if (token) {
    let decoded = jwt.decode(token);
    if (decoded.user_id !== req.body.username) {
      return res.json({ success: false, message: 'invalid token' });
    }
    if (token && decoded.exp <= new Date() / 1000) {
      return res.json({ success: false, message: 'token expired' });
    } else {
      return next();
    }
  } else {
    return res.status(403).send({
      success: false,
      message: 'invalid token',
    });
  }
}
module.exports = jwtValidation;
