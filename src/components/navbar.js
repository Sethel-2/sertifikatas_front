import React from 'react';
import '../homePage.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo1.png';

function Navbar() {
    return (
      <nav>
        <ul>
          <Link className="imageLink" to="/home"><img className="pageLogo" src={logo} alt="Logo" /></Link>
          <li><Link className="link1" to="/order">Užsakymai</Link></li>
          <li><Link className="link1" to="/client">Klientai</Link></li>
          <li><Link className="link1" to="/settings">Nustatymai</Link></li>
          <li><Link className="link1" to="/">Atsijungti</Link></li>
        </ul>
      </nav>
    );
  }
  export default Navbar;
