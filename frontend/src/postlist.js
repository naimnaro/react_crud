import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList({user}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    console.log("User:", user);
  }, [user]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/post');
      setPosts(response.data);
    } catch (error) {
      console.error('게시물을 불러오는데 실패했습니다.', error);
    }
  };

  const handlePostClick = (postId) => {
    // 클릭한 게시물의 상세 내용을 보여주는 기능 구현
  };

  return (
    <div>
      <h2>게시물 목록</h2>
      {posts.map((post) => (
        <div key={post.post_id} onClick={() => handlePostClick(post.post_id)}>
          <h3>{post.title}</h3>
          <p>작성자: {post.author_name} 작성일자: {post.created_at} </p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
