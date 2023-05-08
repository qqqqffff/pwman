import React from 'react';
import './Login.css';
// import {login} from '../../server/server.js'

function Login() {
  return (
    <div className="Login">
      <div >
          <LoginButton/>
      </div>
    </div>
  );
}

function LoginButton(){
    function attemptLogin(){
        // const loginResponse: number = login("someUser", "somePassword");
        // if(loginResponse === 1){
        //     //do something
        // }
        // else if(loginResponse === 2){
        //     //do something else
        // }
    }
    return(
        <button onClick={attemptLogin}>

        </button>
    )
}

export default Login;
