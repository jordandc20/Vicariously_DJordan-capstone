import React, { useState, useContext } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import EditUsernameForm from "./EditUsernameForm";
import { UserdataContext } from "../context/UserData";
import Delete from './Delete';

const Profile = () => {
    const { user, isLoading ,logout} = useAuth0();
    const [showEditUsername, setShowEditUsername] = useState(false)
    const [showDeleteAccnt, setShowDeleteAccnt] = useState(false)
    const [userData, setUserData] = useContext(UserdataContext);



    // render loading message
    if (isLoading) { return <div>Loading ...</div>; }

    // render username change on frontend
    function handleEditUserData(newUsername) {
        setUserData({
            ...userData, username: newUsername
        })
    }
   
    // delete user account
    function handleDelUser(id) {
        logout({ logoutParams: { returnTo: window.location.origin } })
    }

    return (
        < div >
            <div>
                <h1>Hello {userData.username} !</h1>
                <img src={user.picture} alt={user.name} />
                <h2>Username: {userData.username}</h2>
                < button onClick={() => { setShowEditUsername(true) }} className="open-dialog-button">Edit Username</button>
                <EditUsernameForm show={showEditUsername} onEditUsername={handleEditUserData} onFormClose={() => setShowEditUsername(false)} />
                <p>email: {user.email}</p>
                < button onClick={() => { setShowDeleteAccnt(true) }} className="open-dialog-button">Delete Account</button>
                <Delete show={showDeleteAccnt} path="users" name={userData.username} idToDel={userData.id} onDelete={handleDelUser} onFormClose={() => setShowDeleteAccnt(false)} />
            </div >
        </div>
    )
}

export default withAuthenticationRequired(Profile);