import React from "react";

import PropTypes from "prop-types";

import "./slider.css";

const Slider = (props) => {
  const { step, max, min, value, onChangeValue, defaultLenght } = props;

  const handleChange = (max) => (e) => {
    onChangeValue(e);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <input
          type="range"
          className="range-slider"
          step={step}
          max={max}
          min={min}
          value={value}
          onChange={handleChange(max)}
          defaultLenght={10}
        />
        <span className="range-slider-value">10</span>
      </div>
    </div>
  );
};

Slider.propTypes = {
  step: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  defaultLenght: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default Slider;
