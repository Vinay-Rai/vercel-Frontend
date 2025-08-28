import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0Provider
     domain="dev-4h0abwxdtwyj7kdv.us.auth0.com"
    clientId="dIzylUieIkEFRlm0O1Q0oa7kOC4g71mC"
    authorizationParams={{
      redirect_uri: window.location.origin
    }} > 
    <App />
    </Auth0Provider>
  </BrowserRouter>,
)
