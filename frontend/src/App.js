import React, { useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import PostForm from './post';
import PostList from './postlist';
import Pagination from './pagenation';
import PostEdit from './postedit';
import PostRead from './postread';
import TestModal from './testmodal';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/post" element={<PostForm user={user} setUser={setUser} />} />
        <Route path="/postlist" element={<PostList user={user} setUser={setUser} />} />
        <Route path="/pagenation" element={<Pagination user={user} setUser={setUser} />} />
        <Route path="/postedit" element={<PostEdit user={user} setUser={setUser} />} />
        <Route path="/postread" element={<PostRead user={user} setUser={setUser} />} />
        <Route path="/testmodal" element={<TestModal user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
