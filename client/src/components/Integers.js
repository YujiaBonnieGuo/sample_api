import React, { useState, useEffect } from 'react';
import '../App.css';
const CURRENT_URL = '/api/v1/current';
const NEXT_URL = '/api/v1/next';

function GetToken(props) {
  const [token, setToken] = useState(null);
  console.log('props :>> ', props);
  const emailAddress = props.sendEmailAddress;
  const username = props.sendUserName;
  const password = props.sendPassword;
  const bodyContents = {
    username: username,
    emailAddress: emailAddress,
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
function fetchAPI(url, jwtToken, props_current) {
  // param is a highlighted word from the user before it clicked the button
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: jwtToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props_current),
  });
}
function Integers(props) {
  const jwtToken = GetToken(props);
  console.log('jwtToken :>> ', jwtToken);
  const emailAddress = props.sendEmailAddress;
  const username = props.sendUserName;
  const password = props.sendPassword;
  const [data, setData] = React.useState(null);
  const [currentInt, setCurrentInt] = React.useState(null);
  const [nextInt, setNextInt] = React.useState(null);

  React.useEffect(() => {
    fetch('/healthCheck')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  console.log('healthCheck data :>> ', data);

  const props_current = {
    username: username,
    emailAddress: emailAddress,
    password: password,
    token: jwtToken,
  };
  console.log('props_current :>> ', props_current);

  const toggleButtonState = (url) => {
    let operation;
    switch (url) {
      case CURRENT_URL:
        operation = setCurrentInt;
        break;
      case NEXT_URL:
        operation = setNextInt;
        break;
      default:
        console.log('wrong url :>> ', url);
    }
    console.log('start toggleButtonState :>> ');
    fetchAPI(url, jwtToken, props_current)
      .then((res) => res.json())
      .then((int) => operation(int));
  };
  console.log('currentInt :>> ', currentInt);
  return (
    <div className="mainWrap">
      <div className="header">
        <div className="header-fill"></div>
      </div>
      <div className="contents">
        <div className="login">
          <button onClick={() => toggleButtonState(CURRENT_URL)}>
            Get current int
          </button>
          <div> your current int is: {currentInt}</div>
          <br />
          <button onClick={() => toggleButtonState(NEXT_URL)}>
            Get next int
          </button>
          <div> your next int is: {nextInt}</div>
          <br />
        </div>
      </div>
    </div>
  );
}

//////////
export default Integers;
