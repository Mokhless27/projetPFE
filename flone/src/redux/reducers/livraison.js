import { ADD_LIVRAISON, GET_LIVRAISONS } from "../actions/types";

const initialState = {
  livraisons: [],
  livraison: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIVRAISONS:
      return {
        ...state,
        livraisons: payload,
        loading: false,
      };

    case ADD_LIVRAISON:
      return {
        ...state,
        livraison: payload,
        loading: false,
      };

    default:
      return state;
  }
}
