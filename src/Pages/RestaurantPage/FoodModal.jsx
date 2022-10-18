import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../Store/Thunk";
import { closeModalfunc } from "../../components/ModalWindows/OverlayWindow/modalOperations";

import "./FoodModal.scss";

const Page = () => {
  // weight
  const [selectedOption, setSelectedOption] = useState("0,5");
  const [kg, setKg] = useState({ id: 0, name: "0,5", price: 0 });

  // extra item to palov
  const [selectedExtraItem, setSelectedExtraItem] = useState("Ничего");
  const [extraProductItem, setExtraProductItem] = useState({
    id: 0,
    name: "Ничего",
    price: 0,
  });

  const [dish, setDish] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [foodIdx, setFoodIdx] = useState(0);
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

  const inc = (food) => {
    const { price: foodPrice = 0 } = food;

    let totalPrice = kg.hasOwnProperty("price")
      ? foodPrice + kg.price + extraProductItem
      : foodPrice;

    setTotalPrice(totalPrice);

    console.log("INCREMENT", food);

    dispatch({
      type: "INCREMENT",
      payload: totalPrice, // extraProductItem.price + tarelka.price
    });
  };

  const dec = (food) => {
    const { price: foodPrice = 0 } = food;

    // let totalPrice = kg.hasOwnProperty("price")
    //   ? foodPrice - kg.price
    //   : foodPrice;

    dispatch({
      type: "DECREMENT",
      payload: totalPrice - (foodPrice + kg.price),
    });
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

  const onValueChange = (event, item, categoryId = 0) => {
    // dispatch({
    //   type: "UPDATE_OPTIONS_PRICE",
    //   payload: originalPrice + kg.price, // extraProductItem.price + tarelka.price
    // });
    // console.log("item.price", item);

    switch (categoryId) {
      case 0: // weight
        setSelectedOption(event.target.value);
        setKg(item);
        // console.log(item);
        break;
      case 1: // extra item
        setSelectedExtraItem(event.target.value);
        setExtraProductItem(item);
        // console.log(extraProductItem);
        break;
      //case 2: // idish
      // setDish(item.price);
      //break;
      default:
      // setItem(item.price);
    }
    setTotalPrice(originalPrice + kg.price + extraProductItem.price);
    // console.log("item", item, categoryId);
  };

  const DisplayWeight = ({
    options,
    selectedOptionItem,
    onValueChange,
    categoryId = 0,
    name,
  }) => {
    console.log(selectedOptionItem);
    return (
      <div className="countingPopup">
        <p>{options.name}</p>
        {options.rows.map((item, idx) => {
          // console.log(item);

          return (
            <div key={item.id} className="chack_box">
              <label>
                {/* <span
                  onClick={() => setOptionIdx(idx)}
                  className={`checkMark  ${
                    idx === optionIdx ? "toggle_check" : ""
                  }`}
                ></span> */}
                {item.name}
                <input
                  className="optionInput"
                  type="radio"
                  value={item.name}
                  checked={item.name === selectedOptionItem}
                  onChange={(e) => onValueChange(e, item, categoryId)}
                  name={name}
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
          <DisplayWeight
            options={options[0]}
            selectedOptionItem={selectedOption}
            onValueChange={onValueChange}
            categoryId={0}
            name={`weight`}
          />
        )}

        {options !== null && options.length > 1 && (
          <DisplayWeight
            options={options[1]}
            selectedOptionItem={selectedExtraItem}
            onValueChange={onValueChange}
            categoryId={1}
            name={`extraItem`}
          />
        )}

        {/* {options !== null && options.length > 2 && (
          <DisplayWeight
            options={options[2]}
            // optionIdx={extraItemIdx}
            // setOptionIdx={setExtraItemIdx}
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
            <button onClick={() => inc(foodInfo)} className="toggli">
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
          <span>{totalPrice} so'm</span>
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
