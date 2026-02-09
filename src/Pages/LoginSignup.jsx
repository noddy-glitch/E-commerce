import React from 'react'
import './Style/LoginSignup.css'
const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing,i agree to the terms of the use & privacy policy</p>
          </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Already Have an account?<span>Login here</span> </p>
      </div>

    </div>
  )
}

export default LoginSignup
