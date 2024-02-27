import React, { useState,useEffect } from 'react';
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
    } catch (error) {
      console.error('게시글 작성에 실패했습니다.', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  const handletopostlist = () => {
    navigate('/postlist');
    
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">제목:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="content">내용:</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button type="submit">글쓰기</button>

      <button className="btn btn-danger" onClick={handletopostlist} style={{ marginRight: '0.5rem' }}>글 목록</button>
    </form>
  );
}

export default PostForm;
