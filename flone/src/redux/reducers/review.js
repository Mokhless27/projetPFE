import { ADD_REVIEW, GET_REVIEWS } from "../actions/types";

const initialState = {
  review: null,
  loading: true,
  reviews: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_REVIEW:
      return {
        ...state,
        review: payload,
        loading: false,
      };

    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false,
      };

    default:
      return state;
  }
}
