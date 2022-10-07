import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";

import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

import MainHeader from "../../components/MainHeader/MainHeader";
import Cards from "../../components/Card/Cards";
import Orders from "../../components/Orders/Orders";
import Profile from "./Profile";
import "./ProfileRoutes.scss";
import NotFound from "../NotFound";

const locationBtns = [
  {
    title: "ma'lumotlar",
    navigation: "/Account/profile",
    id: 1,
    isActive: false,
  },
  { title: "kartalar", navigation: "/Account/cards", id: 2, isActive: false },
  {
    title: "buyurtmalar",
    navigation: "/Account/orders",
    id: 3,
    isActive: false,
  },
];

const ProfileRoutes = () => {
  const navigate = useNavigate();
  const [arr, setArr] = useState(locationBtns);

  const jumpProfilePages = (item) => {
    navigate(item.navigation);
  };

  return (
    <div>
      <MainHeader />

      <div className="btn-container">
        <div className="btn-box">
          {arr.map((item) => (
            <Button
              key={item.id}
              className={`btn-very-small ${item.isActive && `active_btn`}`}
              onClick={() => jumpProfilePages(item)}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      <Routes>
        <Route index path="/profile" element={<Profile />} />
        <Route path="cards" element={<Cards />} />
        <Route path="orders" element={<Orders />} />
        <Route index path="*" element={<NotFound />} />
      </Routes>
      <Outlet value={"Shakhzod"} />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileRoutes;
