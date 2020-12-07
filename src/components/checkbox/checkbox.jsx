import React from "react";

import PropTypes from "prop-types";

import "./checkbox.css";

const Checkbox = (props) => {
  const { label, value, checked, name, onChange, disabled } = props;

  return (
    <>
      <div className="col-md-3">
        <label className="container">
          <h1>{label}</h1>
          <input
            type="checkbox"
            className="checkbox-input"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
          />
          <span
            className="checkmark"
            style={{ opacity: disabled ? "0.7" : "" }}
          ></span>
        </label>
      </div>
    </>
  );
};

Checkbox.propTypes = {};

export default Checkbox;
