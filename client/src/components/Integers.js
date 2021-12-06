import React, { useState, useEffect } from 'react';

function Integers(props) {
  console.log('props :>> ', props);
  const emailAddress = props.sendEmailAddress;
  const userName = props.sendUserName;
  const password = props.sendPassword;
  const bodyData = {
    username: emailAddress,
    userid: userName,
    password: password,
  };
  //////////
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/healthCheck')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? 'Loading...' : data}</p>
      </header>
    </div>
  );
}
//////////
export default Integers;
