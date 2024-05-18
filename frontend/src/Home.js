import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Home({ user, setUser }) {

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log("User:", user);

        const handlePageChange = () => {
            const validPaths = ['/postlist', '/pagenation'];
            if (!validPaths.includes(location.pathname)) {
                localStorage.removeItem('user');
                setUser(null);
            }
        };

        

        const handleBeforeUnload = (event) => {
            localStorage.removeItem('user');
            setUser(null);
            event.returnValue = ''; // 필요한 경우 브라우저에서 경고 메시지를 표시
        };

        handlePageChange();

        window.addEventListener('popstate', handlePageChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('popstate', handlePageChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };



    }, [user, setUser, location]);

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
