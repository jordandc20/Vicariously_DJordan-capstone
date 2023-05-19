import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);


    if (isLoading) {
        return <div>Loading ...</div>;
    }
    console.log(user)
    console.log(isAuthenticated)
    console.log(isLoading)
    return (
        < div >
            {isAuthenticated && (
                <div>
        <p>This is my profile page YE logged in</p>


                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            )
            }
            {
                !isAuthenticated && (
                    <p>This is my profile page not logged in</p>
                )
}
        </div >
    )


}
    //   return (
    //     isAuthenticated && (
    //         <div>
    //             <img src={user.picture} alt={user.name} />
    //             <h2>{user.name}</h2>
    //             <p>{user.email}</p>
    //         </div>
    //     )
    // );
    // };


    export default Profile;