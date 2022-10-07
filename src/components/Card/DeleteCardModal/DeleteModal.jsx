import React from "react";
import { GrClose } from "react-icons/gr";

import Button from "../../Button/Button";
import { deleteCard } from "../../../Store/Thunk";
import { useDispatch } from "react-redux";

const DeleteModal = ({ setDeleteCard, cardId }) => {
  const dispatch = useDispatch();

  const deleteCardFn = () => {
    dispatch(deleteCard(cardId));
    setDeleteCard(false);
  };

  return (
    <div className="pop-up-overlay" onClick={() => setDeleteCard(false)}>
      <div className="pop-up-window" onClick={(e) => e.stopPropagation()}>
        <div className="inside-pop-up">
          <div className="header-container-card">
            <h3>Kartani o'chirish</h3>
            <div
              className="popUp_Close-btn"
              onClick={() => setDeleteCard(false)}
            >
              <GrClose />
            </div>
          </div>
          <div className="footer">
            <div></div>
            <div>
              <Button onClick={deleteCardFn} className="btn-double">
                Tasdiqlash
              </Button>
              <Button
                onClick={() => setDeleteCard(false)}
                className="btn-double"
              >
                Yo'q
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
