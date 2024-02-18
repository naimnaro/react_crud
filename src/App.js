import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {

  let post = '변수활용';
  let [글제목, b] = useState(['블로그 제목1','블로그 제목2','블로그 제목3']);

  return (
    <div className="App">
      <div className ="black-nav">
        <h4> REACT_BLOG</h4>
      </div>
      <div className="list">
        <h4> {글제목}</h4>
        <p> ABCDEF </p>
      </div>
      <div className="list">
        <h4> 아아아2 </h4>
        <p> ABCDEF </p>
      </div>
    
    </div>
  );
}

export default App;
