import mongodb from 'mongodb';
import creatToken from '../utils/creatToken.js';
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';
function validateId(userid, databaseID) {
  return userid === databaseID;
}
const handleLogin = async (req, res) => {
  const username = req.body.username || null;
  const userid = req.body.userid || null;
  console.log('username :>> ', username);
  console.log('userid :>> ', userid);
  console.log('req.body :>> ', req.body);

  if (!username || !userid) {
    console.log('invalid username or userid');
    return res.json({ success: false, message: 'invalid username or userid' });
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
      const databaseID = arr[0].userid;
      if (!validateId(userid, databaseID)) {
        const erorObj = { message: 'userid can not match with username ' };
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
      console.log(arr);
      res.send(jwtToken);
    } catch (err) {
      const errorMsg = 'failed to login with error: ' + err.message;
      console.log(errorMsg);
      res.send(errorMsg);
    } finally {
      if (conn != null) conn.close();
    }
  }
};

export default handleLogin;
