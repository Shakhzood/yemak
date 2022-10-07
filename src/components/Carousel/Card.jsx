import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRestaurantCategory } from "../../Store/Thunk";
import "./Card.scss";

const Card = ({ id, title, icon, isActive }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.RestaurantReducer);

  const fetchCategory = (categoryId) => {
    dispatch({
      type: "TOGGLE_RESTAURANT_CATEGORIES",
      payload: id,
    });

    if (categoryId === state.categoryId) {
      let newData = { filteredRestaurants: [], categoryId: null };
      dispatch({ type: "CLEAR_FILTERED_RESTAURANTS", payload: newData });
    } else {
      dispatch(fetchRestaurantCategory(categoryId));
    }
  };

  return (
    <div
      className={`card ${isActive ? "filter-btn-bgc" : ""}`}
      onClick={() => fetchCategory(id)}
    >
      <img className="dessert-image" src={icon} alt="filterItems" />
      <p>{title}</p>
    </div>
  );
};

export default Card;
