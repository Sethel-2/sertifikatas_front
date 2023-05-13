import React from "react";
import "./button.css";

const Button = ({ text, onClick, type, className }) => {
  return (
    <button className= {className?className:"Button"} onClick={onClick} type = {type}>
      {text}
    </button>
  );
};

export default Button;