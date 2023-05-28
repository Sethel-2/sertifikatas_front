import React, { useState } from 'react';
import '../settingsPage.css';
import Navbar from '../components/navbar';
import { toast } from 'react-toastify';
import { getUser } from '../utils/storage';
import { updateUser } from '../api/user';
import '../components/error.css';
import { validateEmail, validateOnlyLetters, validatePassword, validatePhone, validateRepeatPassword } from '../utils/validations';

function SettingsPage() {
  const user = getUser();
  const [name, setName] = useState(user.firstName);
  const [surname, setSurname] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState(user.phone);
  const [errors, setErrors] = useState({ email: '', password: '', repeatPassword: '', firstName: '', lastName: '', phone: '' })

  const validateFields = () => {
    const { isValid: isEmailValid, error: emailError } = validateEmail(email)
    const { isValid: isPhoneValid, error: phoneError } = validatePhone(phone)
    const { isValid: isFirstNameValid, error: firstNameError } = validateOnlyLetters(name, 'Neteisingai įvestas naudotojo vardas')
    const { isValid: isLastNameValid, error: lastNameError } = validateOnlyLetters(surname, 'Neteisingai įvesta naudotojo pavardė')
    
    const newErrors = {
      email: isEmailValid ? '' : emailError,
      password: '',
      repeatPassword: '',
      phone: isPhoneValid ? '' : phoneError,
      firstName: isFirstNameValid ? '' : firstNameError,
      lastName: isLastNameValid ? '' : lastNameError,
    }

    return newErrors
  }
 
  const handleSave =  async (event)=> {  
      event.preventDefault();
      const newErrors = validateFields()

      const newUser = { 
        firstName: name,
        lastName: surname,
        email,
        phone      
      }

      if(password){
        newUser.password = password;
        const { isValid: isPasswordValid, error: passwordError } = validatePassword(password)
        const { isValid: isRepeatPasswordValid, error: repeatPasswordError } = validateRepeatPassword(password, repeatPassword)
        newErrors.password = isPasswordValid ? '' : passwordError
        newErrors.repeatPassword = isRepeatPasswordValid ? '' : repeatPasswordError
      }
      setErrors(newErrors)
      const isFormValid = !Object.values(newErrors).some(value => value  !== '')
      if (!isFormValid) return
      
      const {user: updatedUser, message} = await updateUser(user._id, newUser);
      
      if(!updatedUser){
        toast.error(message);
        return 
      }
      setTimeout(() => toast.success("Išsaugota"), 1000);
      
      
     localStorage.setItem("user", JSON.stringify(updatedUser))
    
    }
 
  

  return (
    <div className="background-image">
      <Navbar />

      <form className="settings-form" onSubmit={handleSave}>
        <h2 className="settings-title">Nustatymai</h2>

        <div className="form-group">
          <label htmlFor="name-input" className="form-label">Vardas</label>
          <input type="text" id="name-input" className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Vardenis' />
            {errors.firstName ? <div className='error-message'>{errors.firstName}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="surname-input" className="form-label">Pavardė</label>
          <input type="text" id="surname-input" className="form-input" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Pavardenis' />
            {errors.lastName ? <div className='error-message'>{errors.lastName}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="email-input" className="form-label">Elektronis paštas</label>
          <input type="email" id="email-input" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='vardenis.pavardenis@gmail.com' />
            {errors.email ? <div className='error-message'>{errors.email}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="phone-input" className="form-label">Telefono numeris</label>
          <input type="text" id="phone-input" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='+37000000000' />
            {errors.phone ? <div className='error-message'>{errors.phone}</div> : null}
        </div>

        <h2 className="settings-title">Pasikeisti slaptažodį</h2>
        <div className="form-group">
          <label htmlFor="password-input" className="form-label">Slaptažodis</label>
          <input type="password" id="password-input" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password ? <div className='error-message'>{errors.password}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="password-input" className="form-label">Pakartoti slaptažodį</label>
          <input type="password" id="password-input" className="form-input" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            {errors.repeatPassword ? <div className='error-message'>{errors.repeatPassword}</div> : null}
        </div>

        <button type="submit" className="form-button">Išsaugoti</button>
      </form>
    </div>
  );
}

export default SettingsPage;
