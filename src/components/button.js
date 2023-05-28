import React from "react";
import "./button.css";

const Button = ({ text, onClick, type, className, disabled = false }) => {
  return (
    <button className= {className?className:"Button"} onClick={onClick} type = {type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;