import {
  SAVE_USER_INFO,
  REGISTER_USER,
  VERIFY_CODE,
  COUNT_DOWN,
  FETCH_RESTAURANTS,
  CHANGE_NAME,
  CHANGE_L_NAME,
} from "./ActionTypes";

// export const saveUserInfoAction = (data) => ({
//   type: SAVE_USER_INFO,
//   payload: data,
// });

// export const registerUserAction = (userPhoneNumber) => ({
//   type: REGISTER_USER,
//   payload: userPhoneNumber,
// });

// export const verifyCodeAction = (userInfo) => ({
//   type: VERIFY_CODE,
//   payload: userInfo,
// });
export const countDown = (counter) => ({
  type: COUNT_DOWN,
  payload: counter,
});

// RESTAURANTS
export const fetchRestaurantsAction = (restaurants) => ({
  type: FETCH_RESTAURANTS,
  payload: restaurants,
});

// UPDATE PROFILE INFO
export const changeName = (value) => ({
  type: CHANGE_NAME,
  payload: value,
});
export const changeLName = (value) => ({
  type: CHANGE_L_NAME,
  payload: value,
});
