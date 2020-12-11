import React, { useState, useRef } from "react";

import PropTypes from "prop-types";

import "./slider.scss";

const Slider = (props) => {
  const { step, max, min, value, onChangeValue, defaultLenght } = props;

  const rangeRef = useRef();

  let [range, setRange] = useState();

  const activeRangeColor = "#4aa1f3";
  const rangeBackground = "#d7dcdf";

  const handleChange = (max) => (e) => {
    onChangeValue(e);
    const value = e.target.value;
    setRange(value);
    const progress = (progressValue / max) * 100 + "%";
    const newBackgroundStyle = `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`;
    rangeRef.current.style.background = newBackgroundStyle;
  };

  if (range !== defaultLenght || !range) {
    range = defaultLenght;
  }

  const progressValue = defaultLenght;
  const progress = (progressValue / max) * 100 + "%";
  const styleInput = {
    background: `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`,
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <input
          ref={rangeRef}
          type="range"
          className="range-slider"
          step={step}
          max={max}
          min={min}
          value={value}
          onChange={handleChange(max)}
          defaultLenght={10}
          style={styleInput}
        />
        <span className="range-slider-value">{progressValue}</span>
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
