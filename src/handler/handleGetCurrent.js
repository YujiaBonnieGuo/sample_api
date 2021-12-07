const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';
const handleGetCurrent = async (req, res) => {
  console.log('--- handleGetCurrent is called ---');
  const username = req.body.username || null;
  const userid = req.body.userid || null;
  const header = req.header;
  console.log('header :>> ', header.username);

  if (!username || !userid) {
    console.log('invalid username or userid');
    res.json('Please put the valid user name and user ID');
  }
  function validateId(userid, databaseID) {
    return userid === databaseID;
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
      const current = arr[0].int;
      // update
      res.json(`Your current integer is: ${current}`);
    } catch (err) {
      const errorMsg =
        'failed to get integer in database with error: ' + err.message;
      res.json(errorMsg);
    } finally {
      if (conn != null) conn.close();
    }
  }
  dataOperate();
};
module.exports = handleGetCurrent;
