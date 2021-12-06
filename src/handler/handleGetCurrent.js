import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';
const handleGetCurrent = async (req, res) => {
  console.log('start handleGetCurrent :>> ');
  const username = req.body.username || null;
  const userid = req.body.userid || null;
  const header = req.header;
  // console.log('header :>> ', JSON.stringify(header));
  console.log('header :>> ', header.username);

  if (!username || !userid) {
    console.log('invalid username or userid');
    res.send('Please put the valid user name and user ID');
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
      console.log(arr);
      const databaseID = arr[0].userid;
      if (!validateId(userid, databaseID)) {
        const erorObj = { message: 'userid can not match with username ' };
        throw erorObj;
      }
      const current = arr[0].int;
      // update
      console.log('current :>> ', current);
      res.send(`Your current integer is: ${current}`);
    } catch (err) {
      const errorMsg =
        'failed to get integer in database with error: ' + err.message;
      console.log(errorMsg);
      res.send(errorMsg);
    } finally {
      if (conn != null) conn.close();
    }
  }
  dataOperate();
};

export default handleGetCurrent;
