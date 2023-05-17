import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Logout from './components/Logout';
import Callback from './components/Callback';

const ThemeContext = React.createContext({
  theme: "light",
  setTheme: () => "",
});
const App = () => {

  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
    const [theme, setTheme] = useState("light");

  return (
    <div className="App">
{/* <ThemeContext.Provider value="dark"> */}
      {/* <Navbar /> */}
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/callback" element={<Callback />} />
        {/* <Route  path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} /> */}
      </Routes>
      {/* </ThemeContext.Provider> */}
    </div>
  );
}

export default App;


// const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
// useAuth0();

// if (isLoading) {
// return <div>Loading...</div>;
// }
// if (error) {
// return <div>Oops... {error.message}</div>;
// }

// if (isAuthenticated) {
// return (
//   <div>
//     Hello {user.name}{' '}
//     <button onClick={() => logout({ returnTo: window.location.origin })}>
//       Log out
//     </button>
//   </div>
// );
// } else {
// return <button onClick={() => loginWithRedirect()}>Log in</button>;
// }
// }

// https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md