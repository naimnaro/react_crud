import React, { useEffect } from 'react';


function Home({ user }) {
    useEffect(() => {
        console.log("User:", user);
    }, [user]);
    const divStyle = {
        fontSize: '60px', // 원하는 크기로 조정하세요
        textAlign: 'center', // 텍스트를 가운데 정렬합니다
        position: 'absolute', // 절대 위치로 설정합니다
        top: '50%', // 수직 방향으로 중앙에 배치합니다
        left: '50%', // 수평 방향으로 중앙에 배치합니다
        transform: 'translate(-50%, -50%)', // 수평 및 수직으로 이동하여 정중앙에 배치합니다
    };

    return (
        <div style={divStyle}>
           {user ? `Welcome ${user.name}!` : "Welcome"}
        </div>
    );
}

export default Home