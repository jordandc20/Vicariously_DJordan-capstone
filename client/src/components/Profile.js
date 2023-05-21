import React, { useState, useContext } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ReactModal from 'react-modal';

import EditUsernameForm from "./EditUsernameForm";
import { UserdataContext } from "../context/UserData";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [showEditUsername, setShowEditUsername] = useState(false)
    const [userData, setUserData] = useContext(UserdataContext);

    // render loading message
    if (isLoading) { return <div>Loading ...</div>; }

    // render username change on frontend
    function handleChangeUserData(newUsername) {
        setUserData({
            ...userData, username: newUsername
        })
    }

    return (
        < div >
            {isAuthenticated && (
                <div>
                    <h1>Hello {userData.username} !</h1>
                    <img src={user.picture} alt={user.name} />
                    <h2>Username: {userData.username}</h2>
                    < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setShowEditUsername(true) }}>Edit_Username_button</button>
                    <ReactModal isOpen={showEditUsername} contentLabel="edut_username_modal" onRequestClose={() => setShowEditUsername(false)}>
                        <EditUsernameForm onEditUsername={handleChangeUserData} onFormClose={() => setShowEditUsername(false)} />
                    </ReactModal>
                    <p>email: {user.email}</p>
                    <h2>name: {user.name}</h2>
                </div>
            )
            }
        </div >
    )
}



export default withAuthenticationRequired(Profile);