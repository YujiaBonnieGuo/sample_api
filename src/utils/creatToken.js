import jwt from 'jsonwebtoken';

function creatToken(user_id) {
  const token = jwt.sign(
    {
      user_id: user_id,
    },
    'secret',
    {
      expiresIn: 60, //过期时间设置为60
    }
  );
  return token;
}

export default creatToken;
