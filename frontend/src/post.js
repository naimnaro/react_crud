import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PostForm({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true); // 페이지 전환을 막기 위해 true로 설정
      await axios.post('http://localhost:8081/post', { title, content, author_name: user.name });
      setModalMessage('게시글이 성공적으로 작성되었습니다.');
      setShowModal(true);
    } catch (error) {
      console.error('게시글 작성에 실패했습니다.', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsSubmitting(false); // 페이지 전환 허용으로 변경
    navigate('/pagenation'); // 모달이 닫힐 때 페이지 전환 실행
  };

  const handletopostlist = () => {
    navigate('/pagenation');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">제목:</label>
              <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">내용:</label>
              <textarea id="content" className="form-control" style={{ height: '400px' }} value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary me-2" disabled={isSubmitting}>게시글 등록</button>
              <button type="button" className="btn btn-danger" onClick={handletopostlist}>취소</button>
            </div>
          </form>
        </div>
      </div>
      {/* 모달 컴포넌트 */}   
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>게시글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostForm;
