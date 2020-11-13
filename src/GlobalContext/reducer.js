import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase";
import { useStateValue } from "./StateProvider";

export const initialState = {
  items: [],
  user: null,
  loading: false,
};

const reducer = (state, action) => {
  console.log("s=>", state)
  switch (action.type) {
    case "SET_USER":
      return {
        ...state, user: action.payload
      }
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "LOADING_ITEM":
      return {
        ...state,
        items: action.payload,
        loading: true,

      };
    default:
      return state;
  }
};

export default reducer;
