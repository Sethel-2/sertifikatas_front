import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, children, className }) => {
  return (
    <Link to={to} className={`custom-link ${className}`}>
      {children}
    </Link>
  );
};

export default CustomLink;