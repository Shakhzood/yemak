import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  fetchFoodCategory,
  fetchRestaurant,
  fetchTotalCount,
} from "../../Store/Thunk";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import FoodModal from "./FoodModal";
import FoodLoader from "./FoodLoader";
import FoodCategoryLoader from "./FoodCategoryLoader";

import "./index.scss";
import SearchResultWindow from "../../components/SearchResultWindow/SearchResultWindow";
import OverlayWindow from "../../components/ModalWindows/OverlayWindow/OverlayWindow";
import { openModalfunc } from "../../components/ModalWindows/OverlayWindow/modalOperations";
import ClearCartWindow from "../../components/ModalWindows/ClearCartWindow/ClearCartWindow";

const RetaurantPage = () => {
  // const [isFoodOpen, setFoodOpen] = useState(false);
  // const [food, setFood] = useState({});

  const dispatch = useDispatch();
  const {
    restaurant,
    foods,
    isLoading,
    singleRCategoryId,
    items_count,
    modalState,
  } = useSelector((state) => state.RestaurantReducer);
  const { displayFoodWindow, vendorWindow } = modalState;
  const { image, name, description } = restaurant;
  let { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRestaurant(id));
    dispatch(fetchFoodCategory(id));
    dispatch(fetchTotalCount());
  }, []);

  const getFoodInfo = (food) => {
    dispatch({ type: "GET_FOOD_INFO", payload: food });
    openModalfunc(dispatch, "displayFoodWindow");
  };

  const fakeCardArr = [null, null, null, null];
  const loading = fakeCardArr.map((item, idx) => <FoodLoader key={idx} />);
  let content;
  if (isLoading && !foods) {
    content = loading;
  } else {
    content =
      foods.length > 0 &&
      foods[singleRCategoryId].products.map((food) => {
        const { description } = food;
        return (
          <div
            className="card_child"
            key={food.id}
            onClick={() => getFoodInfo(food)}
          >
            <div className="food_image">
              <img src={food.photo} alt="foodPhoto" />
            </div>

            <div className="food_info">
              <div>
                <p className="food_title">{food.name}</p>
                <p className="food_description">{description && description}</p>
              </div>
              <div className="food_info_footer">
                <span>{food.price} so'm</span>
                <span className="shopping_cart">
                  <FiShoppingCart size={27} />
                </span>
              </div>
            </div>
          </div>
        );
      });
  }

  const foodCategoryArr = [null, null, null, null, null, null, null];
  const foodLoading = foodCategoryArr.map((item, idx) => (
    <FoodCategoryLoader key={idx} />
  ));

  return (
    <div className="restaurant-block">
      <MainHeader />

      {/* {isFoodOpen && <FoodModal />} */}
      {displayFoodWindow && (
        <OverlayWindow closingModalType="displayFoodWindow">
          <FoodModal />
        </OverlayWindow>
      )}

      {vendorWindow && (
        <OverlayWindow closingModalType="vendorWindow">
          <ClearCartWindow />
        </OverlayWindow>
      )}

      <div className="body">
        <section className="banner">
          <div className="banner-block">
            <div
              className="img-background"
              style={{ backgroundImage: "url(" + image + ")" }}
            >
              <div className="img-contener">
                <h1>{name}</h1>
                <p>{description && description}</p>
                <hr className="hr" />
                <div className="icon-block">
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 640 512"
                      height="1.3em"
                      width="1.3em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M544 192h-16L419.22 56.02A64.025 64.025 0 0 0 369.24 32H155.33c-26.17 0-49.7 15.93-59.42 40.23L48 194.26C20.44 201.4 0 226.21 0 256v112c0 8.84 7.16 16 16 16h48c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h48c8.84 0 16-7.16 16-16v-80c0-53.02-42.98-96-96-96zM160 432c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48zm72-240H116.93l38.4-96H232v96zm48 0V96h89.24l76.8 96H280zm200 240c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48z"></path>
                    </svg>
                  </span>
                  <span>0.0 km</span>
                </div>
              </div>
            </div>
          </div>
          <nav className="navbar">
            <ul>
              {isLoading
                ? foodLoading
                : foods.map((item, i) => {
                    return (
                      <li
                        onClick={() =>
                          dispatch({ type: "SET_FOOD_CATEGORY_ID", payload: i })
                        }
                        className={singleRCategoryId === i ? "active" : ""}
                        key={item.id}
                      >
                        {item.title}
                      </li>
                    );
                  })}
            </ul>
          </nav>
        </section>
        <div className="food_container_wrapper">
          <div className="food_container">
            {/* Food card content */}
            {content}
          </div>
        </div>
      </div>

      <div className="cart_container" onClick={() => navigate("/cart")}>
        {items_count.totalCount > 0 && (
          <span className="cartButton_count">{items_count.totalCount}</span>
        )}
        <FiShoppingCart size={30} />
      </div>

      <Footer />
    </div>
  );
};

export default RetaurantPage;
