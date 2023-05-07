import React from 'react';
import "./linkButton.css"

function LinkButton({ href, target, className, style, children }) {
  return (
    <a 
      href={href} 
      target={target} 
      className={`button-link ${className}`}
      style={style}
    >
      {children}
    </a>
  );
}

export default LinkButton;