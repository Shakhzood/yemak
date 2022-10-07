import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";

import { useGlobalContext } from "../../../context";
import Button from "../../Button/Button";
import { loggingout } from "../../../Store/Thunk";

import "./Logout.scss";

const Logout = () => {
  const { setLogoutOpen } = useGlobalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    setLogoutOpen(false);
    dispatch(loggingout());
    navigate("/");
  };

  return (
    <div className={`popUp_Overlay_logout`}>
      <div className={`small-container_logout`}>
        <div className="container_logout">
          <div className="header-container_logout">
            <h3>Akkauntdan chiqish</h3>
            <div
              className="popUp_Close_logout btn rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => setLogoutOpen(false)}
            >
              <GrClose />
            </div>
          </div>
          <hr />
          <div>
            <Button onClick={logout} className="btn btn-danger btn-double">
              chiqish
            </Button>
            <Button onClick={() => setLogoutOpen(false)} className="btn-double">
              yo'q
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
