import React from 'react';
import logo from '../images/logo1.png';
import { Link } from 'react-router-dom';
import '../remindForm.css'


function RemindForm() {
  return (
    <div className="background-image">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
          <p>Prašome prisijungti</p>
        </div>
        <div className="login-container">
          <form>
            <label htmlFor="username">Įveskite savo el. paštą:</label>
            <input type="text" id="username" name="username" />
            <button type="submit">Siųsti patvirtinimo laišką</button>
            <Link to="/"className = "returnLogin" htmlFor="returnLogin">Grįžti prie prisijungimo</Link>
            
          </form>
        </div>
      </div>
    </div>
  );
}
export default RemindForm;