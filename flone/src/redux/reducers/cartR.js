import { ADD_CART } from "../actions/types";

const initialState = {
  cartDataInfo: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CART:
      return {
        ...state,
        cartDataInfo: payload,
        loading: false
      };
    default:
      return state;
  }
}
