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
          // customize bell color: bellColor="DeepPink"
          // customize index color: indexColor="DeepSkyBlue"
          // customize bell position: floatPosition="middle"
          // customize bell size: enlargeBell="50"
          // test locally (message serveiv): notificationReadIndication={`http://localhost:4000/notificationReadIndication`}
          // test locally (message serveiv): getNotification={`http://localhost:4000/getNotification/`}
        />
      </div>
    );
  }
};

export default App;
