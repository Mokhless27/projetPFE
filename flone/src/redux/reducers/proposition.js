import { GET_PROPOSITIONS, ADD_PROPOSITION } from "../actions/types";

const initiateState = {
  propositions: [],
  proposition: null,
  loading: true,
};

export default function (state = initiateState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROPOSITIONS:
      return {
        ...state,
        propositions: payload,
        loading: false,
      };

    case ADD_PROPOSITION:
      return {
        ...state,
        proposition: payload,
        loading: false,
      };

    default:
      return state;
  }
}
