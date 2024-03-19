import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function Signup() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });  // values 초기값 '', setValues로 갱신
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});     // 에러 관리
  const [showModal, setShowModal] = useState(false);  //모달 상태 관리
  const [modalMessage, setModalMessage] = useState('');

  const handleInput = (event) => { // 폼에 입력된값을 setValues (업데이트) (onchange : 변경될때)
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {  // 이하 login.js와 동일.
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if (err.name === '' && err.email === '' && err.password === '') {
      try {
        await axios.post('http://localhost:8081/signup', values);
        setModalMessage("회원가입이 완료되었습니다.");
        setShowModal(true); // 모달 열기
        // navigate('/');
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setModalMessage(err.response.data.error);
          setShowModal(true); // 모달 열기
        } else {
          alert('An error occurred while signing up');
        }
        console.error(err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25' style={{ display: showModal ? 'none' : 'block' }}>
        <h2>Sign-Up</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input
              type='text'
              placeholder='Enter Name'
              name='name'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.name && <span className='text-danger'> {errors.name}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.email && <span className='text-danger'> {errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.password && <span className='text-danger'> {errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
          <p>You are agree to our terms and policies</p>
          <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
      </div>
      {/* 모달 컴포넌트 */}
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
