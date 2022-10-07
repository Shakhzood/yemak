import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainHeader from "../components/MainHeader/MainHeader";
import AddUserPopup from "../components/ModalWindows/AddUserPopup";
import GetVerificationCode from "../components/ModalWindows/GetVerificationCode/GetVerificationCode";
import RestaurantsList from "../components/RestorantsList/RestaurantsList";
import Carousel from "../components/Carousel/Carousel";
import { useGlobalContext } from "../context";
import { useState } from "react";
import SearchResultWindow from "../components/SearchResultWindow/SearchResultWindow";
import OverlayWindow from "../components/ModalWindows/OverlayWindow/OverlayWindow";
import ClearCartWindow from "../components/ModalWindows/ClearCartWindow/ClearCartWindow";

const Home = () => {
  const { categoryName, modalState } = useSelector(
    (state) => state.RestaurantReducer
  );
  const { searchWindow, vendorWindow, addUserWindow, phoneVerificationWindow } =
    modalState;

  return (
    <div>
      {/* <MainHeader /> */}
      <Header />

      {searchWindow && (
        <OverlayWindow closingModalType="searchWindow">
          <SearchResultWindow />
        </OverlayWindow>
      )}

      {/* food window dan keyingi chiqadigan ekran */}
      {vendorWindow && (
        <OverlayWindow closingModalType="clearCartWindow">
          <ClearCartWindow />
        </OverlayWindow>
      )}

      {addUserWindow && (
        <OverlayWindow closingModalType="addUserWindow">
          <AddUserPopup />
        </OverlayWindow>
      )}

      {phoneVerificationWindow && (
        <OverlayWindow closingModalType="phoneVerificationWindow">
          <GetVerificationCode />
        </OverlayWindow>
      )}

      <div className="main">
        <Carousel />
        <hr />

        <h2>{categoryName}</h2>
        <RestaurantsList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
