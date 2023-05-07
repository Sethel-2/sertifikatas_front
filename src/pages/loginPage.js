import React from 'react';
import '../loginPage.css';
import logo from '../images/logo1.png';
import TextLabel from '../components/textLabel.js';
import InputField from '../components/inputField';
import LinkButton from '../components/linkButton';


function LoginForm() {
  return (
  
    <div className="background-image">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
        <TextLabel htmlFor="username">Prašome prisijungti</TextLabel>
        </div>
        <div className="login-container">
          <form>
          <TextLabel htmlFor="username">Elektroninis paštas:</TextLabel>
          <InputField id="username" name="username"/>
            <TextLabel htmlFor="username">Slaptažodis:</TextLabel>
            <InputField id="username" name="username"/>
            <LinkButton href="/home" className="linkButton">
            Prisijungti
          </LinkButton>
          <LinkButton href="/registration" className="linkButton">
            Sukūrti paskyrą
          </LinkButton>
          <LinkButton href="/reminder" className="linkButton">
            Pamiršote slatažodį?
          </LinkButton>
          </form>
        </div>
      </div>
    </div>
  
  );
}

export default LoginForm;