import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostForm({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/post', { title, content, author_name: user.name });
      alert('게시글이 성공적으로 작성되었습니다.');
      // 게시글 작성 후 필요한 작업 수행
      navigate('/pagenation');
    } catch (error) {
      console.error('게시글 작성에 실패했습니다.', error);
      alert('게시글 작성에 실패했습니다.');
    }
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
              <textarea id="content" className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="d-flex justify-content-end"> {/* 오른쪽으로 정렬하는 부분 */}
              <button type="submit" className="btn btn-primary me-2">게시글 등록</button>
              <button type="button" className="btn btn-danger" onClick={handletopostlist}>취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
