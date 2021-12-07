const mongodb = require('mongodb');
const creatToken = require('../utils/creatToken.js');
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';
function validateId(emailAddress, databaseID) {
  return emailAddress === databaseID;
}
const handleLogin = async (req, res) => {
  console.log(' --- handleLogin is called ---');
  console.log('req.body in handleLogin :>> ', req.body);
  const username = req.body.username || null;
  const emailAddress = req.body.emailAddress || null;
  console.log('username :>> ', username);
  console.log('emailAddress :>> ', emailAddress);

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
      const databaseID = arr[0].emailAddress;
      if (!validateId(emailAddress, databaseID)) {
        const erorObj = {
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
      res.json(jwtToken);
    } catch (err) {
      const errorMsg = 'failed to login with error: ' + err.message;
      console.log(errorMsg);
      res.json(errorMsg);
    } finally {
      if (conn != null) conn.close();
    }
  }
};

module.exports = handleLogin;
