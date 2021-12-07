import React, { useState, useEffect } from 'react';
import GetCurrent from './GetCurrent';
import '../App.css';
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

function Integers(props) {
  const jwtToken = GetToken(props);
  console.log('jwtToken :>> ', jwtToken);
  const emailAddress = props.sendEmailAddress;
  const username = props.sendUserName;
  const password = props.sendPassword;
  //////////
  const [data, setData] = React.useState(null);
  const [currentInt, setCurrentInt] = React.useState(null);

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
  function fetchAPI(param) {
    // param is a highlighted word from the user before it clicked the button
    return fetch('/api/v1/current', {
      method: 'POST',
      headers: {
        Authorization: jwtToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props_current),
    });
  }
  const toggleButtonState = () => {
    console.log('start toggleButtonState :>> ');
    let selectedWord = window.getSelection().toString();
    fetchAPI(selectedWord)
      .then((res) => res.json())
      .then((int) => setCurrentInt(int.int));
  };
  console.log('currentInt :>> ', currentInt);
  return (
    <div className="mainWrap">
      <div className="header">
        <div className="header-fill"></div>
      </div>
      <div className="contents">
        <div className="login">
          <table>
            <button onClick={toggleButtonState}> Click me </button>
            <div> your current int is: {currentInt}</div>
            <label>Current Integer: </label>
            <div class="boxed">{currentInt}</div>
            <br />

            <button variant="sign_in"> Log in </button>
          </table>
        </div>
      </div>
    </div>
  );
}

//////////
export default Integers;
