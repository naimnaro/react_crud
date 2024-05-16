import React, { useState } from 'react';   // React 라이브러리에서 useState 훅을 가져옴.
import { Link, useNavigate } from 'react-router-dom';  // react-router-dom 라이브러리에서 Link 컴포넌트와 useNavigate 훅을 가져옵니다.
import axios from 'axios';
import Validation from './LoginValidation';  // 로그인 유효성 검사파일 LoginValidation.js를 가져옴
import Modal from 'react-bootstrap/Modal';    
import Button from 'react-bootstrap/Button';

function Login({setUser}) {
  const navigate = useNavigate();  // 네비게이션 객체를 가져온다.
  const [values, setValues] = useState({ email: '', password: '' });    // useState 사용, 초기값 values 를 ''로 설정, setValues로 업데이트
  const [errors, setErrors] = useState({});    // 에러 관리
  const [backendError, setBackendError] = useState([]);
  const [showModal, setShowModal] = useState(false);    //알림창 (모달) 상태관리 
  const [modalMessage, setModalMessage] = useState('');

  const handleInput = (event) => {  // 폼에 입력된값을 setValues (업데이트) (onchange : 변경될때)
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));  
  };

  const handleSubmit = (event) => {   // 폼에 입력된값을 버튼을 눌러 제출, (onsubmit : 제출될떄)
    event.preventDefault(); // html 기본 이벤트발생을 방지 
    const err = Validation(values);   // import한 Loginvalidation.js를 바탕으로 유효성 검사 
    setErrors(err);    // 유효성 검사도중 에러발생시, 에러 업데이트 
    if (err.email === '' && err.password === '') { 
      axios
        .post('http://http://13.210.224.243:8081/login', values)//서버의 'http://localhost:8081/login' 엔드포인트로 POST 요청을 보냅니다. 
        .then((res) => {   // 서버로부터 응답을 받았을 때 실행되는 콜백 함수입니다. 응답은 res 객체에 담겨 있습니다.
          if (res.data.errors) {  // 응답한 데이터에 에러발생시, (error 필드가 존재하는지 )
            setBackendError(res.data.errors);    // 에러 발생시, 에러 업데이트 (useState)
          } else if (res.data.success) {  // 에러가 없고, success 필드가 true일시 
            setBackendError([]);
            setUser(res.data.user); // 로그인한 사용자 정보 업데이트
            localStorage.setItem('user', JSON.stringify(res.data.user));  //로컬 스토리지에 사용자 정보 저장
            navigate('/home');  // /home으로 리다이렉트
          } else {
            alert('No record existed');  // 에러도 , 성공도 아님 , 
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
