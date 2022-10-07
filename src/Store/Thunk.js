import { closeModalfunc } from "../components/ModalWindows/OverlayWindow/modalOperations";
import { mainUrl } from "../Services/Api";
import { fetchRestaurantsAction } from "./Actions/ActionCreater";
import { FETCH_RESTAURANTS } from "./Actions/ActionTypes";

// USER authentication
export const fetchUser = (userPhoneNumber) => async (dispatch) => {
  let auth = "/user/auth?phone_number=";
  const response = await fetch(`${mainUrl}${auth}${userPhoneNumber}`);
  const userData = await response.json();
  dispatch({ type: "GET_ACCESS_TOKEN", payload: userData.data });
};

export const verifyUserCode = (code) => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const authVerify = "/user/auth/verify?code=";
  const response = await fetch(`${mainUrl}${authVerify}${code}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization",
      Authorization: activeUser.access_token,
    },
  });
  const userData = await response.json();
  dispatch({ type: "SAVE_USER_INFO", payload: userData.data });
};

export const loggingout = () => async (dispatch) => {
  const userAccountLogout = "/user/account/logout";
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  try {
    const response = await fetch(`${mainUrl}${userAccountLogout}`, {
      method: "GET",
      headers: {
        Authorization: activeUser.access_token,
      },
    });
    const data = await response.json();
    dispatch({ type: "CLEAR", payload: data });
  } catch (error) {
    console.log("ERROR LOG OUT", error);
  }
};

export const reSendSms = () => async () => {
  let reSendSmsUrl = "/user/auth/resend-sms";
  let url = `${mainUrl}${reSendSmsUrl}`;
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: activeUser.access_token,
      },
    });
    const data = await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const updateUserInfo = (obj) => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  let accountSave = "/user/account/save";

  try {
    const response = await fetch(`${mainUrl}${accountSave}`, {
      method: "POST",
      headers: {
        Authorization: activeUser.access_token,
      },
      body: JSON.stringify(obj),
    });
    const userData = await response.json();
    // console.log(userData.data);
    dispatch({ type: "UPDATE_USER_INFO", payload: userData.data });
  } catch (e) {
    console.log("ERROR UPDATE USER INFO", e);
  }
};

export const addCard = (cardInfoObj) => async (dispatch) => {
  const addCard = "/user/cards/add";
  let url = `${mainUrl}${addCard}`;
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: activeUser.access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardInfoObj),
    });
    const resData = await response.json();
    dispatch({ type: "ADD_BANK_CARD", payload: resData.data });
  } catch (e) {
    console.log("ERROR ADD_BANK_CARD", e);
  }
};

export const verifyCard = (code) => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const verifyCard = `/user/cards/verify?id=${activeUser.id}&code=${code}`;
  let url = `${mainUrl}${verifyCard}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: activeUser.access_token,
      },
    });
    const resData = await response.json();
    dispatch(fetchUserCards());
  } catch (e) {
    console.log("ERROR VERIFY_BANK_CARD", e);
  }
};
export const fetchUserCards = () => async (dispatch) => {
  const userAccountCards = "/user/cards";
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  try {
    const response = await fetch(`${mainUrl}${userAccountCards}`, {
      method: "GET",
      headers: {
        Authorization: activeUser.access_token,
      },
    });
    const { data } = await response.json();
    dispatch({ type: "STORE_BANK_CARD", payload: data.cards });
  } catch (error) {
    console.log("ERROR FETCH USER CARDS", error);
  }
};
export const deleteCard = (id) => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const deleteCard = `/user/cards/remove?id=${id}`;
  let url = `${mainUrl}${deleteCard}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: activeUser.access_token,
      },
    });
    const resData = await response.json();
    dispatch(fetchUserCards());
  } catch (e) {
    console.log("ERROR DELETE_CARD", e);
  }
};

// ORDERS
export const fetchOrderHistory = () => async (dispatch) => {
  const userOrderHistory = "/user/order/history?pageSize=2&pageNumber=2";
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  try {
    const response = await fetch(`${mainUrl}${userOrderHistory}`, {
      method: "GET",
      headers: {
        Authorization: activeUser.access_token,
      },
    });
    const { data } = await response.json();
    // console.log(data);
    dispatch({ type: "SAVE_ORDER_HISTORY", payload: data });
  } catch (error) {
    console.log("ERROR FETCH USER ORDER HISTORY", error);
  }
};

export const fetchCategory = () => async (dispatch) => {
  const categoryUrl = "/user/category";
  try {
    const response = await fetch(`${mainUrl}${categoryUrl}`, {
      method: "GET",
      headers: {
        "Accept-Language": "uz",
      },
    });
    const { data } = await response.json();
    dispatch({ type: "SAVE_RESTAURANT_CATEGORIES", payload: data });
  } catch (error) {
    dispatch({ type: "SAVE_RESTAURANT_CATEGORIES", payload: [] });
    console.log("ERROR FETCH CATEGORY ICONS", error);
  }
};

// RESTORANTS LIST
export const fetchRestaurants = () => async (dispatch) => {
  let restaurantUrl = "/user/restaurant?pageSize=100&pageNumber=0";
  const response = await fetch(`${mainUrl}${restaurantUrl}`);
  const restaurantData = await response.json();
  dispatch(fetchRestaurantsAction(restaurantData.data.restaurants));
};

export const fetchRestaurant = (id) => async (dispatch) => {
  dispatch({ type: "LOADING_TRUE" });
  const restaurantUrl = `/user/restaurant/view?id=${id}`;
  try {
    const response = await fetch(`${mainUrl}${restaurantUrl}`, {
      method: "GET",
      headers: {
        "Accept-Language": "uz",
      },
    });
    const { data } = await response.json();
    dispatch({ type: "SAVE_RESTAURANT_INFO", payload: data });
  } catch (error) {
    console.log("ERROR FETCH RESTAURANT", error);
  }
};

export const fetchRestaurantCategory = (categoryId) => async (dispatch) => {
  const categoryUrl = `/user/category/restaurant?id=${categoryId}&pageSize=18&pageNumber=0`;
  // dispatch({ type: "LOADING_TRUE" });
  try {
    const response = await fetch(`${mainUrl}${categoryUrl}`, {
      method: "GET",
      headers: {
        "Accept-Language": "uz",
      },
    });
    const { data } = await response.json();
    dispatch({
      type: "SAVE_FILTERED_RESTAURANTS",
      payload: { filteredRestaurants: data.restaurants, categoryId },
    });
  } catch (error) {
    console.log("ERROR FETCH RESTAURANT CATEGORY", error);
  }
};

export const fetchFoodCategory = (id) => async (dispatch) => {
  dispatch({ type: "LOADING_TRUE" });
  let categoryUrl = `/user/restaurant/product?id=${id}`;
  const response = await fetch(`${mainUrl}${categoryUrl}`);
  const categoryData = await response.json();

  dispatch({
    type: "SAVE_FOOD_CATEGORY_CART_ITEM_COUNT",
    payload: categoryData.data.products,
  });
};

export const fetchCartItems = () => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  // 38.838360, 65.794956

  dispatch({ type: "LOADING_TRUE" });
  try {
    let cartUrl = `/user/basket`;
    const response = await fetch(`${mainUrl}${cartUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "uz",
        "X-Location": "38.838360, 65.794956",
        Authorization: activeUser.access_token,
      },
    });
    const cartData = await response.json();
    dispatch({
      type: "SAVE_CART_ITEMS_INFO",
      payload: cartData.data,
    });
  } catch (error) {
    console.log("FETCHING_CART_ITEMS", error);
  }
};

