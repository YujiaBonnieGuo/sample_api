// const GetCurrent = (props) => {};
// export default GetCurrent;
import React, { useState, useEffect } from 'react';

function GetCurrent(props) {
  console.log('props in GetCurrent :>> ', props);
  const [currentInt, setCurrentInt] = useState(null);
  const username = props.username;
  const emailAddress = props.emailAddress;
  const password = props.password;
  const token = props.token;

  const bodyContents = {
    username: username,
    emailAddress: emailAddress,
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
  return currentInt;
}
export default GetCurrent;
