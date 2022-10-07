import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../Button/Button";
import { verifyUserCode, reSendSms } from "../../../Store/Thunk";
import { countDown } from "../../../Store/Actions/ActionCreater";
import "./GetVerificationCode.scss";
import {
  openModalfunc,
  closeModalfunc,
} from "../OverlayWindow/modalOperations";

function GetVerified(props) {
  return (
    <InputMask
      mask="9 9 9 9"
      value={props.value}
      alwaysShowMask={false}
      onChange={props.onChange}
      className="input"
      placeholder="SMS dagi kodni kiriting"
    ></InputMask>
  );
}
//Countdown timer
export let clear;
export const counting = (counter, clear, fn, dispatch) => {
  if (counter <= 0) {
    clearInterval(clear);
    fn();
  } else {
    dispatch(countDown(counter));
  }
};

export const showSecondsToMinutes = (
  setSeconds,
  setMinutes,
  setFullTime,
  counter,
  minutes,
  seconds
) => {
  setMinutes(Math.floor(counter / 60));
  setSeconds(
    Math.floor(counter % 60) < 10
      ? `0${Math.floor(counter % 60)}`
      : Math.floor(counter % 60)
  );
  setFullTime(`0${minutes + ":" + seconds}`);
};

const GetVerificationCode = () => {
  const [verifyCode, setVerifyCode] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [fullTime, setFullTime] = useState("");
  const [isReturnedMsg, setReturnedMsg] = useState(false);
  const dispatch = useDispatch();
  const counter = useSelector(
    (state) => state.UserReducer.activation_code_active_until
  );

  const handleInput = ({ target: { value } }) => setVerifyCode(value);
  const allNumbers = verifyCode.replace(/\D/g, "");

  const verifyUser = (allNumbers) => {
    dispatch(verifyUserCode(Number(allNumbers)));
    closeModalfunc(dispatch, "phoneVerificationWindow");
  };

  const getBackPhoneWindow = () => {
    closeModalfunc(dispatch, "phoneVerificationWindow");
    openModalfunc(dispatch, "addUserWindow");
  };
  const returnedMsgPopup = isReturnedMsg && (
    <div className="alert alert-success alert-info-width" role="alert">
      Tasdiqlash kodi qayta jo'natildi
    </div>
  );
  const reSendCode = () => {
    setReturnedMsg(true);
    dispatch(reSendSms());
  };

  useEffect(() => {
    clear = setInterval(
      () => counting(counter, clear, getBackPhoneWindow, dispatch),
      1000
    );
    showSecondsToMinutes(
      setSeconds,
      setMinutes,
      setFullTime,
      counter,
      minutes,
      seconds
    );
    return () => clearInterval(clear);
  }, [counter]);

  return (
    <div className={"popUp_Overlay_verify"}>
      <div className={`popUp-container`}>
        <div className="header-container-verify">
          <h3>Kirish</h3>
          <div
            className="popUp_Close-btn"
            onClick={() => closeModalfunc(dispatch, "phoneVerificationWindow")}
          >
            <GrClose />
          </div>
        </div>
        <div className="body-container-verify">
          <GetVerified value={verifyCode} onChange={handleInput} />
          <div className="alert alert-info" role="alert">
            SMS yuborildi, Tasdiqlash kodini {fullTime} min ichida kiriting
          </div>
          {returnedMsgPopup}
          <div className="verify-btn-container">
            <Button onClick={reSendCode} className="xx-small">
              kodni qayta yuborish
            </Button>
            <Button
              disabled={allNumbers.length === 4 ? false : true}
              onClick={() => verifyUser(allNumbers)}
              className="btn-large"
            >
              Tasdiqlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetVerificationCode;
