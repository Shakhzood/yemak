import React from "react";
import { useDispatch } from "react-redux";
import { closeModalfunc } from "./modalOperations";

const OverlayWindow = ({ children, closingModalType = "" }) => {
  const dispatch = useDispatch();

  const overlayStyle = {
    width: "100%",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    overflow: "scroll",
  };

  return (
    <div
      onClick={() => closeModalfunc(dispatch, closingModalType)}
      style={overlayStyle}
    >
      {children}
    </div>
  );
};

export default OverlayWindow;
