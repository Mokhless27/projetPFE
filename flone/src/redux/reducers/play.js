import { GET_PREF } from "../actions/types";

const initialState = {
  preferences: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PREF:
      return {
        ...state,
        preferences: payload,
        loading: false
      };
    default:
      return state;
  }
}
