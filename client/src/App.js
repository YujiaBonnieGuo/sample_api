import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Integers from './components/Integers.js';
const App = (props) => {
  let [isLoggedin, setLoggeedin] = useState(false);
  let [emailAddress, setEmailAddress] = useState('');
  let [username, setusername] = useState('');
  let [password, setPassword] = useState('');
  if (isLoggedin === false) {
    return (
      <Login
        callback={setLoggeedin}
        getEmail={setEmailAddress}
        getusername={setusername}
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
