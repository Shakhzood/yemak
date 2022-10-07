import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestaurantCard from "./RestaurantCard";
import { fetchRestaurants } from "../../Store/Thunk";
import Loader from "./Loader";

import "./RestaurantsList.scss";

const RestaurantsList = () => {
  const dispatch = useDispatch();
  const { restaurants, filteredRestaurants, isLoading } = useSelector(
    (state) => state.RestaurantReducer
  );

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

  const fakeCardArr = [null, null, null];
  const loading = fakeCardArr.map((item, idx) => <Loader key={idx} />);

  let content;
  if (isLoading) {
    content = loading;
  } else {
    if (filteredRestaurants.length > 0) {
      content = filteredRestaurants.map((item) => (
        <RestaurantCard key={item.id} {...item} />
      ));
    } else {
      content = restaurants.map((item) => (
        <RestaurantCard key={item.id} {...item} />
      ));
    }
  }

  return <div className="restaurant-list">{content}</div>;
};

export default RestaurantsList;
