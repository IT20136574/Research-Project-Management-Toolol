import React from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

import Signup from './components/DH_Components/student_Register';
// import { Login } from './components/screens/Login';
// import { Profile } from './components/screens/Profile';
// import { Signup } from './components/screens/Signup';

function App() {
  return (
    <BrowserRouter>

      <Routes>
             <Route path="/" element={<Signup />} />
      </Routes

    ></BrowserRouter>


  );
}

export default App;