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

  const [user, setUser] = useState({email: '', password: '', repeatPassword: '', role: 'client', firstName: '', lastName: '', phone:''})
  const handleRegister = async (event) => {
    event.preventDefault()
    if (user.password !== user.repeatPassword) {
      toast.error("Slaptažodžiai nesutampa");
      return
    }
    user.createdAt = new Date();
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
        <div className="background-image1">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
        <TextLabel className="register-label" htmlFor="username">Prašome prisiregistruoti</TextLabel>
        </div>
        <div className="register-container">
          <form className = "register-form"method = "post" onSubmit = {handleRegister}>
          <TextLabel htmlFor="name">Vardas</TextLabel>
            <InputField type = "text" id="name" name="firstName" label="Vardas" onChange = {handleInputChange}value = {user.firstName}/>
            <TextLabel htmlFor="name">Pavardė</TextLabel>
            <InputField type = "text" id="surname" name="lastName" label="Pavardė" onChange = {handleInputChange}value = {user.lastName}/>
          <TextLabel htmlFor="username">Elektroninis paštas:</TextLabel>
          <InputField id="text" name="email" label="Elektroninis paštas:" onChange = {handleInputChange} value = {user.email}/>
          <TextLabel htmlFor="phone">Telefono numeris</TextLabel>
            <InputField type = "text" id="phone" name="phone" label="Telefono numeris" onChange = {handleInputChange}value = {user.phone}/>
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