import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ user, setUser }) {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("User:", user);
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            {user && (
                <div className="text-center">
                    <p className="mb-4"  style={{ fontSize: '24px' }} >환영합니다, {user.name}님!</p>
                    <button className="btn btn-success" style={{ marginRight: '0.5rem' }}>자유 게시판</button>
                    <button className="btn btn-danger" onClick={handleLogout} style={{ marginRight: '0.5rem' }}>로그아웃</button>
                </div>
            )}
        </div>
    );
}

export default Home;
