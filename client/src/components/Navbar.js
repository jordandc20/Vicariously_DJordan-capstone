import React, { useContext, useState, useRef, useEffect } from 'react'

import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../images/vicariously_logo_trans.png'
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import { UserdataContext } from "../context/UserData";
import { Bars3Icon, LifebuoyIcon} from '@heroicons/react/24/solid'

// import { FiMenu } from "react-icons/fi"
const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
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
  if (isLoading)     { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading...</div></>) }


  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white shadow-lg py-1">
      <div className='flex flex-wrap items-center justify-between  lg:mx-auto max-w-full pl-[1%]  pr-[1%]  w-full'>
        <NavLink to='/' >
          <img src={logo} className='object-scale-down md:h-16 h-9' alt='Vicariously logo' />
        </NavLink>
        <Bars3Icon  className="lg:hidden block md:h-10 h-9 text-blue-800 cursor-pointer hover:bg-slate-200 rounded-full p-2" onClick={() => setOpenNavMenu(!openNavMenu)} />
        <nav ref={ref} className={`${openNavMenu ? "block" : "hidden"}   w-full lg:grow lg:flex lg:justify-between lg:items-center lg:mx-auto lg:w-auto`}>
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
                <>
                  <Logout />
                  <div className='lg:border-l-2 lg: pl-3  lg:max-h-12 max-h-9   '>
                    <div className='max-h-full h-full flex-col flex justify-center lg:items-center rounded-full '>
                      <div className='flex content-end items-end'>
                        <img src={user.picture} className='object-scale-down self-end lg:block rounded-full  lg:max-h-10 max-h-6  p-1 opacity-90' alt='user icon' />
                      </div>
                      <div className='lg:block italic font-[475] tracking-wide text-xs'>{userData.username}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>



  )
}

export default Navbar