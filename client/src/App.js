import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Integers from './components/Integers.js';
const App = (props) => {
  let [isLoggedIn, setLoggedIn] = useState(false);
  let [emailAddress, setEmailAddress] = useState('');
  let [username, setUserName] = useState('');
  let [password, setPassword] = useState('');
  if (isLoggedIn === false) {
    return (
      <Login
        callback={setLoggedIn}
        getEmail={setEmailAddress}
        getUserName={setUserName}
        getPassword={setPassword}
      />
    );
  } else {
    return (
      <div className="App">
        <Integers
          sendEmailAddress={emailAddress}
          sendUserName={username}
          sendPassword={password}
        />
      </div>
    );
  }
};

export default App;
