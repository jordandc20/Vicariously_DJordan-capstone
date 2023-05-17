import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        replace with navbar
      </h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>    </div>
  );
}

export default App;
