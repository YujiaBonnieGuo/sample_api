import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Integers from './components/Integers.js';
const App = (props) => {
  let [isLoggedin, setLoggeedin] = useState(false);
  let [emailAddress, setEmailAddress] = useState('');
  let [userName, setUserName] = useState('');
  let [password, setPassword] = useState('');
  if (isLoggedin === false) {
    return (
      <Login
        callback={setLoggeedin}
        getEmail={setEmailAddress}
        getUserName={setUserName}
        getPassword={setPassword}
      />
    );
  } else {
    console.log('emailAddress :>> ', emailAddress);
    console.log('userName :>> ', userName);
    console.log('password :>> ', password);
    return (
      <div className="App">
        <Integers
          sendEmailAddress={emailAddress}
          sendUserId={userName}
          sendPassword={password}
        />
      </div>
    );
  }
};

export default App;
