import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


const Logout = () => {
    const { logout ,isAuthenticated,} = useAuth0();

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    return  isAuthenticated &&  (
        <button className="button__logout" onClick={handleLogout}>
            This_is_the_Log_Out_button
        </button>
    )
}

export default Logout