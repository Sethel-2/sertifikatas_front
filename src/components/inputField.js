import React from "react";
import "./inputField.css";

const InputField = ({ id, name}) => {
  return (
    <div className="input-field">
      
      <input type="text" id={id} name={name} />
    </div>
  );
};

export default InputField;