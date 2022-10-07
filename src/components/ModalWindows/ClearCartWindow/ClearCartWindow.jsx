import React from "react";
import { GrClose } from "react-icons/gr";
import Button from "../../Button/Button";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../Store/Thunk";

import "./ClearCartWindow.scss";
import { closeModalfunc } from "../OverlayWindow/modalOperations";

const ClearCartWindow = () => {
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(clearCart());
    dispatch({ type: "OPEN_MODAL", payload: "displayFoodWindow" });
    closeModalfunc(dispatch, "vendorWindow");
  };

  return (
    <div className="popUpSize">
      <div className="content">
        <div className="contentHeader">
          <p>Savatni boʻshatish</p>
          <span className="popUp_Close-btn">
            <GrClose />
          </span>
        </div>
        <hr />
        <div>
          <p>Savatchaga faqat bitta restorandan taom qoʻsha olasiz.</p>
          <p>Shu taomni qoʻshish uchun avval savatchani tozalang</p>
          <hr />
          <div className="ifUserNotSignIn">
            <Button onClick={() => confirm()} className="btn-very-small">
              Tasdiqlash
            </Button>
            <Button
              onClick={() =>
                dispatch({ type: "CLOSE_MODAL", payload: "vendorWindow" })
              }
              className="btn-very-small"
            >
              Bekor qilish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearCartWindow;
