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
        <p> 아와와와와와와왕  </p>
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
