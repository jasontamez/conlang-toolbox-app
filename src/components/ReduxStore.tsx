import { createStore, applyMiddleware } from "redux";
import { reducer, blankAppState } from "./ReduxDucks";
import thunk from 'redux-thunk';

const store = createStore(reducer, blankAppState, applyMiddleware(thunk));

export default store;
