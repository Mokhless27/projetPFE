import {
  GET_CLOTHES,
  CLOTHES_ERROR,
  GET_PRODUCT,
  CHECKOUT,
  DELETE_PRODUCT,
} from "../actions/types";

//import { FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

const initState = {
  products: [],
  loading: true,
  checkout: null,
  //prod: null,
};

// const productReducer = (state = initState, action) => {
//   if (action.type === FETCH_PRODUCTS_SUCCESS) {
//     return {
//       ...state,
//       products: action.payload
//     };
//   }

//   return state;
// };

// export default productReducer;

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CLOTHES:
      return {
        ...state,
        products: payload,
        loading: false,
      };

    case CLOTHES_ERROR:
      return {
        ...state,
        loading: false,
      };
    // case GET_PRODUCT:
    //   return {
    //     ...state,
    //     prod: payload,
    //     loading: false
    //   };
    // case DELETE_PRODUCT:
    //   return {
    //     ...state,
    //     prod: payload,
    //     loading: false,
    //   };

    case CHECKOUT:
      return {
        ...state,
        checkout: payload,
      };

    default:
      return state;
  }
}
