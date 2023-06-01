import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import {  Toaster } from 'react-hot-toast';

import Home from './components/Home'
import CitiesList from './components/CitiesList';
import CityDetails from './components/CityDetails';
import Navbar from './components/Navbar'
import Profile from './components/Profile';
import { UserdataProvider } from "./context/UserData";
import About from './components/About';

function App() {

 
  return (
    <>
    <div><Toaster/></div>
    <div className=" w-full  h-screen scroll-py-6">
      <UserdataProvider >
        <Navbar />
        <Routes>
          <Route  exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          {/* <Route exact path="/:userId/cities" element={<CitiesList />} /> */}
          <Route exact path="/users/:userId/cities" element={<CitiesList />} />
          <Route exact path="/users/:userId/cities/:cityId" element={<CityDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserdataProvider>
    </div>
    </>
  );
}

export default App;
