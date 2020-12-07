import React from "react";

import Container from "../container/container";
import Button from "../button/button";

import "./display.css";

const Display = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 password-display-container">
          <div>
            <div className="password-display">
              <input
                type="text"
                className="password-display-input"
                value="123qwe"
                readOnly
              />
            </div>
            <div className="password-description">
              <i className="fas fa-check-circle"></i> Strong Password
            </div>
          </div>
          <div className="password-display-icons">
            <Button myClassName={"copy-btn"} iconClass={"far fa-copy"} />
            <Button
              myClassName={"generate-btn"}
              iconClass={"fas fa-sync-alt"}
            />
          </div>
        </div>
      </div>
      <Container />
    </>
  );
};

export default Display;
