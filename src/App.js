import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/loginPage";
import React from "react";
import RegistrationForm from "./pages/registrationPage";
import RemindForm from "./pages/remindPage";
import HomePage from "./pages/homePage";
import OrderPage from "./pages/orderPage";
import SettingsPage from "./pages/settingsPage";
import ClientPage from "./pages/clientPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/privateRoute";
import ResetPasswordForm from "./pages/passwordResetPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/reminder" element={<RemindForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/order" element={PrivateRoute(<OrderPage />)} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
