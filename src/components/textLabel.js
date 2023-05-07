import React from "react";
import styles from "./textLabel.css";

const TextLabel = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className={styles.textLabel}>
      {children}
    </label>
  );
};

export default TextLabel;