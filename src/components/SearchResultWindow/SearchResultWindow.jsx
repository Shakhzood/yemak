import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplaySearchResult from "./DisplaySearchResult";

import "./SearchResultWindow.scss";

const SearchResultWindow = () => {
  const { products, searchRestaurants } = useSelector(
    (state) => state.RestaurantReducer
  );
  const dispatch = useDispatch();

  const onCloseOverLayer = (e) => {
    e.stopPropagation();
    dispatch({ type: "SEARCH_BGC_FALSE" });
  };

  let isOpen = searchRestaurants.length > 0 || products.length > 0;
  return (
    <>
      <span onClick={onCloseOverLayer} className="_inputOnFocus"></span>
      {isOpen && (
        <div className="_resultContent header_search">
          <div className="_products">
            {/* RESTAURANT INFO */}
            {searchRestaurants.length > 0 && (
              <DisplaySearchResult
                title="Restoranlar"
                searchResultArr={searchRestaurants}
                onCloseOverLayer={onCloseOverLayer}
              />
            )}
            {products.length > 0 && (
              <DisplaySearchResult
                title="Maxsulotlar"
                searchResultArr={products}
                onCloseOverLayer={onCloseOverLayer}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultWindow;
