import React, { useState } from 'react';
import '../settingsPage.css';
import Navbar from '../components/navbar';

function SettingsPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    // You can add your code here to save the changes to the backend
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
          <label htmlFor="password-input" className="form-label">Slaptažodis</label>
          <input type="password" id="password-input" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="form-button">IŠsaugoti</button>
      </form>
    </div>
  );
}

export default SettingsPage;
