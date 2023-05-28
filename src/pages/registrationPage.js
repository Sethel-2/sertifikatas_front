import React from 'react';
import '../registrationPage.css';
import '../components/error.css';
import logo from '../images/logo1.png';
import TextLabel from '../components/textLabel';
import InputField from '../components/inputField';
import LinkButton from '../components/linkButton';
import Button from "../components/button";
import { useState } from 'react';
import { register } from '../api/user';
import { toast } from 'react-toastify';
import { validateEmail, validateOnlyLetters, validatePassword, validatePhone, validateRepeatPassword } from '../utils/validations';


function RegistrationForm() {
  const [user, setUser] = useState({email: '', password: '', repeatPassword: '', role: 'client', firstName: '', lastName: '', phone:''})
  const [errors, setErrors] = useState({ email: '', password: '', repeatPassword: '', firstName: '', lastName: '', phone: '' })

  const validateFields = () => {
    const { isValid: isEmailValid, error: emailError } = validateEmail(user.email)
    const { isValid: isPasswordValid, error: passwordError } = validatePassword(user.password)
    const { isValid: isRepeatPasswordValid, error: repeatPasswordError } = validateRepeatPassword(user.password, user.repeatPassword)
    const { isValid: isPhoneValid, error: phoneError } = validatePhone(user.phone)
    const { isValid: isFirstNameValid, error: firstNameError } = validateOnlyLetters(user.firstName, 'Neteisingai įvestas naudotojo vardas')
    const { isValid: isLastNameValid, error: lastNameError } = validateOnlyLetters(user.lastName, 'Neteisingai įvesta naudotojo pavardė')
    
    const newErrors = {
      email: isEmailValid ? '' : emailError,
      password: isPasswordValid ? '' : passwordError,
      repeatPassword: isRepeatPasswordValid ? '' : repeatPasswordError,
      phone: isPhoneValid ? '' : phoneError,
      firstName: isFirstNameValid ? '' : firstNameError,
      lastName: isLastNameValid ? '' : lastNameError,
    }
    setErrors(newErrors)

    return !Object.values(newErrors).some(value => value  !== '')
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    const isFormValid = validateFields();
    if (!isFormValid) return;

    user.createdAt = new Date();
    const {user: createdUser, message} = await register(user);
    
    if(!createdUser){
      toast.error(message);
      return 
    }
    setTimeout(() => toast.success("Registracija sėkminga"), 1000);
    window.location.href = "/"
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
            <InputField type = "text" id="name" name="firstName" label="Vardas" onChange = {handleInputChange} value = {user.firstName} placeholder="Vardenis"/>
            {errors.firstName ? <div className='error-message'>{errors.firstName}</div> : null}
            <TextLabel htmlFor="name">Pavardė</TextLabel>
            <InputField type = "text" id="surname" name="lastName" label="Pavardė" onChange = {handleInputChange} value = {user.lastName} placeholder="Pavardenis"/>
            {errors.lastName ? <div className='error-message'>{errors.lastName}</div> : null}
          <TextLabel htmlFor="username">Elektroninis paštas:</TextLabel>
          <InputField id="text" name="email" label="Elektroninis paštas:" onChange = {handleInputChange} value = {user.email} placeholder="vardenis.pavardenis@gmail.com" />
          {errors.email ? <div className='error-message'>{errors.email}</div> : null}
          <TextLabel htmlFor="phone">Telefono numeris</TextLabel>
            <InputField type = "text" id="phone" name="phone" label="Telefono numeris" onChange = {handleInputChange}value = {user.phone} placeholder="+37000000000" />
            {errors.phone ? <div className='error-message'>{errors.phone}</div> : null}
            <TextLabel htmlFor="password">Slaptažodis:</TextLabel>
            <InputField type = "password" id="password" name="password" label="Slaptažodis:" onChange = {handleInputChange} value = {user.password}/>
            {errors.password ? <div className='error-message'>{errors.password}</div> : null}
            <TextLabel htmlFor="repeatPassword">Pakartoti slaptažodį:</TextLabel>
            <InputField type = "password" id="repeatPassword" name="repeatPassword" label="Pakartoti slaptažodį" onChange = {handleInputChange}value = {user.repeatPassword}/>
            {errors.repeatPassword ? <div className='error-message'>{errors.repeatPassword}</div> : null}
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