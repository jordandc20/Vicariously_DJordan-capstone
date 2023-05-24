import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


const Logout = () => {
    const { logout } = useAuth0();


    return (
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            This_is_the_Log_Out_button
        </button>
    )
}

export default Logout