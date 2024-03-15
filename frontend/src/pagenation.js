//프론트   ( 리액트 + 부트스트랩 + 모달 (알림창))
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Table, Button, Navbar, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function PaginationComponent({ user }) {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || ''); // 검색어를 localStorage에서 가져옴
    const [searchedPosts, setSearchedPosts] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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

    const fetchPosts = async () => {
        console.log(searchTerm);
        try {
            const response = await axios.get(`http://localhost:8081/post2?page=${currentPage}`);
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
            fetchSearchedPosts();
        } else {
            fetchPosts();
        }

    }, [currentPage, user, searchTerm]);



    const handlePageChange = (page) => {
        localStorage.setItem('searchTerm', searchTerm);
        setCurrentPage(page);
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
                fetchPosts();
            } catch (error) {
                console.error('게시물 삭제에 실패했습니다.', error);
            }
        } else {
            console.log('해당 게시물을 삭제할 권한이 없습니다.');
        }
        setModalMessage('게시글이 삭제되었습니다.');
        setShowModal(true); // 모달 열기
    };
    const closeModal = () => {
        setShowModal(false); // 모달 닫기
    };

    const fetchSearchedPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/post/search?term=${searchTerm}`);
            const formattedPosts = response.data.map(post => ({
                ...post,
                created_at: formatDateTime(post.created_at)
            }));
            localStorage.setItem('searchTerm', searchTerm);
            setSearchedPosts(formattedPosts);

            // 페이지네이션을 위한 정보 설정
            const totalPosts = formattedPosts.length;
            const itemsPerPage = 10; // 페이지당 보여줄 게시글 수
            const totalPages = Math.ceil(totalPosts / itemsPerPage);
            setTotalPages(totalPages);

            // 현재 페이지를 기준으로 페이지별 게시글 가져오기
            const currentPage = 1; // 현재 페이지
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const postsForPage = formattedPosts.slice(startIndex, endIndex);
            setPosts(postsForPage);
        } catch (error) {
            console.error('검색된 게시물을 불러오는데 실패했습니다.', error);
        }
    };

    const handleSearch = async () => {     // 실시간 업데이트가 아닌, search버튼을 통한 검색 
        if (searchTerm.trim() === "") {
            setSearchTerm('');
            localStorage.removeItem('searchTerm'); // 검색어를 localStorage에서 제거
            fetchPosts(); // 검색어가 비어있으면 전체 게시물을 로드
            return;
        }

        if (searchTerm.length < 2) {
            alert("두 글자 이상의 검색어를 입력하세요.");
            console.log("두 글자 이상의 검색어를 입력하세요.");
            return;
        }

        try {
            await fetchSearchedPosts(); // 검색어가 있는 경우에만 검색된 게시물을 로드
            localStorage.setItem('searchTerm', searchTerm); // 검색어를 localStorage에 저장
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
            {/* 모달 컴포넌트 */}
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
