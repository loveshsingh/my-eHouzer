/*
import {applyMiddleware, compose, createStore} from "redux";
import AppReducers from "../reducers";
import thunk from "redux-thunk";

/!**
 * @author Lovesh Singh.
 * @since 22-12-2022.
 * @description redux store.
 *!/
const store = createStore(
    AppReducers,
    {},
    compose(applyMiddleware(thunk))
);

export default store
*/

import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {createWrapper} from "next-redux-wrapper";
import AppReducers from "../reducers";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
export const store = createStore(
    AppReducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
