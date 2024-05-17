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
            const response = await axios.get('https://jungpyo.club/post');
            setPosts(response.data);
        } catch (error) {
            console.error('게시물을 불러오는데 실패했습니다.', error);
        }
    };

   
    const handletoPost = () => {
        navigate('/post'); // /post 경로로 이동 
    };
    const handletoHome = () => {
        navigate('/home'); // /post  경로로 이동 
    };

    return (
        <div className="container">
            <h2 className="text-center">게시물 목록</h2> 
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {posts.map((post) => (
                        <div key={post.post_id} className="card mb-3">
                            <div className="card-body">
                                <h3 className="card-title mb-4">{post.title}</h3>
                                <p className="card-text">  {post.content}</p>
                                <p className="card-text">작성자 : {post.author_name} 작성일자 : {post.created_at}</p>
                            </div>
                        </div>
                    ))}
                    <div className="row justify-content-end">
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary me-2" onClick={handletoPost}>게시글 작성</button>
                            <button className="btn btn-secondary" onClick={handletoHome}>Home </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostList;
