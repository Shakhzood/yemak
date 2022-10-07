import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./RestaurantCard.scss";
import { FaCarSide } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { fetchRestaurant } from "../../Store/Thunk";

const RestaurantCard = (props) => {
  const { id, name, image, category } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchSingleRestaurant = (id) => {
    dispatch(fetchRestaurant(id));
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="single-restorant" onClick={() => fetchSingleRestaurant(id)}>
      <div className="caption">
        <img className="restorant-img" src={image} alt="eachRestorant" />
      </div>
      <div className="restorant-list-footer">
        <div className="restorant-list-title">
          <p className="title">{name}</p>
        </div>
        <div className="restorant-list-icons">
          <div className="staurantList_delivery">
            <span>
              <FaCarSide size={16} /> &nbsp; &nbsp; &nbsp;
            </span>{" "}
            <span>26.4 km</span>
          </div>
          <div className="price">
            <span>
              <BiDollarCircle size={16} /> &nbsp;
            </span>
            <span>38000 so'm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
