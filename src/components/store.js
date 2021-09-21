import { createStore } from "redux";
import reducer from "./State";

export const store = createStore(reducer, {});
