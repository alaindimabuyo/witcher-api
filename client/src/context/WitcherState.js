import React, { useReducer } from "react";
import WitcherContext from "./WitcherContext";
import WitcherReducer from "./WitcherReducer";
import {
  GET_BOOKS,
  PRODUCT_ERROR,
  GET_CHARACTERS,
  GET_CURRENTCHARACTER,
  GET_CURRENTBOOK,
  CLEAR_BOOKS,
  ADD_BOOK
} from "../types";
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
  const addBook = async () => {
    try {
      const res = await axios.post("books");
      dispatch({ type: ADD_BOOK, payload: res.data });
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
  const getCurrentCharacter = async id => {
    try {
      const res = await axios.get(`/characters/${id}`);
      dispatch({ type: GET_CURRENTCHARACTER, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  const clearBooks = async () => {
    dispatch({ type: CLEAR_BOOKS });
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
        getCharacters,
        getCurrentCharacter,
        clearBooks,
        addBook
      }}
    >
      {props.children}
    </WitcherContext.Provider>
  );
};

export default WitcherState;
