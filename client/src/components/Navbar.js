import React, { useContext, useState, useRef, useEffect } from 'react'

import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../images/vicariously_logo_trans.png'
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import About from './About';
import { UserdataContext } from "../context/UserData";
// import { FiMenu } from "react-icons/fi"
const Navbar = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [userData] = useContext(UserdataContext);
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (
        openNavMenu &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setOpenNavMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [openNavMenu]);


  // render loading message
  if (isLoading) { return <div>Loading ...</div> }


  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white shadow-lg py-1">
      <div className='flex flex-wrap items-center justify-between  lg:mx-auto max-w-full pl-[1%]  pr-[1%]  w-full'>
        <NavLink to='/' >
          <img src={logo} className='object-scale-down md:h-14 h-9' alt='Vicariously logo' />
        </NavLink>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:hidden block h-6 w-6 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" onClick={() => setOpenNavMenu(!openNavMenu)} />
        </svg>

        {/* < FiMenu className='lg:hidden block h-6 w-6 cursor-pointer' onClick={() => setOpenNavMenu(!openNavMenu)} /> */}
        <nav ref={ref} className={`${openNavMenu ? "block" : "hidden"}  w-full lg:grow lg:flex lg:justify-between lg:items-center lg:mx-auto lg:w-auto`}>
          <div className='w-full lg:flex lg:justify-between lg:items-center  lg:w-auto lg:grow '>
            <div className=' lg:grow  lg:flex lg:justify-center lg:items-center lg:w-auto '>
              <NavLink className="nav-button" to='/' onClick={() => setOpenNavMenu(!openNavMenu)}>Home</NavLink>
              <NavLink className="nav-button" to='/about' onClick={() => setOpenNavMenu(!openNavMenu)}>About</NavLink>
              {isAuthenticated && 'username' in userData && (
                <>
                  <NavLink className="nav-button" to='/profile' onClick={() => setOpenNavMenu(!openNavMenu)}>My Profile</NavLink>
                  <NavLink className="nav-button" to={"/users/" + userData.id + '/cities'} onClick={() => setOpenNavMenu(!openNavMenu)}>My Cities</NavLink>
                </>)}
            </div>
            <div className=' lg:flex  lg:justify-between lg:w-auto '>
              {!isAuthenticated && (
                <>
                  < Login />
                  < Signup />
                </>
              )}
              {isAuthenticated && 'username' in userData && (
                <Logout />
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>



  )
}

export default Navbar