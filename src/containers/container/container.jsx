import React, { useState, useEffect, useMemo } from "react";

import Slider from "../../components/slider/slider";
import Checkbox from "../../components/checkbox/checkbox";
import Button from "../../components/button/button";
import Tooltip from "../../components/tooltip/tooltip";

import {
  generatePassword,
  setPasswordLength,
  copyToClipBoard,
} from "../../utils/helper";

import "./container.scss";

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
  const { setPassword, setRange, setPasswordProps, passwordRef, type } = props;

  const [rangeValue, setRangeValue] = useState(12);
  const [checkbox, setCheckbox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });
  const [checked, setChecked] = useState(false);
  const [checkedName, setCheckedName] = useState("");
  const [tooltip, setTooltip] = useState(false);
  const [minMaxValue, setMinMaxValue] = useState({
    min: 1,
    max: 60,
  });

  const { uppercase, lowercase, symbols, numbers } = checkbox;
  const { min, max } = minMaxValue;

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
    const pwd =
      rangeValue > 3
        ? generatePassword(checkbox, rangeValue)
        : generatePassword(checkbox, 3);
    setPassword(pwd);
    setPasswordProps(checkbox);
  };

  const updateCheckboxes = () => {
    if (type === "pin") {
      checkboxes.map((checkbox) => {
        const name = checkbox.name;
        if (name !== "numbers") {
          checkbox.isChecked = false;
          const checkboxProps = {
            name,
            checkedName: name,
            checked: true,
            isChecked: checkbox.isChecked,
            min: 0,
            max: 15,
            length: 3,
          };
          checkboxProperties(checkboxProps);
        }
        return "";
      });
    } else {
      checkboxes.map((checkbox) => {
        const name = checkbox.name;
        checkbox.isChecked = true;
        const checkboxProps = {
          name,
          checkedName: name,
          checked: true,
          isChecked: checkbox.isChecked,
          min: 1,
          max: 60,
          length: 12,
        };
        checkboxProperties(checkboxProps);
        return "";
      });
    }
  };

  const checkboxProperties = (checkboxProps) => {
    const {
      name,
      checked,
      isChecked,
      checkedName,
      min,
      max,
      length,
    } = checkboxProps;
    setCheckbox((prevState) => ({
      ...prevState,
      [name]: isChecked,
    }));
    setChecked(checked);
    setCheckedName(checkedName);
    setPasswordLength(length);
    setMinMaxValue({ min, max });
    setRange(length);
    setRangeValue(length);
  };

  const onChangeSlider = (e) => {
    setRangeValue(e.target.value);
    setPasswordLength(e.target.value);
    setRange(e.target.value);
    passwordGenerated(checkbox, e.target.value);
  };

  const onChangeCheckbox = (e) => {
    if (type !== "pin") {
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
    } else {
    }
  };

  const copyClipBoard = (elementRef) => (e) => {
    e.preventDefault();
    copyToClipBoard(elementRef);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 1000);
  };

  useMemo(updateCheckboxes, [type]);

  return (
    <div className="password-settings">
      <h3>Use the slider, and select from the options</h3>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            &nbsp;
            <Slider
              min={parseInt(min, 10)}
              max={parseInt(max, 10)}
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
            <Button
              myClassName={"btn btn-password"}
              label={"Copy password"}
              handleClick={copyClipBoard(passwordRef.current)}
            />
            <Tooltip
              message="Copied"
              position="bottom"
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
