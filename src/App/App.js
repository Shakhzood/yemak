import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../Pages/Home";

import NotFound from "../Pages/NotFound";
import ProfileRoutes from "../Pages/Account/ProfileRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { useEffect } from "react";
import RetaurantPage from "../Pages/RestaurantPage";
import CartPage from "../Pages/CartPage";

function App() {
  const state = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  // console.log(state);
  useEffect(() => {
    if (state.isGuest) {
      navigate("/");
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/Account/*" element={<ProfileRoutes />} />
        <Route path="/restaurant/:id" element={<RetaurantPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
