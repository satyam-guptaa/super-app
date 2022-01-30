import React from 'react';

const RegInputs = ({ name, label, type, onChange, value, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        className="inputs"
        onChange={onChange}
      />
      {error && (
        <div className="error-box">
          <span id="error-span">{error}</span>
        </div>
      )}
    </div>
  );
};

export default RegInputs;
