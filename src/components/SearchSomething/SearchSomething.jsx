import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRestaurantOrProduct } from "../../Store/Thunk";
import Input from "../Input/Input";
import SearchResultWindow from "../SearchResultWindow/SearchResultWindow";

// import "../SearchResultWindow/SearchResultWindow.scss";
import "./SearchSomething.scss";

const SearchSomething = () => {
  const dispatch = useDispatch();
  const { isOverlayOpen, searchTerm } = useSelector(
    (state) => state.RestaurantReducer
  );

  const searchSomething = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
    dispatch(searchRestaurantOrProduct(searchTerm));
  };

  const blurBgc = () => {
    dispatch({ type: "SEARCH_BGC_TRUE" });
  };

  return (
    <div className="SearchField header_search_content" onClick={blurBgc}>
      <Input
        className="input-medium focusOnInput focus"
        type="text"
        placeHolder="Restoran yoki taom nomi"
        value={searchTerm}
        onChange={searchSomething}
      />

      {isOverlayOpen && <SearchResultWindow />}
    </div>
  );
};

export default SearchSomething;
