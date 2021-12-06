import React, { useState, useEffect } from 'react';
import './Login.css';

function GetToken(props) {
  console.log('props :>> ', props);
  const emailAddress = props.sendEmailAddress;
  const userName = props.sendUserName;
  const password = props.sendPassword;
  const bodyContents = {
    username: emailAddress,
    userid: userName,
    password: password,
  };
  //////////
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyContents),
    })
      .then((res) => res.json())
      .then((token) => setToken(token.message));
  }, []);
  console.log('token :>> ', token);
  return token;
}

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const jwtToken = GetToken(props);
  console.log('jwtToken :>> ', jwtToken);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.getEmail(emailAddress);
    props.getUserName(userName);
    props.getPassword(password);
    props.callback(true);
  };

  return (
    <div className="mainWrap">
      <div className="header">
        <div className="header-fill"></div>
      </div>
      <div className="contents">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter your user name"
              variant="basic_line"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <br />
            <br />
            Email Address
            <br />
            <input
              type="text"
              placeholder="Enter your email address"
              variant="basic_line"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
            <br />
            <br />
            Password
            <br />
            <input
              type="text"
              placeholder="Enter your password"
              variant="basic_line"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <br />
            <button variant="sign_in"> Log in </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
