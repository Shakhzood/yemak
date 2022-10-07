import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant, fetchFoodCategory } from "../../Store/Thunk";
import { useNavigate } from "react-router-dom";

import "./SearchResultWindow.scss";

const DisplaySearchResult = ({ title, searchResultArr, onCloseOverLayer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSearchOpen, isOverlayOpen } = useSelector(
    (state) => state.RestaurantReducer
  );

  const onSelectProduct = (e, item) => {
    onCloseOverLayer(e);
    if (item.hasOwnProperty("restaurant")) {
      dispatch(fetchRestaurant(item.restaurant.id));
      dispatch(fetchFoodCategory(item.restaurant.id));
      dispatch({ type: "GET_FOOD_INFO", payload: item }); // item is food
      navigate(`/restaurant/${item.restaurant.id}`);
    } else {
      dispatch(fetchRestaurant(item.id));
      dispatch(fetchFoodCategory(item.id));
      navigate(`/restaurant/${item.id}`);
    }
  };

  return (
    <div className="restaurant_info">
      <div className="productsTitle">
        <span className="search_title">{title}</span>
      </div>

      {searchResultArr.map((item) => {
        return (
          <div
            onClick={(e) => onSelectProduct(e, item)}
            className="productItems"
            key={item.id}
          >
            <div className="products">
              <div className="productImage">
                <img
                  src={item.image}
                  alt="productImage"
                  className="productImage"
                />
              </div>
              <div className="productName">
                <span>{item.name}</span>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default DisplaySearchResult;
