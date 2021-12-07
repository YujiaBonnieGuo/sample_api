const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';
async function checkusername(connection, username) {
  try {
    const test = connection.db('test').collection(username);
    const res = await test.find().toArray();
    if (res[0].username === username) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
}
const handleRegister = async (req, res) => {
  const username = req.body.username || null;
  const emailAddress = req.body.emailAddress || null;
  const password = req.body.password || null;
  const userint = req.body.int || 0;

  async function dataOperate() {
    let connection = null;
    try {
      connection = await MongoClient.connect(url);
      const ifValidusername = await checkusername(connection, username);
      if (!ifValidusername) {
        const erorObj = { message: 'emailAddress already exist' };
        throw erorObj;
      }
      console.log(
        `successfully connected to the database with username: ${username}`
      );

      connection.db('test').createCollection(username);
      const test = connection.db('test').collection(username);
      // add
      await test.insertOne({
        username: username,
        emailAddress: emailAddress,
        password: password,
        int: userint,
      });
      // find
      let arr = await test.find().toArray();
      const initInt = arr[0].int;
      res.json(
        `Successfully registed for username: ${username} with integer initialized as ${initInt}`
      );
    } catch (err) {
      const errorMsg = 'failed to register with error: ' + err.message;
      res.json(errorMsg);
    } finally {
      if (connection != null) connection.close();
    }
  }
  dataOperate();
};

module.exports = handleRegister;
