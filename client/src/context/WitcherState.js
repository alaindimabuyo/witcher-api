import React, { useReducer } from "react";
import WitcherContext from "./WitcherContext";
import WitcherReducer from "./WitcherReducer";
import { GET_BOOKS, PRODUCT_ERROR, GET_CHARACTERS, GET_CURRENTBOOK } from "../types";
import axios from "axios";

const WitcherState = props => {
  const initialState = {
    books: [],
    book: {},
    characters: [],
    character: {},
    error: null
  };

  const [state, dispatch] = useReducer(WitcherReducer, initialState);

  const getBook = async () => {
    try {
      const res = await axios.get("books");

      dispatch({ type: GET_BOOKS, payload: res.data.Books });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };
  const getCurrentBook = async id => {
    try {
      const res = await axios.get(`/books/${id}`);
      dispatch({ type: GET_CURRENTBOOK, payload: res.data.book });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };
  const getCharacters = async () => {
    try {
      const res = await axios.get("characters");

      dispatch({ type: GET_CHARACTERS, payload: res.data.characters });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  return (
    <WitcherContext.Provider
      value={{
        books: state.books,
        book: state.book,
        character: state.character,
        characters: state.characters,
        getBook,
        getCurrentBook,
        getCharacters
      }}
    >
      {props.children}
    </WitcherContext.Provider>
  );
};

export default WitcherState;
