const jwt = require('jsonwebtoken');

function creatToken(user_id) {
  const token = jwt.sign(
    {
      user_id: user_id,
    },
    'secret',
    {
      expiresIn: 60, //expire time as 60s
    }
  );
  return token;
}

module.exports = creatToken;
