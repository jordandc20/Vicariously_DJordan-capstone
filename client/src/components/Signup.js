import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
const Signup = () => {
    const { loginWithRedirect } = useAuth0();

    function handleSignUp() {
        loginWithRedirect({
            appState: {
                returnTo: "/",
            },
            authorizationParams: {
                screen_hint: "signup",
            },
        });
    };

    return (
        <button className="px-6 py-2 block font-semibold text-white bg-sky-500 rounded-xl hover:bg-ky-600 hover:scale-105 transition duration-200 ease-in-out" onClick={handleSignUp}>
            Sign Up
        </button>
    );
}

export default Signup