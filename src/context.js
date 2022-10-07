import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //MODAL WINDOWS
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const [hasUserName, setHasUserName] = useState(false);

  return (
    <AppContext.Provider
      value={{
        modalIsOpen,
        isVerifyModalOpen,
        isLogoutOpen,
        hasUserName,
        setModalIsOpen,
        setVerifyModalOpen,
        setLogoutOpen,
        setHasUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
