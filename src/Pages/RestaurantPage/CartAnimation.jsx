import React from "react";

import "./CartAnimation.scss";

const CartAnimation = () => {
  return (
    <>
      <div id="cart" class="cart" data-totalitems="0">
        <i class="fas fa-shopping-cart"></i>
      </div>

      <div class="page-wrapper">
        <button id="addtocart">
          Add to Cart
          <span class="cart-item"></span>
        </button>
      </div>
    </>
  );
};

export default CartAnimation;
