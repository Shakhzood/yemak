import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import InputMask from "react-input-mask";
import { useDispatch } from "react-redux";

import Button from "../Button/Button";
import { fetchUser } from "../../Store/Thunk";
import { openModalfunc, closeModalfunc } from "./OverlayWindow/modalOperations";

import "./AddUserPopup.scss";
import "../../MainStyles/global.scss";
import ModalHeader from "./OverlayWindow/ModalHeader";

function PhoneInput(props) {
  return (
    <InputMask
      mask="\+\9\9\8 (99) 999 \- 99 \- 99"
      value={props.value}
      alwaysShowMask={true}
      onChange={props.onChange}
      className="input"
    ></InputMask>
  );
}

const AddUserPopup = () => {
  const [phone, setPhone] = useState("");

  const handleInput = ({ target: { value } }) => setPhone(value);
  const allNumbers = phone.replace(/\D/g, "");
  const dispatch = useDispatch();

  const closePhoneOpenVerify = () => {
    const phoneNumber = allNumbers.slice(3);
    dispatch(fetchUser(Number(phoneNumber)));

    closeModalfunc(dispatch, "addUserWindow");
    openModalfunc(dispatch, "phoneVerificationWindow");
  };

  return (
    <div className="add_user_modal_window" onClick={(e) => e.stopPropagation()}>
      <ModalHeader
        onCloseModal={() => closeModalfunc(dispatch, "addUserWindow")}
      />
      <PhoneInput value={phone} onChange={handleInput} />
      <Button
        disabled={allNumbers.length === 12 ? false : true}
        onClick={() => closePhoneOpenVerify()}
        className="btn-large"
      >
        Kirish
      </Button>
    </div>
  );
};

export default AddUserPopup;
