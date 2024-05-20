import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Footer.css 파일을 임포트

axios.defaults.withCredentials = true;

function Home({ user, setUser }) {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("User:", user);
    }, [user, setUser]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const handletopagenation = () => {
        navigate('/pagenation');
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            {user && (
                <div className="text-center border rounded bg-white p-4">
                    <p className="mb-4" style={{ fontSize: '24px' }}>환영합니다, {user.name}님!</p>
                    <p className="mb-4" style={{ fontSize: '12px' }}>버그 혹은 개인적으로 궁금한점이 있으면 SNS를 통해 언제든 DM 해주세요. 감사합니다!</p>
                    <div className="d-flex flex-column">
                        <button className="btn btn-success mb-2" onClick={handletopagenation}>자유 게시판</button>
                        <button className="btn btn-danger mb-4" onClick={handleLogout}>로그아웃</button>
                        <div style={{ backgroundColor: '#555', padding: '10px', borderRadius: '5px' }}>
                            <p className="mb-4" style={{ fontSize: '20px', textAlign: 'left', color: '#fff' }}>Developer Info.</p>
                            <div className="footer-link mb-1" style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#fff' }} />
                                <a href="mailto:xez8jf@gmail.com" className="ml-2" style={{ color: '#fff' }}>xez8jf@gmail.com</a>
                            </div>
                            <div className="footer-link mb-1" style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faLink} style={{ color: '#fff' }} />
                                <a href="https://www.jungpyo.info/" target="_blank" rel="noopener noreferrer" className="ml-2" style={{ color: '#fff' }}>jungpyo.info/</a>
                            </div>
                            <div className="footer-link mb-1" style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faInstagram} style={{ color: '#fff' }} />
                                <a href="https://www.instagram.com/naim_naro/" target="_blank" rel="noopener noreferrer" className="ml-2" style={{ color: '#fff' }}>instagram.com/naim_naro/</a>
                            </div>
                        </div>



                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
