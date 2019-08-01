import { GET_BOOKS, PRODUCT_ERROR, GET_CHARACTERS, GET_CURRENTBOOK } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    case GET_CURRENTBOOK:
      return {
        ...state,
        book: action.payload
      };
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload
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
