import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Table, Button, Navbar, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function PaginationComponent({ user }) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalPosts, setOriginalPosts] = useState([]);
    const navigate = useNavigate();

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const hour = dateTime.getHours() > 12 ? (dateTime.getHours() - 12).toString().padStart(2, '0') : dateTime.getHours().toString().padStart(2, '0');
        const minute = dateTime.getMinutes().toString().padStart(2, '0');
        const ampm = dateTime.getHours() >= 12 ? '오후' : '오전';

        return `${year}-${month}-${day} | ${ampm} ${hour}:${minute}`;
    };

    useEffect(() => {
        fetchPosts();
        if (user !== null) {
            console.log("User:", user.name);
        }
    }, [currentPage, user]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/post2?page=${currentPage}`);
            const formattedPosts = response.data.post.map(post => ({
                ...post,
                created_at: formatDateTime(post.created_at)
            }));
            setPosts(formattedPosts);
            setOriginalPosts(formattedPosts);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('게시물을 불러오는데 실패했습니다.', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handletoPost = () => {
        navigate('/post');
    };

    const handletoHome = () => {
        navigate('/home');
    };

    const handleEditPost = (post_id) => {
        navigate(`/postedit?post_id=${post_id}`);
    };

    const handleCardClick = (post_id) => {
        navigate(`/postread?post_id=${post_id}`);
    };

    const handleDeletePost = async (post_id, author_name) => {
        if (user.name === author_name) {
            try {
                await axios.delete(`http://localhost:8081/post/${post_id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                fetchPosts();
            } catch (error) {
                console.error('게시물 삭제에 실패했습니다.', error);
            }
        } else {
            console.log('해당 게시물을 삭제할 권한이 없습니다.');
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim() === "") {
            // 검색어가 공백이거나 빈 문자열인 경우에는 기존의 테이블로 복구합니다.
            setPosts(originalPosts);
            return;
        }
    
        if (searchTerm.length < 2) {
            alert("두 글자 이상의 검색어를 입력하세요.");
            console.log("두 글자 이상의 검색어를 입력하세요.");
            return; // 두 글자 미만인 경우 검색을 진행하지 않음
        }
        
        try {
            const response = await axios.get(`http://localhost:8081/post/search?term=${searchTerm}`);
    
            // 응답 데이터의 구조를 확인하고 처리
            
            if (response.data && response.data.length > 0) {
                const formattedPosts = response.data.map(post => ({
                    ...post,
                    created_at: formatDateTime(post.created_at)
                }));
                setPosts(formattedPosts);
                setTotalPages(1); // 검색 결과는 한 페이지에 모두 표시되므로 totalPages를 1로 설정
            } else {
                alert("검색 결과가 없습니다.");
                console.error('검색 결과가 없습니다.');
                // 검색 결과가 없는 경우에 대한 처리
            }
        } catch (error) {
            alert("검색에 실패했습니다.");
            console.error('검색에 실패했습니다.', error);
        }
    };
    
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="mx-3"> naimnaro </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    
                    <Form className="d-flex mr-auto mx-2" onSubmit={(e) => e.preventDefault()}>
                        
                        <Form.Control
                            type="text"
                            placeholder="검색어 입력"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault(); // 폼 제출 방지
                                    handleSearch(); // Search 함수 호출
                                }
                            }}
                            style={{ maxWidth: '400px' }} // 너비 조정
                        />
                        <Button variant="btn btn-secondary ml-2 mx-1" onClick={handleSearch}>Search</Button>
                        <button className="btn btn-secondary" onClick={handletoHome}>Home</button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid style={{ whiteSpace: 'pre' }}>
                <Row>
                    <Col>
                        <h2 className="text-center mb-4 mt-4">게시물 목록</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <Table striped bordered hover style={{}}>
                                <thead>
                                    <tr className="text-center">
                                        <th style={{ width: '4%' }}>번호</th>
                                        <th style={{ width: '32%' }}>제목</th>
                                        <th style={{ width: '20%' }}>작성자</th>
                                        <th style={{ width: '30%' }}>작성일자</th>
                                        <th style={{ width: '4%' }}>조회수</th>
                                        <th style={{ width: '10%' }}>비고</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => (
                                        <tr key={post.post_id} className="text-center">
                                            <td className="text-center">{post.post_id}</td>
                                            <td onClick={() => handleCardClick(post.post_id)}>{post.title}</td>
                                            <td>{post.author_name}</td>
                                            <td>{post.created_at}</td>
                                            <td >{post.views}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                {user && user.name === post.author_name && (
                                                    <>
                                                        <Button variant="primary" size="sm" className="me-1" onClick={(e) => { e.stopPropagation(); handleEditPost(post.post_id); }}>수정</Button>
                                                        <Button variant="danger" size="sm" className="me-1" onClick={(e) => { e.stopPropagation(); handleDeletePost(post.post_id, post.author_name); }}>삭제</Button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="pagination d-flex justify-content-center mt-4" style={{ whiteSpace: 'nowrap' }}>
                            <Pagination style={{ whiteSpace: 'nowrap' }}>
                                <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
                                {[...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
                            </Pagination>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end mb-4">
                        <button className="btn btn-primary me-2" onClick={handletoPost}>글작성</button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PaginationComponent;
