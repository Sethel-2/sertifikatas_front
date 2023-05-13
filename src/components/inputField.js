import React from "react";
import "./inputField.css";

const InputField = ({ id, name, value, onChange, type}) => {
  return (
    <div className="input-field">
      
      <input type = {type?type:"text"} value = {value} onChange = {onChange} id={id} name={name} />
    </div>
  );
};

export default InputField;