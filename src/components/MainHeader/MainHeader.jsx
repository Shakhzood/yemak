import React from "react";
import { Link } from "react-router-dom";
import { GrMap } from "react-icons/gr";

import Button from "../Button/Button";
import User from "../User/User";
import SearchSomething from "../SearchSomething/SearchSomething";

import "./MainHeader.scss";

const MainHeader = () => {
  return (
    <div className="main-header">
      <div className="small-box">
        <Link to={`/`}>
          <img
            src="https://yemak-test.uz/static/media/logo.78cf590f.svg"
            alt="yemal-logo"
          />
        </Link>
        <div></div>

        {/* search window and input */}
        <SearchSomething />

        <div></div>
        <div></div>
        <div className="profile-container">
          <span>
            <Button className="btn btn-warning m-2">
              <GrMap />
            </Button>
          </span>
          <span>
            <User />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
