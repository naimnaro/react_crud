import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function login() {

    

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-secondary'>
      <div className='p-3 bg-white w-25'>
        <form action=''> 
            <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter email' className='form-control rounded-0'/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Enter password'className='form-control rounded-0'/>
            </div>
            <button className='btn btn-success w-100'>Login</button>
            <button className='btn btn-default border w-100'>Create Account</button>

        </form>
      </div>
    </div>
  )
}

export default login
