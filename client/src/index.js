import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>

    <App />
  </BrowserRouter>,

  </React.StrictMode>
);

// <React.StrictMode>
// <BrowserRouter>
//   <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       redirectUri={`${window.location.origin}/profile`}
//   >
//       <App />
//   </Auth0Provider>
// </BrowserRouter>
// </React.StrictMode>