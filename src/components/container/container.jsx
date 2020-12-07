import React from "react";

import Slider from "../slider/slider";
import Checkbox from "../checkbox/checkbox";
import Button from "../button/button";

import "./container.css";

const Container = () => {
  const onChangeSlider = (e) => {
    console.log(e.target.value);
  };

  const onChangeCheckbox = (e) => {
    console.log(e.target.checked);
  };

  return (
    <div className="password-settings">
      <h3>Use the slider, and select from the options</h3>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            &nbsp;
            <Slider
              min={1}
              max={60}
              step={1}
              value={10}
              onChangeValue={onChangeSlider}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="row checkbox-container">
            <Checkbox
              name="uppercase"
              checked={true}
              label="Uppercase"
              value={true}
              onChange={onChangeCheckbox}
              disabled={false}
            />
            <Checkbox
              name="lowercase"
              checked={true}
              label="Lowercase"
              value={true}
              onChange={onChangeCheckbox}
              disabled={false}
            />
            <Checkbox
              name="symbols"
              checked={true}
              label="Symbols"
              value={true}
              onChange={onChangeCheckbox}
              disabled={false}
            />
            <Checkbox
              name="numbers"
              checked={true}
              label="Numbers"
              value={true}
              onChange={onChangeCheckbox}
              disabled={false}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="text-center">
        <div className="row">
          <div className="col-md-12">
            <Button myClassName={"btn btn-password"} label={"Copy password"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
