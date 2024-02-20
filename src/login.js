import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event){
        event.prevenDefault();
    }
    

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-secondary'>
      <div className='p-3 bg-white w-25'>
        <form onSubmit={handleSubmit}> 
            <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter email' className='form-control'
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Enter password'className='form-control'
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <button className='btn btn-success'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default login
