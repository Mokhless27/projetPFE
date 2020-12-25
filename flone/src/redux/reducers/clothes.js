import { ADD_SIZE, ADD_VAR, ADD_PROD } from "../actions/types";

const initialState = {
  size: null,
  variation: null,
  clothes: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SIZE:
      return {
        ...state,
        size: payload,
        loading: false,
      };

    case ADD_VAR:
      return {
        ...state,
        variation: payload,
        loading: false,
      };

    case ADD_PROD:
      return {
        ...state,
        clothes: payload,
        loading: false,
      };
    default:
      return state;
  }
}
