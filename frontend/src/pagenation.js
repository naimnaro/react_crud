import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Card, Row, Col } from 'react-bootstrap'; // Pagination 및 Card 컴포넌트를 사용하기 위해 import 추가
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS 파일 import
import { useNavigate } from 'react-router-dom';

function PaginationComponent({ user }) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 추가
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
        if (user !== null) {
            console.log("User:", user.name);
        }
    }, [currentPage, user]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/post2?page=${currentPage}`);
            setPosts(response.data.post);
            setTotalPages(response.data.totalPages); // 서버에서 전체 페이지 수를 받아와 설정
        } catch (error) {
            console.error('게시물을 불러오는데 실패했습니다.', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handletoPost = () => {
        navigate('/post'); // /post 경로로 이동
    };

    const handletoHome = () => {
        navigate('/home'); // /post 경로로 이동
    };

    const handleEditPost = (post_id) => {
        navigate(`/postedit?post_id=${post_id}`); // 게시물 수정 페이지로 이동
    };

    const handleDeletePost = async (post_id, author_name) => {
        if (user.name === author_name) {
            try {
                // 서버로 삭제 요청 보내기
                await axios.delete(`http://localhost:8081/post/${post_id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}` // 사용자의 인증 토큰을 헤더에 포함하여 보냄
                    }
                });

                // 삭제가 성공한 경우, 게시물 목록을 갱신하여 업데이트
                fetchPosts();
            } catch (error) {
                console.error('게시물 삭제에 실패했습니다.', error);
            }
        } else {
            console.log('해당 게시물을 삭제할 권한이 없습니다.');
        }
    }
    return (
        <div className="container mb-3">
            <h2 className="text-center mb-3">게시물 목록</h2>
            <div className="card-container">
                {posts.map((post) => (
                    <Card key={post.post_id} className="mb-3">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between align-items-center">
                                <span> {post.title} </span>
                                <div className="ml-auto">
                                    {user && user.name === post.author_name && (
                                        <>
                                            <button className="btn btn-primary btn-sm me-2"  onClick={() => handleEditPost(post.post_id)}>수정</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post.post_id, post.author_name)}>삭제</button>
                                        </>
                                    )}
                                </div>
                            </Card.Title>

                            <Card.Text>{post.content}</Card.Text>
                            <Card.Text>
                                <Row>
                                    <Col xs={6}>작성자 : {post.author_name}</Col>
                                    <Col xs={6} className="text-end">작성일자 : {post.created_at}</Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <div className="pagination d-flex justify-content-center"> {/* d-flex justify-content-center 클래스 추가 */}
                <Pagination>
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
                </Pagination>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary me-2" onClick={handletoPost}>게시글 작성</button>
                <button className="btn btn-secondary" onClick={handletoHome}>Home</button>
            </div>
        </div>
    );
}

export default PaginationComponent;
