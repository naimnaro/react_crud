import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Home({ user, setUser }) {

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log("User:", user);




     


    }, [user, setUser]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const handletoboard = () => {
        navigate('/postlist');
    };

    const handletopagenation = () => {
        navigate('/pagenation'); 
    };

    const handletotestmodal = () => {
        navigate('/testmodal');
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            {user && (
                <div className="text-center border rounded bg-white p-4">
                    <p className="mb-4" style={{ fontSize: '24px' }}>환영합니다, {user.name}님!</p>
                    <div className="d-flex flex-column">
                        <button className="btn btn-success mb-2" onClick={handletoboard}>자유 게시판(카드박스 버전)</button>
                        <button className="btn btn-success mb-2" onClick={handletopagenation}>자유 게시판(페이징 버전)</button>
                        <button className="btn btn-danger mb-2" onClick={handleLogout}>로그아웃</button>
                        <button className="btn btn-danger mb-2" onClick={handletotestmodal}>모달 테스트</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
