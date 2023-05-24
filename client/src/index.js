import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin  
        // redirectUri={`${window.location.origin}/profile`}
        // redirect_uri: "http://localhost:4000",
        // audience: `https://${domain}/api/v2/`,
        // scope: "read:current_user update:current_user_metadata"
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </Auth0Provider>
  </React.StrictMode>
);

