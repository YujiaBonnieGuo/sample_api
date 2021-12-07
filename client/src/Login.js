import React, { useState } from 'react';
import './Login.css';
const REGISTER_URL = '/api/v1/register';

function fetchAPI(props_fetch) {
  // param is a highlighted word from the user before it clicked the button
  return fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props_fetch),
  });
}

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [registerRes, setRegisterRes] = useState('');

  const toggleButtonState = (props_fetch) => {
    console.log('start toggleButtonState :>> ');
    fetchAPI(props_fetch)
      .then((res) => res.json())
      .then((registerRes) => setRegisterRes(registerRes));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.getEmail(emailAddress);
    props.getusername(username);
    props.getPassword(password);
    props.callback(true);
  };
  const props_fetch = {
    username: username,
    emailAddress: emailAddress,
    password: password,
  };
  console.log('props_fetch :>> ', props_fetch);

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
              value={username}
              onChange={(event) => setusername(event.target.value)}
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
          <button onClick={() => toggleButtonState(props_fetch)}>
            Register
          </button>
          <div> {registerRes}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
