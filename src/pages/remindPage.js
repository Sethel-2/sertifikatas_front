import React from 'react';
import logo from '../images/logo1.png';
import '../remindPage.css'
import TextLabel from '../components/textLabel';
import LinkButton from '../components/linkButton';
import InputField from '../components/inputField';



function RemindForm() {
  return (
    <div className="background-image">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
          <TextLabel>Slaptažodžio priminimas</TextLabel>
        </div>
        <div className="remind-container">
          <form className="remind-form">
          <TextLabel htmlFor="username">Įveskite savo el. paštą</TextLabel>
          <InputField id="username" name="username"></InputField>
              <LinkButton href="/" className="linkButton">
              Siųsti patvirtinimo laišką
            </LinkButton>
            <LinkButton href= "/" className="textLink">Grįžti prie prisijungimo</LinkButton>
            
          </form>
        </div>
      </div>
    </div>
  );
}
export default RemindForm;