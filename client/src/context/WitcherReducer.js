import {
  GET_BOOKS,
  PRODUCT_ERROR,
  GET_CHARACTERS,
  GET_CURRENTCHARACTER,
  GET_CURRENTBOOK,
  CLEAR_BOOKS,
  ADD_BOOK
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books]
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
    case GET_CURRENTCHARACTER:
      return {
        ...state,
        character: action.payload
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_BOOKS:
      return {
        ...state,
        book: {},
        character: {}
      };
    default:
      return state;
  }
};
