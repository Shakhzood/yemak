import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import UserReducer from "./UserReducer";
import RestaurantReducer from "./RestaurantReducer";

const reducers = combineReducers(
  {
    UserReducer,
    RestaurantReducer,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(reducers, applyMiddleware(thunk));
