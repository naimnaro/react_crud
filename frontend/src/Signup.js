import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios'

function Signup() {
  const [values, setValues] = useState({
    name : '',
    email : '',
    password: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) =>{
    setValues(prev => ({...prev, [event.target.name]:event.target.value }))
  }
  const handleSumbit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "")
    {
      axios.post('http://localhost:3000/signup', values)
      .then(res =>{
          navigate('/');
      })
      .catch(err => console.log(err));
    }
    
    
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
      <h2 className='mb-3'> Sign-Up </h2>
        <form action='' onSubmit={handleSumbit}>
          <div className='mb-3'>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Enter Name' name='name'
             onChange={handleInput} className='form-control rounded-0' />
             {errors.name && <span className='text-danger'> {errors.name} </span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter email' name='email'
             onChange={handleInput} className='form-control rounded-0' />
             {errors.email && <span className='text-danger'> {errors.email} </span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter password' name='password'
             onChange={handleInput} className='form-control rounded-0' />
             {errors.password && <span className='text-danger'> {errors.password} </span>}
          </div>
          <button type = 'submit' className='btn btn-success w-100 mb-3'>Sign Up</button>
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0'> Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
