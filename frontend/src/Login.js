import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

axios.defaults.withCredentials = true;

function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    localStorage.removeItem('user');
    setUser(null);
    console.log("User:", user);
  }, [setUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if (err.email === '' && err.password === '') {
      axios
        .post('https://www.jungpyo.club/login', values, { withCredentials: true })
        .then((res) => {
          if (res.data.errors) {
            setBackendError(res.data.errors);
          } else if (res.data.success) {
            setBackendError([]);
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/home');
          } else {
            alert('No record existed');
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            setModalMessage(err.response.data.error);
            setShowModal(true);
          } else {
            alert('An error occurred while login');
          }
          console.error(err);
        });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100' style={styles.container}>
      <div className='bg-white p-3 rounded' style={styles.formContainer}>
        <h2>Sign-In</h2>
        {backendError ? (
          backendError.map((e, index) => <p key={index} className='text-danger'>{e.msg}</p>)
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
              style={styles.input}
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
              style={styles.input}
            />
            {errors.password && <span className='text-danger'> {errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0' style={styles.button}>Log in</button>
          <p>You are agree to our terms and policies</p>
          <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none' style={styles.link}>Create Account</Link>
        </form>
      </div>
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

const styles = {
  container: {
    padding: '10px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    borderRadius: '0',
  },
  button: {
    borderRadius: '0',
  },
  link: {
    borderRadius: '0',
  }
};

export default Login;
