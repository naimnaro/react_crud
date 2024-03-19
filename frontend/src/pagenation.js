import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Table, Button, Navbar, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function PaginationComponent({ user }) {  // . user 프로퍼티를 props로 받습니다. (세션에 저장중인 유저정보를 얻기위해)
    const [posts, setPosts] = useState([]); // 현재 페이지의 게시글 목록을 담을 상태(posts)를 초기화합니다.
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호를 담을 상태(currentPage)를 초기화합니다.
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수를 담을 상태(totalPages)를 초기화합니다.
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || ''); 
    //검색어를 담을 상태(searchTerm)를 초기화하고, 검색어를 로컬스토리지에 저장, ( for 새로고침, 게시글을 들어갔다나와도 검색한 결과 유지)
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const formatDateTime = (dateTimeString) => {  // 표준시각 적절히 포멧 
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const hour = dateTime.getHours() > 12 ? (dateTime.getHours() - 12).toString().padStart(2, '0') : dateTime.getHours().toString().padStart(2, '0');
        const minute = dateTime.getMinutes().toString().padStart(2, '0');
        const ampm = dateTime.getHours() >= 12 ? '오후' : '오전';

        return `${year}-${month}-${day} | ${ampm} ${hour}:${minute}`;
    };

    const fetchPosts = async (pageNumber) => {
        try {
            const response = await axios.get(`http://localhost:8081/post2?page=${pageNumber}`);
            const formattedPosts = response.data.post.map(post => ({
                ...post,
                created_at: formatDateTime(post.created_at)
            }));
            setPosts(formattedPosts);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('게시물을 불러오는데 실패했습니다.', error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            fetchSearchedPosts(currentPage);
        } else {
            fetchPosts(currentPage);
        }
    }, [currentPage, user, searchTerm]);

    const handlePageChange = async (pageNumber) => {
        setCurrentPage(pageNumber);
        try {
            if (searchTerm) {
                await fetchSearchedPosts(pageNumber);
            } else {
                await fetchPosts(pageNumber);
            }
        } catch (error) {
            console.error('페이지 변경 중 오류가 발생했습니다.', error);
        }
    };

    const handletoPost = () => {
        localStorage.setItem('searchTerm', searchTerm);
        navigate('/post');
    };

    const handletoHome = () => {
        localStorage.removeItem('searchTerm');
        navigate('/home');
    };

    const handleEditPost = (post_id) => {
        localStorage.removeItem('searchTerm');
        navigate(`/postedit?post_id=${post_id}`);
    };

    const handleCardClick = (post_id) => {
        localStorage.setItem('searchTerm', searchTerm);
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
                fetchPosts(currentPage);
            } catch (error) {
                console.error('게시물 삭제에 실패했습니다.', error);
            }
        } else {
            console.log('해당 게시물을 삭제할 권한이 없습니다.');
        }
        setModalMessage('게시글이 삭제되었습니다.');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const fetchSearchedPosts = async (pageNumber) => {  // 실시간 검색,
        try {
            const response = await axios.get(`http://localhost:8081/post/search?term=${searchTerm}`);
            const formattedPosts = response.data.map(post => ({
                ...post,
                created_at: formatDateTime(post.created_at)
            }));
            localStorage.setItem('searchTerm', searchTerm);
            setTotalPages(Math.ceil(formattedPosts.length / 10));

            const startIndex = (pageNumber - 1) * 10;
            const endIndex = pageNumber * 10;
            const postsForPage = formattedPosts.slice(startIndex, endIndex);
            setPosts(postsForPage);
        } catch (error) {
            console.error('검색된 게시물을 불러오는데 실패했습니다.', error);
        }
    };

    const handleSearch = async () => { // 실시간 검색이 아닌, 검색버튼으로 검색어를 제출해야 작동
        if (searchTerm.trim() === "") {
            setSearchTerm('');
            localStorage.removeItem('searchTerm');
            fetchPosts(currentPage);
            return;
        }

        if (searchTerm.length < 2) {
            alert("두 글자 이상의 검색어를 입력하세요.");
            console.log("두 글자 이상의 검색어를 입력하세요.");
            return;
        }

        try {
            await fetchSearchedPosts(1);
            localStorage.setItem('searchTerm', searchTerm);
        } catch (error) {
            alert("검색에 실패했습니다.");
            console.error('검색에 실패했습니다.', error);
        }
    };

    const handleRefresh = async () => {
        localStorage.removeItem('searchTerm');
        window.location.reload();
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="mx-3"> react_crud  </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Form className="d-flex mr-auto mx-2" onSubmit={(e) => e.preventDefault()}>
                        <Form.Control
                            type="text"
                            placeholder="검색어 입력"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                }
                            }}
                            style={{ maxWidth: '400px' }}
                        />
                        <Button variant="btn btn-secondary ml-2 mx-1" onClick={handleRefresh}> Refresh </Button>
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
                                            <td>{post.views}</td>
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
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>게시글 목록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>닫기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PaginationComponent;
