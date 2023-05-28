import React, { useState } from 'react';
import logo from '../images/logo1.png';
import '../remindPage.css';
import '../components/overlay.css';
import TextLabel from '../components/textLabel';
import LinkButton from '../components/linkButton';
import InputField from '../components/inputField';
import { remindPassword } from '../api/user';
import { toast } from 'react-toastify';
import Button from '../components/button';
import loadingGif from '../images/loading-gif.gif'

function RemindForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRemindPassword = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const { success, message } = await remindPassword(email);
    if (!success) {
      toast.error(message)
      setIsLoading(false)
      return
    }
    toast.success(message);
    setIsLoading(false)
  }

  return (
    <div className="background-image">
      {isLoading ? (
        <div className="loading-overlay">
          <img src={loadingGif} alt="loading" />
        </div>
      ) : null}
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
          <TextLabel>Slaptažodžio priminimas</TextLabel>
        </div>
        <div className="remind-container">
          <form className="remind-form">
            <TextLabel htmlFor="email">Įveskite savo el. paštą</TextLabel>
              <InputField
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></InputField>
              <Button
                type="submit"
                className="linkButton"
                onClick={handleRemindPassword}
                text="Siųsti priminimą"
              />
              <LinkButton href="/" className="textLink">
                Grįžti prie prisijungimo
              </LinkButton>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RemindForm;