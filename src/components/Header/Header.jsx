import React, { useState } from "react";
import { GrMap } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import User from "../User/User";
import { openModalfunc } from "../ModalWindows/OverlayWindow/modalOperations";

import "./Header.scss";
import Button from "../Button/Button";
import SearchSomething from "../SearchSomething/SearchSomething";

const Header = () => {
  const { isGuest } = useSelector((state) => state.UserReducer);
  // const { modalState } = useSelector((state) => state.RestaurantReducer);
  const dispatch = useDispatch();

  function Guest() {
    return (
      <button
        onClick={() => openModalfunc(dispatch, "addUserWindow")}
        type="button"
        className="btn btn-warning"
      >
        Kirish
      </button>
    );
  }

  return (
    <div className="header">
      <div className="header_left_side">
        <div className="center">
          <h1>yemak</h1>
          <p>Mazali taomlar yetkazib berish</p>
          <div className="input-group mb-6 search_result_content">
            <SearchSomething />
          </div>
        </div>
      </div>

      <div className="header_right_side">
        <div className="left_position">
          <Button className="btn btn-warning m-2">
            <GrMap />
          </Button>
          {isGuest ? <Guest /> : <User />}
        </div>
      </div>
    </div>
  );
};

export default Header;
