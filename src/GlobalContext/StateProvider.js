import React, { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../firebase";
// Prepeares the data layer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Pull Information from the data layer
export const useStateValue = () => useContext(StateContext);
