import React, { useState, useEffect } from 'react';
import GetCurrent from './GetCurrent';
function GetToken(props) {
  const [token, setToken] = useState(null);
  console.log('props :>> ', props);
  const emailAddress = props.sendEmailAddress;
  const userName = props.sendUserId;
  const password = props.sendPassword;
  const bodyContents = {
    username: userName,
    userid: emailAddress,
    password: password,
  };
  console.log('bodyContents :>> ', bodyContents);
  //////////

  useEffect(() => {
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyContents),
    })
      .then((res) => res.json())
      .then((res) => {
        setToken(res);
      });
  }, []);
  console.log('token :>> ', token);
  return token;
}

function Integers(props) {
  const jwtToken = GetToken(props);
  console.log('jwtToken :>> ', jwtToken);
  const emailAddress = props.sendEmailAddress;
  const userName = props.sendUserName;
  const password = props.sendPassword;
  //////////
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/healthCheck')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  function Football() {
    const shoot = () => {
      alert('Great Shot!');
    };

    return <button onClick={shoot}>Take the shot!</button>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Your jwtToken is: {jwtToken}</p>
        <Football />
        <GetCurrent
          userName={userName}
          emailAddress={emailAddress}
          password={password}
          token={jwtToken}
        />
        <p>{!data ? 'Loading...' : data}</p>
      </header>
    </div>
  );
}
//////////
export default Integers;
