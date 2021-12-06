import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';
async function checkUserName(connection, username) {
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
  const userid = req.body.userid || null;
  const password = req.body.password || null;
  const userint = req.body.int || 0;

  async function dataOperate() {
    let connection = null;
    try {
      connection = await MongoClient.connect(url);
      const ifValidUserName = await checkUserName(connection, username);
      if (!ifValidUserName) {
        const erorObj = { message: 'userid already exist' };
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
        userid: userid,
        password: password,
        int: userint,
      });
      // find
      let arr = await test.find().toArray();
      console.log(arr);
      const initInt = arr[0].int;
      res.json(
        `Successfully registed for username: ${username} with integer initialized as ${initInt}`
      );
    } catch (err) {
      const errorMsg = 'failed to register with error: ' + err.message;
      console.log(errorMsg);
      res.json(errorMsg);
    } finally {
      if (connection != null) connection.close();
    }
  }
  dataOperate();
};

export default handleRegister;
