import React, { useState } from 'react';
import '../settingsPage.css';
import Navbar from '../components/navbar';
import { toast } from 'react-toastify';
import { getUser } from '../utils/storage';
import { updateUser } from '../api/user';

function SettingsPage() {
  const user = getUser();
  const [name, setName] = useState(user.firstName);
  const [surname, setSurname] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState(user.phone);
 
  const handleSave =  async (event)=> {  
      event.preventDefault();
      const newUser = { 
        firstName: name,
        lastName: surname,
        email,
        phone      
      }
      if(password){
      
        newUser.password = password;
      }
      if (password !== repeatPassword) {
        toast.error("Slaptažodžiai nesutampa");
        return
      }
      
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
          <input type="text" id="name-input" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="surname-input" className="form-label">Pavardė</label>
          <input type="text" id="surname-input" className="form-input" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="email-input" className="form-label">Elektronis paštas</label>
          <input type="email" id="email-input" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="phone-input" className="form-label">Telefono numeris</label>
          <input type="text" id="phone-input" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <h2 className="settings-title">Pasikeisti slaptažodį</h2>
        <div className="form-group">
          <label htmlFor="password-input" className="form-label">Slaptažodis</label>
          <input type="password" id="password-input" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password-input" className="form-label">Pakartoti slaptažodį</label>
          <input type="password" id="password-input" className="form-input" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
        </div>

        <button type="submit" className="form-button">Išsaugoti</button>
      </form>
    </div>
  );
}

export default SettingsPage;