export const fetchTotalCount = () => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  dispatch({ type: "LOADING_TRUE" });
  try {
    let countUrl = `/user/basket/items-count`;
    const response = await fetch(`${mainUrl}${countUrl}`, {
      method: "GET",
      headers: {
        Authorization: activeUser.access_token,
      },
    });
    const { data } = await response.json();
    dispatch({
      type: "SAVE_TOTAL_COUNT",
      payload: data.items,
    });
  } catch (error) {
    console.log("FETCHING_COUNT", error);
  }
};

export const searchRestaurantOrProduct = (searchTerm) => async (dispatch) => {
  dispatch({ type: "LOADING_TRUE" });
  try {
    let searchUrl = `/user/search?q=`;
    const response = await fetch(`${mainUrl}${searchUrl}${searchTerm}`, {
      method: "GET",
      headers: {
        "Accept-Language": "uz",
      },
    });
    const { data } = await response.json();
    dispatch({
      type: "SAVE_SEARCH_PRODUCTS",
      payload: data,
    });
  } catch (error) {
    console.log("SEARCH_RESTAURANT_FOOD", error);
  }
};

export const addItemToCart = (orderingItem) => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  let addItemUrl = `/user/basket/add-product`;

  const cartItems = [orderingItem];
  try {
    const response = await fetch(`${mainUrl}${addItemUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: activeUser.access_token,
      },
      body: JSON.stringify(cartItems),
    });
    const responseData = await response.json();
    if (responseData.ok) {
      dispatch({
        type: "SAVE_SEARCH_PRODUCTS",
        payload: responseData.data,
      });
      closeModalfunc(dispatch, "displayFoodWindow");
    } else {
      closeModalfunc(dispatch, "displayFoodWindow");
      dispatch({ type: "OPEN_MODAL", payload: "vendorWindow" });
    }
  } catch (error) {
    console.log("ERROR_ADDING_ITEM_TO_CART", error);
  }
};

export const clearCart = () => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  try {
    let clearCartUrl = `/user/basket/clear`;
    const response = await fetch(`${mainUrl}${clearCartUrl}`, {
      method: "GET",
      headers: {
        Authorization: activeUser.access_token,
      },
    });
    const { data } = await response.json();
    dispatch({
      type: "SAVE_CART_ITEMS_INFO",
      payload: {},
    });
  } catch (error) {
    console.log("CLEAR_CART", error);
  }
};

// CART ITEM
export const deleteCartItem = (deleteItemId) => async (dispatch) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  try {
    let deletingItemUrl = `/user/basket/remove-product`;
    const response = await fetch(
      `${mainUrl}${deletingItemUrl}?id=${deleteItemId}`,
      {
        method: "GET",
        headers: {
          Authorization: activeUser.access_token,
        },
      }
    );
    const { ok, data } = await response.json();
    dispatch({ type: "DELETE_CART_ITEM", payload: deleteItemId });
  } catch (error) {
    console.log("DELETE_CART_ITEM", error);
  }
};
