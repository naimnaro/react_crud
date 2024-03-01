import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostEdit({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const post_id = new URLSearchParams(location.search).get('post_id');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/postedit/${post_id}`);
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
    try {
      await axios.put(`http://localhost:8081/postedit/${post_id}`, { title, content, author_name: user.name });
      alert('게시글이 성공적으로 수정되었습니다.');
      navigate('/pagenation');
    } catch (error) {
      console.error('게시글 수정에 실패했습니다.', error);
      alert('게시글 수정에 실패했습니다.');
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
  </div>
  );
}

export default PostEdit;
