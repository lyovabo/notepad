import React from "react";

const Header = props => {
  const { label, name, placeholder, value } = props;
  const activeStyle = { color: "#F15B2A" };
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Header;
