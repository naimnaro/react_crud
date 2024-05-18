import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, ListGroup, Form, Button } from 'react-bootstrap';

axios.defaults.withCredentials = true;

function PostRead({ user }) {
    const location = useLocation();
    const navigate = useNavigate();
    const post_id = new URLSearchParams(location.search).get('post_id');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [views, setViews] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isRequestPending, setIsRequestPending] = useState(false);

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const hour = dateTime.getHours().toString().padStart(2, '0');
        const minute = dateTime.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} | ${hour}:${minute}`;
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://www.jungpyo.club/comments/${post_id}`);
            setComments(response.data.comments);
        } catch (error) {
            console.error('댓글을 불러오는데 실패했습니다.', error);
        } 
    }; 

    const fetchPost = async () => {
        if (isRequestPending) {
            // 이전 요청이 아직 처리 중이므로 현재 요청을 보류합니다.
            return;
        }

        try {
            setIsRequestPending(true);

            const response = await axios.get(`https://www.jungpyo.club/postedit/${post_id}`);
            const postData = response.data;

            setTitle(postData.title);
            setContent(postData.content);
            setAuthor(postData.author_name);
            setCreatedAt(formatDateTime(postData.created_at)); // 변경된 부분
            setViews(postData.views);

            // 조회수 증가 요청
            await axios.post(`https://www.jungpyo.club/post/${post_id}/views`);
            setViews(prevViews => prevViews + 1); // 조회수를 증가시킵니다.
        } catch (error) {
            console.error('게시글을 불러오는데 실패했습니다.', error);
        } finally {
            setIsRequestPending(false);
        }
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
        if (user !== null) {
            console.log("User:", user.name);
        }
    }, [user]);

    const handleCancel = () => {
        window.history.back();
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim()) {
            setModalMessage('내용을 입력해주세요');
            setShowModal(true); // 모달 열기
        } else {
            try {
                await axios.post(`https://www.jungpyo.club/comments/${post_id}`, { content: newComment, comment_name: user.name });
                setNewComment('');
                fetchComments();
            } catch (error) {
                console.error('댓글 작성에 실패했습니다.', error);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleDeleteComment = async (comment_id) => {
        try {
            await axios.delete(`https://www.jungpyo.club/comments/${comment_id}`);
            fetchComments();
        } catch (error) {
            console.error('댓글 삭제에 실패했습니다.', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td className="fw-bold" colSpan="2">{title}</td>
                            </tr>
                            <tr>
                                <td>작성자</td>
                                <td>{author}</td>
                            </tr>
                            <tr>
                                <td>작성일자</td>
                                <td>{createdAt}</td>
                            </tr>
                            <tr>
                                <td>조회수</td>
                                <td>{views}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <textarea id="content" className="form-control" style={{ height: '400px' }} value={content} readOnly />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <ListGroup className='mb-2'>
                        <Form.Label>댓글</Form.Label>
                        {comments.map((comment, index, post) => (
                            <ListGroup.Item key={index} className="d-flex align-items-start">
                                <div className="flex-grow-1" style={{ whiteSpace: 'nowrap' }}>
                                    <div className="d-flex justify-content-between" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}>
                                        <b className="mb-1">{comment.comment_name}</b>
                                        <span className="mb-1">{formatDateTime(comment.created_at)}</span>
                                    </div>
                                    <div className="mt-1" style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</div>
                                    <div className="d-flex justify-content-end align-items-start">
                                        {user && user.name === comment.comment_name ? (
                                            <>
                                                <Button variant="danger" style={{ padding: '0.25rem 0.25rem', fontSize: '0.75rem' }} className="ms-2" onClick={() => handleDeleteComment(comment.comment_id)} > 삭제 </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="danger" style={{ padding: '0.25rem 0.25rem', fontSize: '0.75rem' }} className="invisible">삭제</Button>
                                            </> 
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Form.Group controlId="newComment"> 
                        <Form.Label>댓글 작성</Form.Label>
                        <Form.Control as="textarea" rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" className="mt-3" onClick={handleSubmitComment}>댓글 작성</Button>
                    <div className="d-flex justify-content-end mt-3">
                        <button type="button" className="btn btn-danger mb-3" onClick={handleCancel}>돌아가기</button>
                    </div>
                </div>
            </div>
            {/* 모달 컴포넌트 */}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>댓글</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>닫기</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PostRead;
