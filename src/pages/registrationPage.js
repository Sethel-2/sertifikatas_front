import React from 'react';
import '../registrationPage.css';
import logo from '../images/logo1.png';
import TextLabel from '../components/textLabel';
import InputField from '../components/inputField';
import LinkButton from '../components/linkButton';

function RegistrationForm() {

    return (
        <div className="background-image">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
        <TextLabel htmlFor="username">Prašome prisiregistruoti</TextLabel>
        </div>
        <div className="login-container">
          <form>
          <TextLabel htmlFor="username">Elektroninis paštas:</TextLabel>
          <InputField id="username" name="username" label="Elektroninis paštas:" />
            <TextLabel htmlFor="username">Slaptažodis:</TextLabel>
            <InputField id="username" name="username" label="Elektroninis paštas:" />
            <TextLabel htmlFor="username">Pakartoti slaptažodį:</TextLabel>
            <InputField id="username" name="username" label="Elektroninis paštas:" />
            <LinkButton href="/" className="linkButton">
            Registruotis
          </LinkButton>
            
           
          <LinkButton href="/" className="textLink">
            Grįžti prie prisijungimo
          </LinkButton>
            
            
          </form>
        </div>
      </div>
    </div>

        );
}

export default RegistrationForm;