import React from 'react';
import '../homePage.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo1.png';
import Button from './button';
import { logout } from '../api/user';
import { toast } from 'react-toastify';
import { getUser } from '../utils/storage';

function Navbar() {


  const user = getUser()
  const isCertificator = user && user.role === "certificator" 
  const handleLogout = async() =>{
      const {success, message} = await logout()
      if(!success){
        toast.error(message)
        return
      }
      localStorage.clear("user")
 
     window.location.href = "/"
  }
  if(isCertificator){
    return (
      <nav>
        <ul>
          <Link className="imageLink" to="/home"><img className="pageLogo" src={logo} alt="Logo" /></Link>
          <li><Link className="link1" to="/order">Užsakymai</Link></li>
          <li><Link className="link1" to="/client">Klientai</Link></li>
          <li><Link className="link1" to="/settings">Nustatymai</Link></li>
          <li><Button text = "Atsijungti" className="link1" onClick ={handleLogout}></Button></li>
        </ul>
      </nav>
    );
  }
    return (
      <nav>
        <ul>
          <Link className="imageLink" to="/home"><img className="pageLogo" src={logo} alt="Logo" /></Link>
          <li><Link className="link1" to="/order">Mano užsakymai</Link></li>
          <li><Link className="link1" to="/settings">Nustatymai</Link></li>
          <li><Button text = "Atsijungti" className="link1" onClick ={handleLogout}></Button></li>
        </ul>
      </nav>
    );
   
  }
  export default Navbar;
