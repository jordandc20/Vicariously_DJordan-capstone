import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import EditUsernameForm from "./EditUsernameForm";

const Profile = ({ userData, onUserDataChange }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [showEditUsername, setShowEditUsername] = useState(false)

    if (isLoading) { return <div>Loading ...</div>; }


    return (
        < div >
            {isAuthenticated && (
                <div>
                    <h1>Hello {userData.username} !</h1>
                    <img src={user.picture} alt={user.name} />
                    <h2>Username: {userData.username}</h2>
                    <button onClick={() => setShowEditUsername(!showEditUsername)}>Edit_Username_button</button>
                    {showEditUsername && <EditUsernameForm user_id={userData.id} username={userData.username} onEditUsername={(newUsername) => onUserDataChange(newUsername)} />}
                    <p>email: {user.email}</p>
                    <h2>name: {user.name}</h2>
                </div>
            )
            }

        </div >
    )


}


// <button onClick={() => setShowEdit(showEdit => !showEdit)}>Edit Scientist</button>
//         {showEdit && <ScientistForm scientist={scientist} onScientistRequest={handleUpdateScientist} edit={true}/>}



export default withAuthenticationRequired(Profile);