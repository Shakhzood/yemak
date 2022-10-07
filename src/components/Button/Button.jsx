import React from "react";
import "./Button.scss";

const Button = ({
  disabled = false,
  onClick = () => {},
  className = "",
  children = "",
}) => {
  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
