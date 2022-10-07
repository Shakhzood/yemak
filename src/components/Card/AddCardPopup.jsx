import React, { useState } from "react";
import InputMask from "react-input-mask";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import { addCard } from "../../Store/Thunk";

import "./AddCardPopup.scss";

const AddCardPopup = ({ setModalOpen, setVerifyOpen }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.UserReducer);

  let tempCardNumber = cardNumber.replace(/\D/g, "");
  let tempDateNumber = date.replace(/\D/g, "");

  const boolCardNumber = tempCardNumber.length !== 16;
  const boolDateNumber = tempDateNumber.length !== 4;

  const addNewCard = () => {
    const newObj = {
      card_number: tempCardNumber,
      exp_date: tempDateNumber,
      name: null,
    };
    dispatch(addCard(newObj));
    setModalOpen(false);
    setVerifyOpen(true);
  };

  return (
    <div className="pop-up-overlay" onClick={() => setModalOpen(false)}>
      <div className="pop-up-window" onClick={(e) => e.stopPropagation()}>
        <div className="inside-pop-up">
          <div className="header-container-card">
            <h3>Yangi karta qoʻshish</h3>
            <div
              className="popUp_Close-btn"
              onClick={() => setModalOpen(false)}
            >
              <GrClose />
            </div>
          </div>
          <div className="two-input-masks">
            <InputMask
              mask="9999 9999 9999 9999"
              value={cardNumber}
              alwaysShowMask={false}
              onChange={(e) => setCardNumber(e.target.value)}
              className="input x-medium-input"
              placeholder="Karta raqami"
            />

            <InputMask
              mask="99\/99"
              value={date}
              alwaysShowMask={false}
              onChange={(e) => setDate(e.target.value)}
              className="input input-xx-small"
              placeholder="Oy/Yil"
            />
          </div>
          <div className="footer">
            <div>
              <p>powered by</p>
              <img
                width={70}
                src="https://yemak-test.uz/static/media/payme_01.d430edbb.svg"
                alt="payme"
              />
            </div>
            <div>
              <Button
                disabled={!boolDateNumber && !boolCardNumber ? false : true}
                onClick={addNewCard}
                className="card-btn"
              >
                davom etish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardPopup;
