import React, { useState, useEffect } from 'react';
// import '../App.css';
import '../Login.css';
import logo from '../thinkific-logo-white.png';
const CURRENT_URL = '/api/v1/current';
const NEXT_URL = '/api/v1/next';
const RESET_URL = '/api/v1/reset';

function GetToken(props) {
  const [token, setToken] = useState(null);
  const emailAddress = props.sendEmailAddress;
  const username = props.sendUserName;
  const password = props.sendPassword;
  const bodyContents = {
    username: username,
    emailAddress: emailAddress,
    password: password,
  };
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
      .then((res) => setToken(res));
  }, []);
  return token;
}
function fetchAPI(url, jwtToken, props_fetch, resetInt) {
  if (resetInt) {
    props_fetch.resetnumber = resetInt;
  }
  // param is a highlighted word from the user before it clicked the button
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: jwtToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props_fetch),
  });
}
function Integers(props) {
  const emailAddress = props.sendEmailAddress;
  const username = props.sendUserName;
  const password = props.sendPassword;
  const [currentInt, setCurrentInt] = React.useState(null);
  const [nextInt, setNextInt] = React.useState(null);
  const [resetInt, setResetInt] = React.useState(null);
  const [resetRes, setResetRes] = React.useState(null);

  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch('/healthCheck')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  let jwtToken = GetToken(props);

  if (jwtToken && jwtToken.token && jwtToken.status === 'success') {
    jwtToken = jwtToken.token;
  } else {
    return (
      <div className="mainWrap">
        <div className="header">
          <div className="header-fill">
            <img className="logo" src={logo} alt="Logo" />
          </div>
        </div>
        <div className="contents">
          Login failed, please refresh the page and try to login again with the
          correct password.
        </div>
      </div>
    );
  }
  const props_fetch = {
    username: username,
    emailAddress: emailAddress,
    password: password,
    token: jwtToken,
  };
  console.log('props_fetch :>> ', props_fetch);

  const toggleButtonState = (url, resetInt) => {
    let operation;
    switch (url) {
      case CURRENT_URL:
        operation = setCurrentInt;
        break;
      case NEXT_URL:
        operation = setNextInt;
        break;
      case RESET_URL:
        operation = setResetRes;
        break;
      default:
    }
    console.log('start toggleButtonState :>> ');
    fetchAPI(url, jwtToken, props_fetch, resetInt)
      .then((res) => res.json())
      .then((int) => operation(int));
  };
  return (
    <div className="mainWrap">
      <div className="header">
        <div className="header-fill">
          <img className="logo" src={logo} alt="Logo" />
        </div>
      </div>
      <div className="contents">
        <div className="login">
          <button
            className="button"
            onClick={() => toggleButtonState(CURRENT_URL)}
          >
            Get current int
          </button>
          <div> your current int is: {currentInt}</div>
          <br />
          <button
            className="button"
            onClick={() => toggleButtonState(NEXT_URL)}
          >
            Get next int
          </button>
          <div> your next int is: {nextInt}</div>
          <br />

          <br />
          <input
            type="text"
            placeholder="Enter the integer you want to reset"
            variant="basic_line"
            value={resetInt}
            onChange={(event) => setResetInt(event.target.value)}
          />
          <button
            className="button"
            onClick={() => toggleButtonState(RESET_URL, resetInt)}
          >
            Reset
          </button>
          <div>{resetRes}</div>
          <br />
        </div>
      </div>
    </div>
  );
}
// const [resetInt, setResetInt] = React.useState(null);
// const [resetRes, setResetRes] = React.useState(null);
//////////
export default Integers;
