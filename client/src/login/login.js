
import React, { useEffect, useRef } from "react";


function handleLoginForm(email, password) {

    console.log(email);
    console.log(password);
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
  }


  function LoginElement() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const usernameInputRef = useRef();

    return (
      <div className="login">
        <form>
          <input style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} ref={emailInputRef} type='email' placeholder='Email' />
          <input style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} ref={passwordInputRef} type='password' placeholder='Password' />
          <button
            type='submit'
            style={{ padding: '15px', borderRadius: '10px', margin: '10px' }}
            onClick={e => {
              e.preventDefault()
              handleLoginForm(emailInputRef.current.value,passwordInputRef.current.value)
            }}>
            Log In
          </button>
        </form>
      </div>
    );
  }

  export default LoginElement;