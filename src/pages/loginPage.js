import React from 'react';
import '../loginPage.css';
import logo from '../images/logo1.png';
import TextLabel from '../components/textLabel.js';
import InputField from '../components/inputField';
import LinkButton from '../components/linkButton';
import { useState } from 'react';
import Button from '../components/button';
import { login } from '../api/user';
import { toast } from 'react-toastify';

function LoginForm() {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  

  const handleLogin = async(event) =>{
    event.preventDefault()
      const {user, message} = await login(email,password)
      
      if(!user){
        toast.error(message)
        return
      }
      localStorage.setItem("user", JSON.stringify(user))
 
     window.location.href = "/home"
  }
  
  return (
  
    <div className="background-image">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
        <TextLabel>Prašome prisijungti</TextLabel>
        </div>
        <div className="login-container">
        <form className="login-form" method = "post" onSubmit = {handleLogin}>
          <TextLabel htmlFor="email">Elektroninis paštas:</TextLabel>
          <InputField id="email" name="email" value = {email} onChange ={(event) => setEmail(event.target.value)}/>
            <TextLabel htmlFor="password">Slaptažodis:</TextLabel>
            <InputField type = "password" id="password" name="password" value = {password} onChange ={(event) => setPassword(event.target.value)}/>
            <Button  type = "submit" text = "Prisijungti" className = "linkButton"/> 
          <LinkButton href="/registration" className="linkButton">
            Sukūrti paskyrą
          </LinkButton>
          <LinkButton href="/reminder" className="linkButton">
            Pamiršote slaptažodį?
          </LinkButton>
          </form>
          
        </div>
      </div>
    </div>
  
  );
}

export default LoginForm;