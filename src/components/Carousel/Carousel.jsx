import React, { useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../Store/Thunk";

import Card from "./Card";
import Loader from "./ContentLoader";
import "./Carousel.scss";

const Carousel = () => {
  const dispatch = useDispatch();
  const { restaurantCategories } = useSelector(
    (state) => state.RestaurantReducer
  );

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const fakeLoaderArr = [null, null, null, null, null, null];

  return (
    <div className="filter-container">
      <button className="prev-btn" onClick={() => {}}>
        <FaChevronLeft />
      </button>
      <>
        {restaurantCategories.length < 1
          ? fakeLoaderArr.map((item, idx) => <Loader key={idx} />)
          : restaurantCategories.map((item) => {
              return <Card key={item.id} {...item} />;
            })}
      </>
      <button className="next-btn">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
