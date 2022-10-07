import { FETCH_RESTAURANTS } from "./Actions/ActionTypes";

const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  foods: [],
  categoryId: null,
  restaurant: {},
  restaurantCategories: [],
  // Food Category
  foodCategory: [], // products
  categoryFoods: [], // products

  categoryName: "Barchasi",
  isLoading: true,
  singleRCategoryId: 0,

  // food modal
  isFoodOpen: false,
  foodInfo: {},
  // basket
  items_count: {
    count: 1,
    price: 0,
    totalPrice: 0,
    // totalCount: 0,
  },

  // cart info
  cost_of_delivery: 0,
  cost_of_products: 0,
  cartItems: [],
  restaurantName: "",

  // isSearchOpen: false, need to delete beacuse using sinlge overlay many times
  isOverlayOpen: false,
  searchTerm: "",

  modalState: {
    searchWindow: false,
    clearCartWindow: true,
    addUserWindow: false,
    phoneVerificationWindow: false,
    displayFoodWindow: false,
    vendorWindow: false,
  },

  // search results
  products: [],
  searchRestaurants: [],
};

const saveRestaurantsData = (state, restaurants) => {
  return { ...state, restaurants, isLoading: false };
};

const saveRestaurantInfo = (state, restaurant) => {
  return {
    ...state,
    restaurant: restaurant ?? {},
    isLoading: false,
  };
};

const saveRestaurantCategories = (state, restaurantCategories) => {
  const newCategories = restaurantCategories.map((item) => ({
    ...item,
    isActive: false,
  }));
  return { ...state, restaurantCategories: newCategories };
};

const saveFilteredRestaurants = (state, obj) => {
  const { filteredRestaurants, categoryId } = obj;
  return { ...state, filteredRestaurants, categoryId, isLoading: false };
};

const clearFilteredRestaurants = (state, obj) => {
  return { ...state, ...obj };
};

const toggleRestaurantCategories = (state, id) => {
  let title = "Barchasi";
  const newCategories = state.restaurantCategories.map((item) => {
    if (item.id === id) {
      if (state.categoryName.toLowerCase() === item.title.toLowerCase()) {
        title = "Barchasi";
      } else {
        title = item.title;
      }
      return { ...item, isActive: !item.isActive };
    } else {
      return { ...item, isActive: false };
    }
  });

  return { ...state, restaurantCategories: newCategories, categoryName: title };
};

const saveFoodCategory_cartItemCount = (state, foodCategory) => {
  return {
    ...state,
    foods: foodCategory, //[]
  };
};

const loadingTrue = (state) => {
  return { ...state, isLoading: true };
};

const loadingFalse = (state) => {
  return {
    ...state,
    isLoading: false,
  };
};

const incrementItemCount = (state, fullPrice) => {
  return {
    ...state,
    items_count: {
      count: state.items_count.count + 1,
      price: (state.items_count.price += fullPrice),
      // totalCount: state.items_count.totalCount + 1,
    },
  };
};

const decrementItemCount = (state, fullPrice) => {
  return {
    ...state,
    items_count: {
      count: state.items_count.count - 1,
      price: (state.items_count.price -= fullPrice),
      // totalCount: state.items_count.totalCount + 1,
    },
  };
};

const setCategoryId = (state, id) => {
  return { ...state, singleRCategoryId: id };
};

const getFoodInfo = (state, food) => {
  return {
    ...state,
    foodInfo: food,
    isFoodOpen: true,

    items_count: {
      ...state.items_count,
      count: 1,
      price: food.price,
    },
  };
};

const saveCartItemsInfo = (state, cartItemInfo = {}) => {
  const {
    cost_of_delivery,
    cost_of_products,
    products,
    restaurant,
    total_price,
  } = cartItemInfo;

  return {
    ...state,
    cost_of_delivery: cost_of_delivery || 0,
    cost_of_products: cost_of_products || 0,
    cartItems: products || [],
    restaurantName: restaurant.name || "defaultResName",
    items_count: {
      ...state.items_count,
      totalPrice: total_price || 0,
    },
  };
};

