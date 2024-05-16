import React, { useState, useEffect } from 'react';
import {Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function PostEdit({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const post_id = new URLSearchParams(location.search).get('post_id');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://13.210.224.243:8081/postedit/${post_id}`);
        const postData = response.data;
        setTitle(postData.title); 
        setContent(postData.content);
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다.', error);
      }
    };

    fetchPost();
  }, [post_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()){
      setModalMessage('제목과 내용을 입력해주세요.');
      setShowModal(true); // 모달 열기
    }
    else
    {
      try {
        await axios.put(`http://13.210.224.243:8081/postedit/${post_id}`, { title, content, author_name: user.name });
        setModalMessage('게시글이 성공적으로 수정되었습니다.');
        setShowModal(true); // 모달 열기
        
      } catch (error) {
        console.error('게시글 수정에 실패했습니다.', error);
        alert('게시글 수정에 실패했습니다.');
      }
    }
  };
  const closeModal = () => {
    if (title.trim() && content.trim()) {
      // 제목과 내용이 존재하는 경우
      setShowModal(false); // 모달 닫기
      navigate('/pagenation'); // 페이지 이동
    } else {
      // 제목 또는 내용이 비어있는 경우
      setShowModal(false); // 모달 닫기
      // 입력창 초기화
      setTitle(title);
      setContent(content);
    }
  };

  const handleCancel = () => {
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
            <button type="submit" className="btn btn-primary me-2">수정 완료</button>
            <button type="button" className="btn btn-danger" onClick={handleCancel}>취소</button>
          </div>
        </form>
      </div>
    </div>
    {/* 모달 컴포넌트 */}
    <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>게시글 수정</Modal.Title>
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

export default PostEdit;
