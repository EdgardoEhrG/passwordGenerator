import React, { useState, useEffect } from "react";

import Slider from "../slider/slider";
import Checkbox from "../checkbox/checkbox";
import Button from "../button/button";

import { generatePassword, setPasswordLength } from "../../utils/helper";

import "./container.css";

const checkboxes = [
  {
    id: 0,
    name: "uppercase",
    label: "Uppercase",
    isChecked: true,
  },
  {
    id: 1,
    name: "lowercase",
    label: "Lowercase",
    isChecked: true,
  },
  {
    id: 2,
    name: "symbols",
    label: "Symbols",
    isChecked: true,
  },
  {
    id: 3,
    name: "numbers",
    label: "Numbers",
    isChecked: true,
  },
];

const Container = (props) => {
  const { setPassword, setRange, setPasswordProps } = props;

  const [rangeValue, setRangeValue] = useState(12);
  const [checkbox, setCheckbox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });
  const [checked, setChecked] = useState(false);
  const [checkedName, setCheckedName] = useState("");

  const { uppercase, lowercase, symbols, numbers } = checkbox;

  useEffect(() => {
    setPasswordLength(rangeValue);
    setRange(rangeValue);
    setRangeValue(rangeValue);
    passwordGenerated(checkbox, rangeValue);
    checkBoxCount();
  }, [uppercase, lowercase, symbols, numbers]);

  const checkBoxCount = () => {
    const checkedCount = Object.keys(checkbox).filter((key) => checkbox[key]);
    const disabled = checkedCount.length === 1;
    const name = checkedCount[0];
    if (disabled) {
      setChecked(disabled);
      setCheckedName(name);
    } else {
      setChecked(false);
      setCheckedName("");
    }
  };

  const passwordGenerated = (checkbox, rangeValue) => {
    const pwd = generatePassword(checkbox, rangeValue);
    setPassword(pwd);
    setPasswordProps(checkbox);
  };

  const onChangeSlider = (e) => {
    setRangeValue(e.target.value);
    setPasswordLength(e.target.value);
    setRange(e.target.value);
    passwordGenerated(checkbox, e.target.value);
  };

  const onChangeCheckbox = (e) => {
    let { name, checked } = e.target;
    checkboxes.map((checkbox) => {
      if (checkbox.name === name) {
        checkbox.isChecked = checked;
        setCheckbox((prevState) => ({
          ...prevState,
          [name]: checkbox.isChecked,
        }));
        setPasswordLength(rangeValue);
        setRange(rangeValue);
      }
      return "";
    });
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
              value={parseInt(rangeValue, 10)}
              onChangeValue={onChangeSlider}
              defaultLenght={parseInt(rangeValue, 10)}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="row checkbox-container">
            {checkboxes.map((checkbox) => (
              <Checkbox
                key={checkbox.id}
                name={checkbox.name}
                checked={checkbox.isChecked}
                label={checkbox.label}
                value={checkbox.isChecked}
                onChange={onChangeCheckbox}
                disabled={
                  checkbox &&
                  checkbox.isChecked &&
                  checkedName === checkbox.name
                }
              />
            ))}
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
