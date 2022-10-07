import React from "react";
import { GrClose } from "react-icons/gr";

import "./ModalHeader.scss";

const ModalHeader = ({ onCloseModal }) => {
  return (
    <div className="modal-header-verify">
      <h3>Kirish</h3>

      <div className="popUp_Close-btn" onClick={() => onCloseModal(false)}>
        <GrClose />
      </div>
    </div>
  );
};

export default ModalHeader;
