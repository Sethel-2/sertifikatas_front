import React from 'react';
import '../registrationForm.css';
import logo from '../images/logo1.png';
import {Link} from 'react-router-dom';
function RegistrationForm() {

    return (
        <div className="background-image">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
          <p>Prašome užsiregistruoti</p>
        </div>
        <div className="login-container">
          <form>
            <label htmlFor="username">Elektroninis paštas:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Slaptažodis:</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="password">Pakartoti slaptažodį:</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Registruotis</button>

           
            <Link to="/"className = "returnLogin" htmlFor="returnLogin">Grįžti prie prisijungimo</Link>
            
            
          </form>
        </div>
      </div>
    </div>

        );
}

export default RegistrationForm;