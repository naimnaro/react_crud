import React from 'react'
import { Link } from 'react-router-dom';
function Signup() {
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='p-3 bg-white w-25'>
      <h2 className='mb-3'> Sign-Up </h2>
        <form action=''>
          <div className='mb-3'>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Enter Name' className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter email' className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter password' className='form-control rounded-0' />
          </div>
          <button className='btn btn-success w-100 mb-3'>Sign Up</button>
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0'> Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
