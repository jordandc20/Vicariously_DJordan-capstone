import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {  Toaster } from 'react-hot-toast';

import Home from './components/Home'
import CitiesList from './components/CitiesList';
import CityDetails from './components/CityDetails';
import Navbar from './components/Navbar'
import Profile from './components/Profile';
import { UserdataProvider } from "./context/UserData";
import About from './components/About';

function App() {
//   const location = useLocation();
//   useEffect(() => {
//     // Dismiss all active toasts
    
//     toast.dismiss()
//    }, [location])
 
  return (
    <>
    <div><Toaster/></div>
    <div className=" bg-yellow-100 h-screen">
      <UserdataProvider >
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
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
