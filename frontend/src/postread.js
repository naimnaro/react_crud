import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function PostRead() {
  const location = useLocation();
  const navigate = useNavigate();
  const post_id = new URLSearchParams(location.search).get('post_id');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/postedit/${post_id}`);
        const postData = response.data;
        setTitle(postData.title);
        setContent(postData.content);
        setAuthor(postData.author_name);
        setCreatedAt(postData.created_at);
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다.', error);
      }
    };

    fetchPost();
  }, [post_id]);

  const handleCancel = () => {
    navigate('/pagenation');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="fw-bold">{title}</h2>
          <p>작성자: {author}</p>
          <p>작성일자: {createdAt}</p>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">내용:</label>
            <textarea id="content" className="form-control" value={content} readOnly />
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-danger" onClick={handleCancel}>돌아가기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRead;
