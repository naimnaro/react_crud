
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Pagination() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [currentPage]); // currentPage가 변경될 때마다 useEffect가 호출됩니다.

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/posts?page=${currentPage}&pageSize=${pageSize}`);
      setPosts(response.data);
    } catch (error) {
      console.error('게시물을 불러오는데 실패했습니다.', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>게시물 목록</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}

      {/* 페이지네이션 버튼들 */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)}>이전</button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>다음</button>
      </div>
    </div>
  );
}

export default Pagination;
