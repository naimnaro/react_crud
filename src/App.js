import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {

  let post = '변수활용';
  let [글제목, b] = useState(['블로그 제목1','블로그 제목2','블로그 제목3']);

  return (
    <div className="App">
      <div className ="black-nav">
        <h4> 리액트 리액트 야야야 아와와왕</h4>
      </div>
      <div className="list">
        <h4> 아아아 </h4>
      </div>
      <div className="list">
        <h4> 아아아2 </h4>
      </div>
    
    </div>
  );
}

export default App;
