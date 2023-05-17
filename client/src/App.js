import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home'
import CitiesList from './components/CitiesList';
import CityDetails from './components/CityDetails';

function App() {

  //   const fetchData = async () => {
  //     const data = await axios.get("/posts")
  //     setAllPosts(data.data);
  // };

  // useEffect(()=>{
  //     fetchData();
  // },[toggle]);






  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cities" element={<CitiesList />} />
        <Route exact path="/cities/:cityId" element={<CityDetails />} />
      </Routes>
    </div>
  );
}

export default App;
