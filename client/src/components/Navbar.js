import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import CitiesList from './CitiesList';
// import Login from './Login';
// import Logout from './Logout';
// import Signup from './Signup';

const Navbar = () => {
    return (
        <div className="bg-amber-200">
            <NavLink  to='/'>Home</NavLink>
            <NavLink  to='/cities'>My Cities</NavLink>
        </div>
    )
}

export default Navbar