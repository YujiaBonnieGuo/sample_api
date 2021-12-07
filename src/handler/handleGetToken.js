const creatToken = require('../utils/creatToken.js');

const handleGetToken = async (req, res) => {
  console.log('req.body:>> ', req.body);
  console.log(' typeof req.body:>> ', typeof req.body);

  const token = creatToken(req.headers.id);
  console.log('token in handleGetToken :>> ', token);
  res.json({ token: token });
  return { token: token };
};
module.exports = handleGetToken;
