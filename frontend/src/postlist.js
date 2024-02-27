import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostList({ user }) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

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
    const handletoPost = () => {
        navigate('/post'); // /post 경로로 이동
    };
    const handletoHome = () => {
        navigate('/home'); // /post 경로로 이동
    };

    return (
        <div className="container">
            <h2 className="text-center">게시물 목록</h2>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {posts.map((post) => (
                        <div key={post.post_id} className="card mb-3" onClick={() => handlePostClick(post.post_id)}>
                            <div className="card-body">
                                <h3 className="card-title">{post.title}</h3>
                                <p className="card-text">작성자: {post.author_name} 작성일자: {post.created_at}</p>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center">
                <button className="btn btn-primary mr-2" onClick={handletoPost}>글쓰러가기</button>
                <button className="btn btn-secondary" onClick={handletoHome}>Home으로</button>
            </div>
        </div>
    );
}

export default PostList;
