import React, { useReducer } from "react";
import WitcherContext from "./WitcherContext";
import WitcherReducer from "./WitcherReducer";
import { GET_WITCHER, PRODUCT_ERROR } from "../types";
import axios from "axios";

const WitcherState = props => {
  const initialState = {
    books: [],
    book: {},
    error: null
  };

  const [state, dispatch] = useReducer(WitcherReducer, initialState);

  const getProduct = async () => {
    try {
      const res = await axios.get("characters");

      dispatch({ type: GET_WITCHER, payload: res.data.books });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  return (
    <WitcherContext.Provider
      value={{
        books: state.books,
        book: state.book,
        getProduct
      }}
    >
      {props.children}
    </WitcherContext.Provider>
  );
};

export default WitcherState;
