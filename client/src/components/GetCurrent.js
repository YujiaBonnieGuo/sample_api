// const GetCurrent = (props) => {};
// export default GetCurrent;
import React, { useState, useEffect } from 'react';

const GetCurrent = (props) => {
  console.log('props in GetCurrent :>> ', props);
  const [currentInt, setCurrentInt] = useState(null);
  const userName = props.userName;
  const emailAddress = props.emailAddress;
  const password = props.password;
  const token = props.token;

  const bodyContents = {
    username: userName,
    userid: emailAddress,
    password: password,
  };
  useEffect(() => {
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyContents),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(' GetCurrent res :>> ', res);
        setCurrentInt(res);
      });
  }, []);
  console.log('GetCurrent :>> ', currentInt);
  const showInt = () => {
    alert(currentInt);
  };
  return <button onClick={showInt}>Take another shot!</button>;
};
export default GetCurrent;
