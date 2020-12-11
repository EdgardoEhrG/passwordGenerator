import React, { useState, useRef } from "react";

import Container from "../container/container";
import Button from "../../components/button/button";
import Tooltip from "../../components/tooltip/tooltip";

import { generatePassword, copyToClipBoard } from "../../utils/helper";

import "./display.scss";

const Display = () => {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  const [tooltip, setTooltip] = useState(false);
  const [type, setType] = useState("password");

  const passwordRef = useRef(null);

  let pwdDescription = "";

  const selectTagStyle = {
    backgroundColor: "inherit",
    color: "#506175",
    width: "20%",
    heigth: "auto",
    marginLeft: "-4px",
  };

  const generateNewPassword = () => {
    const pwd =
      range > 3
        ? generatePassword(passwordProps, range)
        : generatePassword(passwordProps, 3);
    setPassword(pwd);
  };

  const setBackgroundColor = (password) => {
    if (password && password.length === 1 && password.length <= 5) {
      pwdDescription = "Bad password";
      return "#cb473e";
    } else if (password && password.length >= 6 && password.length <= 10) {
      pwdDescription = "Weak password";
      return "#f07d58";
    } else if (password && password.length > 10) {
      pwdDescription = "Strong password";
      return "#55a95d";
    } else {
      pwdDescription = "Bad password";
      return "#cb473e";
    }
  };

  const copyClipBoard = (e) => {
    e.preventDefault();
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 1000);
  };

  const onSelectTag = (e) => {
    setType(e.target.value);
  };

  return (
    <>
      <div>
        <select
          className="form-control form-control-sm"
          name="type"
          value={type}
          onChange={onSelectTag}
          style={selectTagStyle}
        >
          <option value="password">Password</option>
          <option value="pin">PIN</option>
        </select>
      </div>
      <div className="row">
        <div
          className="col-12 password-display-container"
          style={{ backgroundColor: setBackgroundColor(password) }}
        >
          <div style={{ width: "100%" }}>
            <div className="password-display">
              <input
                ref={passwordRef}
                type="text"
                className="password-display-input"
                value={password}
                readOnly
              />
            </div>
            <div className="password-description">
              {password && password.length > 10 ? (
                <>
                  <i className="fas fa-check-circle"></i> {pwdDescription}
                </>
              ) : (
                <>
                  <i className="fas fa-exclamation-circle"></i> {pwdDescription}
                </>
              )}
            </div>
          </div>
          <div className="password-display-icons">
            <Button
              myClassName={"copy-btn"}
              iconClass={"far fa-copy"}
              handleClick={(e) => copyClipBoard(e)}
            />
            <Button
              myClassName={"generate-btn"}
              iconClass={"fas fa-sync-alt"}
              handleClick={generateNewPassword}
            />
            <Tooltip
              message="Copied"
              position="left"
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>
      <Container
        type={type}
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
        passwordRef={passwordRef}
      />
    </>
  );
};

export default Display;
