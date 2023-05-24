import React, { useContext, useState } from 'react'

import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../images/vicariously_logo.png'
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import About from './About';
import { UserdataContext } from "../context/UserData";
import { FiMenu } from "react-icons/fi"
const Navbar = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [userData] = useContext(UserdataContext);
  const [openNavMenu, setOpenNavMenu] = useState(false);

  // render loading message
  if (isLoading) { return <div>Loading ...</div> }






  return (
    <header className=" border-b border-gray-300 bg-white shadow-lg py-2">
      <div className='flex items-center justify-between lg:max-w-7xl lg:mx-auto max-w-full px-[8%]  flex-wrap w-full'>
        <NavLink to='/' >
          <img src={logo} width={150} height={100} alt='Vicariously logo' />
        </NavLink>

        < FiMenu className='lg:hidden block h-6 w-6 cursor-pointer' onClick={() => setOpenNavMenu(!openNavMenu)} />
        <nav className={`${openNavMenu ? "block" : "hidden"}  w-full lg:flex lg:items-center lg:w-auto`}>
          <div className='text-base text-gray-600 lg:flex lg:justify-between'>
              <NavLink className="nav-button" to='/'  onClick={() => setOpenNavMenu(!openNavMenu)}>Home</NavLink>
              <NavLink className="nav-button" to='/about'  onClick={() => setOpenNavMenu(!openNavMenu)}>About</NavLink>
              {isAuthenticated && userData && (
                <>
                  <NavLink className="nav-button" to='/profile' onClick={() => setOpenNavMenu(!openNavMenu)}>My Profile</NavLink>
                  <NavLink className="nav-button" to={"/users/" + userData.id + '/cities'}  onClick={() => setOpenNavMenu(!openNavMenu)}>My Cities</NavLink>
                </>)}
              {!isAuthenticated && (
                <>
                  < Login />
                  < Signup />
                </>
              )}
              {isAuthenticated && userData && (
                <Logout />
              )}
          </div>
        </nav>
      </div>
    </header>


    // <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full ">
    // <nav className=" bg-white shadow-lg">

    //   <div className="max-w-6xl mx-auto px-4">
    //     <div className="flex justify-between">

    //       <div className="flex space-x-7">
    //         <div>
    //           <NavLink to='/' className=" flex items-center py-4 px-2">
    //             <img src={logo} width={150} height={100} alt='Vicariously logo' />
    //           </NavLink>
    //         </div>
    //         <div className="hidden md:flex items-center space-x-1">
    //           <NavLink className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold" to='/'>Home</NavLink>
    //           {isAuthenticated && userData && (
    //             <>
    //               <NavLink className="buttons" to='/profile'>My Profile</NavLink>
    //               <NavLink className="buttons" to={"/users/" + userData.id + '/cities'}>My Cities</NavLink>
    //             </>)}
    //         </div>
    //       </div>

    //       <div className="hidden md:flex items-center space-x-3 ">
    //         {!isAuthenticated && (
    //           <>
    //             < Login />
    //             < Signup  />
    //           </>
    //         )}
    //         {isAuthenticated && userData && (
    //           <Logout />
    //         )}
    //       </div>

    //       <div className="md:hidden flex items-center">
    //         <button className="outline-none mobile-menu-button" onClick={(prev)=>setIsMobNavOpen(!prev)}>
    //           <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
    //             x-show="!showMenu"
    //             fill="none"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="2"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path d="M4 6h16M4 12h16M4 18h16"></path>
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="hidden mobile-menu">
    // 		<ul className="">
    // 			<li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
    // 			<li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
    // 			<li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
    // 			<li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
    // 		</ul>
    // 	</div>


    // </nav>
  )
}

export default Navbar