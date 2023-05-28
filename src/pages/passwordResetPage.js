import React, { useState } from "react";
import logo from "../images/logo1.png";
import "../remindPage.css";
import TextLabel from "../components/textLabel";
import LinkButton from "../components/linkButton";
import InputField from "../components/inputField";
import { toast } from "react-toastify";
import Button from "../components/button";
import { resetPassword } from "../api/user";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      toast.error("Slaptažodžiai nesutampa");
      return;
    }

    const { success, message } = await resetPassword(password, token);
    if (!success) {
      toast.error(message);
      return;
    }

    setTimeout(() => toast.success(message), 1000);
    window.location.href = "/"
  };

  return (
    <div className="background-image">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text">
          <TextLabel>Slaptažodžio keitimas</TextLabel>
        </div>
        <div className="remind-container">
          <form className="remind-form">
            <TextLabel htmlFor="password">Įvesti slaptažodį</TextLabel>
            <InputField
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></InputField>
            <TextLabel htmlFor="repeat-password">
              Pakartoti slaptažodį
            </TextLabel>
            <InputField
              id="repeat-password"
              type="password"
              name="repeat-password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            ></InputField>
            <Button
              type="submit"
              className="linkButton"
              onClick={handleResetPassword}
              text="Pakeisti slaptažodį"
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
export default ResetPasswordForm;
