import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getEmail(emailAddress);
    props.getusername(username);
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
        </div>
      </div>
    </div>
  );
};

export default Login;
