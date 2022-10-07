import { COUNT_DOWN, CHANGE_NAME, CHANGE_L_NAME } from "./Actions/ActionTypes";
const savedData = JSON.parse(localStorage.getItem("activeUser"));

const activeUser = {
  loading: true,
  cards: [],
  orderHisotry: {},
  isGuest: savedData ? savedData.isGuest : true,
  first_name: savedData ? savedData.first_name : "",
  last_name: savedData ? savedData.last_name : "",
  access_token: savedData ? savedData.access_token : null,
  phone_number: savedData ? savedData.phone_number : "",
  birth_day: savedData ? savedData.birth_day : "",
  activation_code_active_until: savedData
    ? savedData.activation_code_active_until
    : 111,
  cart: savedData
    ? { ...savedData.cart }
    : { itemsTotalCount: 0, totalPrice: 0 },
};

const calculateActivationCodeTime = (activation_code_active_until) => {
  const now = Date.parse(new Date()) / 1000;
  return activation_code_active_until - now;
};

const userRegister = (state, data) => {
  const activation_code_active_until = calculateActivationCodeTime(
    data.activation_code_active_until
  );
  const newState = {
    ...state,
    activation_code_active_until,
    access_token: data.access_token,
  };

  localStorage.setItem("activeUser", JSON.stringify(newState));
  return newState;
};

const userLogin = (state, data) => {
  const newState = {
    ...state,
    isGuest: false,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
  };

  localStorage.setItem("activeUser", JSON.stringify(newState));
  return newState;
};

const userLogOut = () => {
  localStorage.clear();

  return {
    cards: [],
    isGuest: true,
    first_name: "",
    last_name: "",
    access_token: null,
    phone_number: "",
    birth_day: "",
    cart: { itemsTotalCount: 0, totalPrice: 0 },
  };
};

const countDown = (state, counter) => {
  return {
    ...state,
    [counter]: state[counter] - 1,
  };
};
// UPDATE USER PROFILE
const changeName = (state, value) => {
  return { ...state, first_name: value };
};
const changeLName = (state, value) => {
  return { ...state, last_name: value };
};
const updateUserInfo = (state, data) => {
  const newState = {
    ...state,
    first_name: data.first_name,
    last_name: data.last_name,
  };

  localStorage.setItem("activeUser", JSON.stringify(newState));
  return newState;
};

//ADD_BANK_CARD_INFO
const addBankCardInfo = (state, data) => {
  const activate_until = calculateActivationCodeTime(
    data.result.activate_until
  );
  const newState = {
    ...state,
    id: data.id,
    activate_until,
    phone: data.result.phone,
  };

  localStorage.setItem("activeUser", JSON.stringify(newState));
  return newState;
};

const storeBankCard = (state, cards) => {
  // console.log("storeBankCard", cards);
  return {
    ...state,
    loading: false,
    cards,
  };
};

const deleteCard = (state, id) => {
  const newCards = state.cards.filter((item) => item.id !== id);
  return { ...state, cards: newCards };
};

const saveOrderHistory = (state, orderHisotry) => {
  return { ...state, orderHisotry };
};

const UserReducer = (state = activeUser, action) => {
  switch (action.type) {
    case "GET_ACCESS_TOKEN": // REGISTER
      return userRegister(state, action.payload);

    case "SAVE_USER_INFO": // LOGIN
      return userLogin(state, action.payload);

    case "CLEAR": // LOG OUT
      return userLogOut();

    case COUNT_DOWN:
      return countDown(state, action.payload);

    case CHANGE_NAME:
      return changeName(state, action.payload);

    case CHANGE_L_NAME:
      return changeLName(state, action.payload);

    case "UPDATE_USER_INFO":
      return updateUserInfo(state, action.payload);

    case "ADD_BANK_CARD":
      return addBankCardInfo(state, action.payload);

    case "STORE_BANK_CARD":
      return storeBankCard(state, action.payload);

    case "DELETE_CARD":
      return deleteCard(state, action.payload);

    case "SAVE_ORDER_HISTORY":
      return saveOrderHistory(state, action.payload);

    default:
      return state;
  }
};

export default UserReducer;
