import React, { useState } from "react";

import Container from "../container/container";
import Button from "../button/button";

import { generatePassword } from "../../utils/helper";

import "./display.css";

const Display = () => {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();

  let pwdDescription = "";

  const generateNewPassword = () => {
    const pwd = generatePassword(passwordProps, range);
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

  return (
    <>
      <div className="row">
        <div
          className="col-12 password-display-container"
          style={{ backgroundColor: setBackgroundColor(password) }}
        >
          <div style={{ width: "100%" }}>
            <div className="password-display">
              <input
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
            <Button myClassName={"copy-btn"} iconClass={"far fa-copy"} />
            <Button
              myClassName={"generate-btn"}
              iconClass={"fas fa-sync-alt"}
              handleClick={generateNewPassword}
            />
          </div>
        </div>
      </div>
      <Container
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
      />
    </>
  );
};

export default Display;
