import { createStore } from "redux";
import { reducer } from "./ReduxDucks";

const store = createStore(reducer);

export default store;