const saveTotals = (state, items_count) => {
  const { count, totalPrice, totalCount } = items_count;
  return {
    ...state,
    items_count: {
      count,
      totalPrice,
      totalCount: totalCount ?? 0,
    },
  };
};
const searchBgcFalse = (state) => {
  return {
    ...state,
    isSearchOpen: null,
    isOverlayOpen: false,
    searchRestaurants: [],
    products: [],
    searchTerm: "",
  };
};
const searchBgcTrue = (state) => {
  return { ...state, isOverlayOpen: true };
};

const saveSearchProducts = (state, searchResult) => {
  const { products, restaurants } = searchResult;
  return { ...state, products, searchRestaurants: restaurants };
};

const setSearchTerm = (state, searchValue) => {
  return { ...state, searchTerm: searchValue };
};

const setFoodOpen = (state) => {
  return { ...state, isFoodOpen: false };
};

const openModal = (state, openModalType) => {
  return {
    ...state,
    modalState: {
      ...state.modalState,
      [openModalType]: true,
    },
  };
};
const closeModal = (state, closeModalType) => {
  return {
    ...state,
    modalState: {
      ...state.modalState,
      [closeModalType]: false,
    },
  };
};

const updateOptionsPrice = (state, price) => {
  return {
    ...state,
    items_count: {
      ...state.items_count,
      price: state.items_count.count * price,
    },
  };
};

const deleteCartItem = (state, id) => {
  const newCartItems = state.cartItems.filter((item) => item.id !== id);
  return { ...state, cartItems: newCartItems };
};

const RestaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return saveRestaurantsData(state, action.payload);

    case "SAVE_RESTAURANT_INFO":
      return saveRestaurantInfo(state, action.payload);

    case "SAVE_RESTAURANT_CATEGORIES":
      return saveRestaurantCategories(state, action.payload);

    case "SAVE_FILTERED_RESTAURANTS":
      return saveFilteredRestaurants(state, action.payload);

    case "CLEAR_FILTERED_RESTAURANTS":
      return clearFilteredRestaurants(state, action.payload);

    case "TOGGLE_RESTAURANT_CATEGORIES":
      return toggleRestaurantCategories(state, action.payload);

    case "SAVE_FOOD_CATEGORY_CART_ITEM_COUNT":
      return saveFoodCategory_cartItemCount(state, action.payload);

    case "LOADING_TRUE":
      return loadingTrue(state);

    case "LOADING_FALSE":
      return loadingFalse(state);

    case "INCREMENT":
      return incrementItemCount(state, action.payload);

    case "DECREMENT":
      return decrementItemCount(state, action.payload);

    case "SET_FOOD_CATEGORY_ID":
      return setCategoryId(state, action.payload);

    case "GET_FOOD_INFO":
      return getFoodInfo(state, action.payload);

    case "SAVE_CART_ITEMS_INFO":
      return saveCartItemsInfo(state, action.payload);

    case "SAVE_TOTAL_COUNT":
      return saveTotals(state, action.payload);

    case "SEARCH_BGC_TRUE":
      return searchBgcTrue(state);

    case "SEARCH_BGC_FALSE":
      return searchBgcFalse(state);

    case "SAVE_SEARCH_PRODUCTS":
      return saveSearchProducts(state, action.payload);

    case "SET_SEARCH_TERM":
      return setSearchTerm(state, action.payload);

    case "SET_FOOD_OPEN":
      return setFoodOpen(state);

    case "OPEN_MODAL":
      return openModal(state, action.payload);

    case "CLOSE_MODAL":
      return closeModal(state, action.payload);

    case "UPDATE_OPTIONS_PRICE":
      return updateOptionsPrice(state, action.payload);

    case "DELETE_CART_ITEM":
      return deleteCartItem(state, action.payload);

    default:
      return state;
  }
};

export default RestaurantReducer;
