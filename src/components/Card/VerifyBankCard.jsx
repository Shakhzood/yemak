/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import { verifyCard } from "../../Store/Thunk";
import {
  counting,
  showSecondsToMinutes,
} from "../ModalWindows/GetVerificationCode/GetVerificationCode";

import "./VerifyBankCard.scss";
import "../ModalWindows/GetVerificationCode/GetVerificationCode.scss";

const VerifyBankCard = ({ setVerifyOpen, setModalOpen }) => {
  const [code, setCode] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [fullTime, setFullTime] = useState("");
  let tempCode = code.replace(/\D/g, "");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.UserReducer);

  const getBackCardWindow = () => {
    setVerifyOpen(false);
    setModalOpen(true);
  };
  const verifyCardCode = () => {
    dispatch(verifyCard(tempCode));
    setVerifyOpen(false);
  };
  let clear;

  useEffect(() => {
    clear = setInterval(
      () => counting(state.activate_until, clear, getBackCardWindow, dispatch),
      1000
    );
    showSecondsToMinutes(
      setSeconds,
      setMinutes,
      setFullTime,
      state.activate_until,
      minutes,
      seconds
    );
    return () => clearInterval(clear);
  }, [state.activate_until]);

  return (
    <div className="popUp_Overlay_verify">
      <div className="popUp-container" onClick={(e) => e.stopPropagation()}>
        <div className="header-container-verify">
          <h3>Tasdiqlash kodi</h3>
          <div className="popUp_Close-btn">
            <GrClose />
          </div>
        </div>
        <hr />
        <div className="body-container-verify">
          <InputMask
            mask="9 9 9 9 9 9"
            value={code}
            alwaysShowMask={true}
            onChange={(e) => setCode(e.target.value)}
            className="input center"
          />
        </div>
        <div>
          <p className="center">
            {state.phone && state.phone} raqamiga SMS yuborildi. <br />
            Tasdiqlash kodini {fullTime && fullTime}
            vaqt ichida kiriting
          </p>
        </div>
        <div className="btn-container">
          <Button onClick={() => {}} className="btn-very-small">
            Bekor qilish
          </Button>{" "}
          &nbsp; &nbsp; &nbsp;
          <Button
            disabled={tempCode.length >= 6 ? false : true}
            onClick={verifyCardCode}
            className="btn-very-small"
          >
            Tasdiqlash
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyBankCard;
