import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

axios.defaults.withCredentials = true;

function Signup() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if (err.name === '' && err.email === '' && err.password === '') {
      try {
        await axios.post('https://www.jungpyo.club/signup', values);
        setModalMessage("회원가입이 완료되었습니다.");
        setShowModal(true);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setModalMessage(err.response.data.error);
          setShowModal(true);
        } else {
          alert('An error occurred while signing up');
        }
        console.error(err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded' style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className='text-center'>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'><strong>이름</strong></label>
            <input
              type='text'
              placeholder='Enter Name'
              name='name'
              onChange={handleInput}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.name}</div>
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'><strong>이메일</strong></label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.email}</div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'><strong>비밀번호</strong></label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.password}</div>
          </div>
          <button type='submit' className='btn btn-success w-100'>계정생성</button>
          <p className='text-center mt-2'>You are agree to our terms and policies</p>
          <div className='text-center mt-2'>
            <Link to='/' className='btn btn-default border bg-light text-decoration-none  w-100'>로그인</Link>
          </div>
        </form>
      </div>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>회원가입</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Signup;
