import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

    /* const handletotestmodal = () => {
         navigate('/testmodal');
     }; 
      const handletoboard = () => {
         navigate('/postlist');
     };*/

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            {user && (
                <div className="text-center border rounded bg-white p-4">
                    <p className="mb-4" style={{ fontSize: '24px' }}>환영합니다, {user.name}님!</p>
                    <div className="d-flex flex-column">
                        <button className="btn btn-success mb-2" onClick={handletopagenation}>자유 게시판</button>
                        <button className="btn btn-danger mb-2" onClick={handleLogout}>로그아웃</button>
                        <button className="btn btn-info mb-2" onClick={() => window.location.href = "https://www.jungpyo.info/"}>개발자 홈페이지</button>
                        <button className="btn btn-info mb-2" onClick={() => window.location.href = "https://www.instagram.com/naim_naro/"}>개발자 SNS</button>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
