import React from "react";

import "./Input.scss";

const Input = ({
  maxLength = "20",
  type = "text",
  className = "",
  placeHolder = "",
  value = "",
  onChange = () => {},
  inputLabel = "",
}) => {
  return (
    <div className="input-label">
      {inputLabel && (
        <>
          <label className="child">{inputLabel}</label> <br />
        </>
      )}
      <input
        maxLength={maxLength}
        type={type}
        className={className}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
