import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {

  let post = '변수활용';
  let [글제목, b] = useState(['블로그 제목1 ','블로그 제목2 ','블로그 제목3 ']);
  let [좋아요,c] = useState(0);

  function plus(){
    c(좋아요 + 1);
  }
    
  return (
    <div className="App">
      <div className ="black-nav">
        <h4> REACT_BLOG</h4>
      </div>
      <div className="list">
        <h4> {글제목[0]} <span onClick={ plus }> 👍 </span> {좋아요} </h4>
        <p> 체력 4700 방어력 329 마저201 인 챔피언👤이 저지불가🚫, 쉴드🛡, 벽🧱 넘기는 거 있고요.
          에어본🌪 있고, 심지어 쿨타임은 1️⃣초밖에 안되고 마나🧙‍♂️는 1️⃣5️⃣ 들고 w는 심지어 변신💫하면 
          쿨 초기화에다가 패시브는 고정피해🗡가 들어가며 그 다음에 방마저🥋 올리면📈 올릴수록📈 
          스킬 가속⏰이 생기고! q에 스킬가속⏰이 생기고 스킬 속도🚀가 빨라지고📈 그 다음에 공격력🗡 
          계수가 있어가지고 W가 그 이익-으아아아악😱😱 </p>
      </div>
      <div className="list">
        <h4> {글제목[1]} </h4>
        <p> ABCDEF </p>
      </div>
      <div className="list">
        <h4> {글제목[2]} </h4>
        <p> ABCDEF </p>
      </div>
    
    </div>
  );
}

export default App;
