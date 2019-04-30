import React, { useReducer } from "react";
import PropTypes from "prop-types";
import Context from "./Context";

const ContextStore = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
const reducer = (state = initialState, action) => {
  console.log("inni i reducer: ", action.type);
  console.log("inni i reducer state: ", state);
  console.log("inni i reducer: action ", JSON.stringify(action, null, 2));

  switch (action.type) {
    case "increment":
      return { ...state, currentTest: action.currentTest };
    case "decrement":
      return { ...state, currentTest: action.currentTest };
    case "token":
      return { tokens: action.tokens };
    // return Object.assign({}, state, {
    //   tokens: action.tokens
    // });
    // return { ...state, tokens: action.tokens };
    default:
      throw new Error();
  }
};
ContextStore.propTypes = {
  children: PropTypes.any
};

var initialState = {
  currentTest: "curry",
  tokens: { accessToken: "1234" }
};

export default ContextStore;
