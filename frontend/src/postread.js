import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, ListGroup, Form, Button } from 'react-bootstrap';

function PostRead({user}) {
    const location = useLocation();
    const navigate = useNavigate();
    const post_id = new URLSearchParams(location.search).get('post_id');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/comments/${post_id}`);
            setComments(response.data.comments);
        } catch (error) {
            console.error('댓글을 불러오는데 실패했습니다.', error);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/postedit/${post_id}`);
                const postData = response.data;
                setTitle(postData.title);
                setContent(postData.content);
                setAuthor(postData.author_name);
                setCreatedAt(postData.created_at);
            } catch (error) {
                console.error('게시글을 불러오는데 실패했습니다.', error);
            }
        };

        fetchPost();
        fetchComments(); // fetchComments 함수를 여기서 호출
    }, [post_id]);

    const handleCancel = () => {
        navigate('/pagenation');
    };

    const handleSubmitComment = async () => {
        try {
            await axios.post(`http://localhost:8081/comments/${post_id}`, { content: newComment, comment_name: user.name });
            setNewComment('');
            fetchComments(); // 댓글 작성 후 댓글 목록을 다시 가져와서 업데이트
        } catch (error) {
            console.error('댓글 작성에 실패했습니다.', error);
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
                                <td colSpan="2">
                                    <textarea id="content" className="form-control" style={{ height: '400px' }} value={content} readOnly />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <ListGroup className="mb-3">
                    <Form.Label>댓글</Form.Label>
                        {comments.map((comment, index) => (
                            <ListGroup.Item key={index}>{comment.comment_name} : {comment.content}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Form.Group controlId="newComment">
                        <Form.Label>댓글 작성</Form.Label>
                        <Form.Control as="textarea" rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" className="mt-3"onClick={handleSubmitComment}>댓글 작성</Button>
                    <div className="d-flex justify-content-end mt-3">
                        <button type="button" className="btn btn-danger mb-3" onClick={handleCancel}>돌아가기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostRead;
