import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import Signup from './signup/Signup';
import Messages from './Messages/Messages';
import Signin from './signin/Signin';
import './App.css';
import Home from './Home/Home';
import Formpage from './formpage/Formpage';
import MultipleProfile from './MultipleProfile/MultipleProfile';
import ProfileShowing from './ProfileShowing/ProfileShowing';
import Verify from './formpage/verify';

function App() {
  return (
    <Router> {/* Wrap your routes inside BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/Formpage" element={<Formpage />} />
        <Route path="/MultipleProfile" element = {<MultipleProfile />}></Route>
        <Route path="/profile/:id" element={<ProfileShowing />} />
        <Route path="/Verify" element={<Verify></Verify>} />
        {/* You can add other routes like Signin if needed */}
        
      </Routes>
    </Router>
  );
}

export default App;
