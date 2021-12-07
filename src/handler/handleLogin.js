const mongodb = require('mongodb');
const creatToken = require('../utils/creatToken.js');
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';

const handleLogin = async (req, res) => {
  console.log(' --- handleLogin is called ---');
  console.log('req.body in handleLogin :>> ', req.body);
  const username = req.body.username || null;
  const emailAddress = req.body.emailAddress || null;
  const password = req.body.password || null;
  console.log('username :>> ', username);
  console.log('emailAddress :>> ', emailAddress);
  console.log('password :>> ', password);
  if (!password) {
    const errorMsg =
      'invalid password, please refresh the page and try to login again';
    console.log(errorMsg);
    return res.json({
      success: false,
      message: errorMsg,
    });
  }
  if (!username || !emailAddress) {
    const errorMsg = 'user does not exist, please register';
    console.log(errorMsg);
    return res.json({
      success: false,
      message: errorMsg,
    });
  } else {
    dataOperate();
  }
  async function dataOperate() {
    let conn = null;
    try {
      conn = await MongoClient.connect(url);
      console.log(
        `successfully connected to the database with username: ${username}`
      );
      const test = conn.db('test').collection(username);
      // find
      let arr = await test.find().toArray();

      if (
        arr[0].username !== username ||
        arr[0].emailAddress !== emailAddress ||
        arr[0].password !== password
      ) {
        const erorObj = {
          status: 'failed',
          message: 'emailAddress can not match with username ',
        };
        throw erorObj;
      }
      const jwtToken = creatToken(username);
      console.log('jwtToken :>> ', jwtToken);
      if (!arr[0].jwtToken) {
        await test.insertOne({ jwtToken: jwtToken });
      } else {
        await test.updateMany(
          { jwtToken: arr[0].jwtToken },
          { $set: { jwtToken: jwtToken } }
        );
      }
      const resObj = {
        status: 'success',
        token: jwtToken,
      };
      res.json(resObj);
    } catch (err) {
      const errorMsg = 'failed to login with error: ' + err.message;
      console.log(errorMsg);
      const erorObj = {
        status: 'failed',
        message: errorMsg,
      };
      res.json(erorObj);
    } finally {
      if (conn != null) conn.close();
    }
  }
};

module.exports = handleLogin;
