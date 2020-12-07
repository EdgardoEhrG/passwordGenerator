import React from "react";

import PropTypes from "prop-types";

const Button = (props) => {
  const { label, myClassName, iconClass, handleClick } = props;

  return (
    <>
      <button className={myClassName} label={label} onClick={handleClick}>
        <i className={iconClass}></i> {label}
      </button>
    </>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  myClassName: PropTypes.string,
  iconClass: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
