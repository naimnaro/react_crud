import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Signup from './Signup';

function Login() {
    const [values, setValues] = useState({
      email : '',
      password: ''
    })
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='mb-3'> Sign-In </h2>
        <form action='' onSubmit={handleSumbit}> 
            <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter email' className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Enter password'className='form-control rounded-0'/>
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
            <p> You are agree to our terms and policies </p>
            <Link to="./Signup" className='btn btn-default border w-100 bg-light rounded-0'> Create Account</Link>
      
        </form>
      </div>
    </div>
  )
}

export default Login
