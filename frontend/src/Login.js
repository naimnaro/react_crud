// 프론트 (리액트 + 부트스트랩 + 모달 (알림창))
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Login({setUser}) {
  const [values, setValues] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if (err.email === '' && err.password === '') {
      axios
        .post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data.errors) {
            setBackendError(res.data.errors);
          } else if (res.data.success) {
            setBackendError([]);
            setUser(res.data.user); // 로그인한 사용자 정보 설정
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/home');
          } else {
            alert('No record existed');
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            setModalMessage(err.response.data.error); // 성공 메시지 설정
            setShowModal(true); // 모달 열기
            
          } else {
            alert('An error occurred while login'); // 기본적인 오류 메시지를 표시
          }
          console.error(err); // 에러 콘솔 출력
        });
    }
  };
  const closeModal = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        {backendError ? (
          backendError.map((e) => <p className='text-danger'>{e.msg}</p>)
        ) : (
          <span></span>
        )}
        <form action='' onSubmit={handleSubmit}>
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
          <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
          <p>You are agree to our terms and policies</p>
          <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
        </form>
      </div>
      {/* 모달 컴포넌트 */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>로그인 실패</Modal.Title>
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

export default Login;
