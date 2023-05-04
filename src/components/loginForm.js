import React from 'react';
import '../loginForm.css';
import logo from '../images/logo1.png';
import { Link } from 'react-router-dom';


function LoginForm() {
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
            <label htmlFor="username">Elektroninis paštas:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Slaptažodis:</label>
            <input type="password" id="password" name="password" />
            <Link className="link" to= "/home">
            <button type="submit">Prisijungti</button>
            </Link>
            <Link className= "link" to= "/registration">
            <button type="button">Sukurti naują paskyrą</button>
            </Link>
            <Link className="link" to="/reminder" > 
            <button type="button">Pamiršote slaptažodį?</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;