const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';
const handleGetCurrent = async (req, res) => {
  console.log('--- handleGetCurrent is called ---');
  const username = req.body.username || null;
  const emailAddress = req.body.emailAddress || null;
  const header = req.header;
  console.log('header :>> ', header);

  if (!username || !emailAddress) {
    console.log('invalid username or emailAddress');
    res.json('Please put the valid user name and emailAddress');
  }
  function validateId(emailAddress, databaseID) {
    return emailAddress === databaseID;
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
      const current = arr[0].int;
      // update
      res.json(current);
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
