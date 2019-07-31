import { GET_WITCHER, PRODUCT_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_WITCHER:
      return {
        ...state,
        books: action.payload
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
