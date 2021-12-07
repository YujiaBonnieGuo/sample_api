const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';
const handleGetNext = async (req, res) => {
  const username = req.body.username || null;
  const userid = req.body.userid || null;

  if (!username || !userid) {
    console.log('invalid username or userid');
    res.json('Please put the valid user name and user ID');
  }
  function validateId(userid, databaseID) {
    return userid === databaseID;
  }
  async function dataOperate() {
    let connection = null;
    try {
      connection = await MongoClient.connect(url);
      console.log(
        `successfully connected to the database with username: ${username}`
      );
      const test = connection.db('test').collection(username);
      // find
      let arr = await test.find().toArray();
      const databaseID = arr[0].userid;
      if (!validateId(userid, databaseID)) {
        const erorObj = { message: 'userid can not match with username ' };
        throw erorObj;
      }
      const current = arr[0].int;
      console.log('current :>> ', current);
      // update
      const next = parseInt(current) + 1;
      console.log('next :>> ', next);
      await test.updateOne({ int: current }, { $set: { int: next } });
      // await test.updateMany({ int: current }, { $set: { int: next } });
      // find
      arr = await test.find().toArray();
      const nextIn = arr[0].int;
      res.json(
        `Your current integer is: ${current}, and your next integer is ${nextIn}`
      );
    } catch (err) {
      const errorMsg =
        'failed to get integer in database with error: ' + err.message;
      console.log(errorMsg);
      res.json(errorMsg);
    } finally {
      if (connection != null) connection.close();
    }
  }
  dataOperate();
};

module.exports = handleGetNext;
