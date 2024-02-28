import React, { useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Home from './Home';
import PostForm from './post';
import PostList from './postlist';
import Pagination from './pagenation';

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
      </Routes>
    </Router>
  );
}

export default App;
