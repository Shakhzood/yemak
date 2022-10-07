import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../Store/Thunk";
import { closeModalfunc } from "../../components/ModalWindows/OverlayWindow/modalOperations";

import "./FoodModal.scss";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [kgSelectedOption, setKgSelectedOption] = useState({
    selectedOption: "",
  });
  const [extraSelectedOption, setExtraSelectedOption] = useState({
    selectedOption: "",
  });
  const [dishSelectionOption, setDishSelectedOption] = useState({
    selectedOption: "",
  });
  const [item, setItem] = useState({});

  const [kg, setKg] = useState({ price: 0 });
  const [extraProducts, setExtraProducts] = useState({ price: 0 });
  const [dish, setDish] = useState({ price: 0 });
  const [totalPrice, setTotalPrice] = useState(0);

  const [foodIdx, setFoodIdx] = useState(0);
  const [extraIdx, setExtraIdx] = useState(0);
  const [extraItemIdx, setExtraItemIdx] = useState(0);
  const { foodInfo, items_count } = useSelector(
    (state) => state.RestaurantReducer
  );

  const { count, price: optionPrice } = items_count;
  const {
    name = "defaultName",
    price: originalPrice,
    photo,
    image,
    options = [],
    description = "ssss",
  } = foodInfo;
  const dispatch = useDispatch();

  const inc = (food, item) => {
    const { price: foodPrice = 0 } = food;
    const { kgPrice = 0 } = kg;
    const { extraProductPrice = 0 } = extraProducts;
    const { dishPrice = 0 } = dish;

    console.log(1, foodPrice + kgPrice + extraProductPrice + dishPrice);

    dispatch({
      type: "INCREMENT",
      payload: foodPrice + kgPrice + extraProductPrice + dishPrice,
    });
  };

  const dec = (food) => {
    const { price: foodPrice = 0 } = food;
    const { price: itemPrice = 0 } = item;

    dispatch({ type: "DECREMENT", payload: foodPrice + itemPrice });
  };

  const addItemToCartFun = (food) => {
    const { id } = food;
    const newProduct = {
      product_id: id,
      amount: count,
      options: [],
    };
    dispatch(addItemToCart(newProduct));
  };

  const onValueChange = (event, item, setSelectedOption, categoryId = 0) => {
    setSelectedOption({
      selectedOption: event.target.value,
    });

    switch (categoryId) {
      case 0:
        setKg(item);
        break;
      case 1:
        setExtraProducts(item);
        break;
      case 2:
        setDish(item);
        break;
      default:
        setItem(item);
    }
    setTotalPrice(originalPrice + kg.price + extraProducts.price + dish.price);
    console.log(kg.price + extraProducts.price + dish.price);
    // console.log("totalPrice", totalPrice);
    dispatch({
      type: "UPDATE_OPTIONS_PRICE",
      payload: totalPrice,
    });
  };

  const DisplayOptions = ({
    options,
    optionIdx,
    setOptionIdx,
    selectedOption,
    onValueChange,
    categoryId = 0,
  }) => {
    return (
      <div className="countingPopup">
        <p>{options.name}</p>
        {/* //options[0].rows */}
        {options.rows.map((item, idx) => {
          return (
            <div key={item.id} className="chack_box">
              <label>
                <span
                  onClick={() => setOptionIdx(idx)}
                  className={`checkMark  ${
                    idx === optionIdx ? "toggle_check" : ""
                  }`}
                ></span>
                {item.name}
                <input
                  onClick={() => setOptionIdx(idx)}
                  className="optionInput"
                  type="radio"
                  value={item.name}
                  checked={item.name === selectedOption}
                  onChange={(e) =>
                    onValueChange(e, item, setSelectedOption, categoryId)
                  }
                  name="product"
                />
                <hr />
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="modal_child" onClick={(e) => e.stopPropagation()}>
      <div
        className="close_logo"
        onClick={() => closeModalfunc(dispatch, "displayFoodWindow")}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
        </svg>
      </div>
      <div className="img_page">
        <img src={photo ? photo : image} alt="foodPhoto" />
      </div>
      <div className="counting_box">
        <div className="title_box">
          <p className="food_name">{name}</p>
          <p className="food_description">{description}</p>
        </div>

        {options !== null && (
          <DisplayOptions
            options={options[0]}
            optionIdx={foodIdx}
            setOptionIdx={setFoodIdx}
            selectedOption={selectedOption.selectedOption}
            onValueChange={onValueChange}
            categoryId={0}
          />
        )}

        {/* {options !== null && options.length > 1 && (
          <DisplayOptions
            options={options[1]}
            optionIdx={extraIdx}
            setOptionIdx={setExtraIdx}
            selectedOption={selectedOption.selectedOption}
            onValueChange={onValueChange}
            categoryId={1}
          />
        )} */}

        {/* {options !== null && options.length > 2 && (
          <DisplayOptions
            options={options[2]}
            optionIdx={extraItemIdx}
            setOptionIdx={setExtraItemIdx}
            selectedOption={selectedOption.selectedOption}
            onValueChange={onValueChange}
            categoryId={2}
          />
        )} */}

        <div className="counting">
          <div className="button_box">
            <button
              disabled={count < 1}
              onClick={() => dec(foodInfo)}
              className=""
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </button>
            <button onClick={() => inc(foodInfo, item)} className="toggli">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                t="1551322312294"
                viewBox="0 0 1024 1024"
                version="1.1"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs></defs>
                <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
              </svg>
            </button>
            <span className="title_pirce">soni {count}</span>
          </div>
          <span>{optionPrice} so'm</span>
        </div>
        <button
          disabled={count < 1}
          className={`${count > 0 ? "active" : "btn"}`}
          onClick={() => addItemToCartFun(foodInfo)}
        >
          Savatga qo'shish
        </button>
      </div>
    </div>
  );
};

export default Page;
