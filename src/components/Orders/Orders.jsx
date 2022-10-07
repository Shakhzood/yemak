import React, { useState, useEffect } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrderHistory } from "../../Store/Thunk";

import "./Orders.scss";

const Cards = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.UserReducer);
  // console.log(state.orderHisotry.orders.length);
  useEffect(() => {
    dispatch(fetchOrderHistory());
    return () => {};
  }, []);

  return (
    <div>
      <div className="order-container">
        <div className="order-inside">
          <p>Buyurtmalar tarixi</p> <hr />
          {state.orderHisotry.orders?.length < 1 ? (
            <div className="no-order">
              <AiOutlineHistory size={72} /> <br />
              <span>Hozircha buyurtmalar tarixi boʻsh</span>
            </div>
          ) : (
            state.orderHisotry.orders?.map((item) => {
              return (
                <p>
                  icon {item.number} order time {item.order_time}
                </p>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
