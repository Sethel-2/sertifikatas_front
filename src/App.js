import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/loginForm.js';
import React from 'react';
import RegistrationForm from './components/registrationForm';
import RemindForm from './components/remindForm';
import HomePage from './components/homePage';
import OrderPage from './components/orderPage';
import SettingsPage from './components/settingsPage';
import CertificatePage from './components/certificatePage';
import ClientPage from './components/clientPage';


function App() {
  return (
    <>
    
    <Routes>
      <Route path = "/" element={<LoginForm/>}/>
      <Route path = "/registration" element={<RegistrationForm/>}/>
      <Route path = "/reminder" element= {<RemindForm/>}/>
      <Route path = "/home" element= {<HomePage/>}/>
      <Route path = "/order" element= {<OrderPage/>}/>
      <Route path = "/certificate" element= {<CertificatePage/>}/>
      <Route path = "/client" element= {<ClientPage/>}/>
      <Route path = "/settings" element= {<SettingsPage/>}/>
    </Routes>
    </>
      
      
  
  );
}

export default App;
