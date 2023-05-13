import React from 'react';
import '../registrationPage.css';
import logo from '../images/logo1.png';
import TextLabel from '../components/textLabel';
import InputField from '../components/inputField';
import LinkButton from '../components/linkButton';
import Button from "../components/button";
import { useState } from 'react';
import { register } from '../api/user';
import { toast } from 'react-toastify';


function RegistrationForm() {

  const [user, setUser] = useState({email: '', password: '', repeatPassword: '', role: 'certificator'})
  const handleRegister = async (event) => {
    event.preventDefault()
    if (user.password !== user.repeatPassword) {
      toast.error("Slaptažodžiai nesutampa");
      return
    }
    const {user: createdUser, message} = await register(user);
    
    if(!createdUser){
      toast.error(message);
      return 
    }
    setTimeout(() => toast("Registracija sėkminga"), 1000);
    window.location.href = "/"
    
    
   // localStorage.setItem("user", JSON.stringify(createdUser))
   // const user = JSON.parse(localStorage.getItem("user"))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevClient) => ({
      ...prevClient,
      [name]: value,
      
    }));
  
  };

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
          <form method = "post" onSubmit = {handleRegister}>
          <TextLabel htmlFor="username">Elektroninis paštas:</TextLabel>
          <InputField id="email" name="email" label="Elektroninis paštas:" onChange = {handleInputChange} value = {user.email}/>
            <TextLabel htmlFor="password">Slaptažodis:</TextLabel>
            <InputField type = "password" id="password" name="password" label="Slaptažodis:" onChange = {handleInputChange} value = {user.password}/>
            <TextLabel htmlFor="repeatPassword">Pakartoti slaptažodį:</TextLabel>
            <InputField type = "password" id="repeatPassword" name="repeatPassword" label="Pakartoti slaptažodį" onChange = {handleInputChange}value = {user.repeatPassword}/>
            <Button className="linkButton" type = "submit" text = "Registruotis">
            
          </Button>
            
           
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