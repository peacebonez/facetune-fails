import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//combines all reducers into one root reducer
import rootReducer from "./reducers";

const initialState = {};

const middleWare = [thunk];

// (reducer, initial state, enhancements)
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
