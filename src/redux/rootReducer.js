import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

// 3. combine reducers for the store
const rootReducer = combineReducers({
    cart: cartReducer,
    user: (state = {}, action) => state, // placeholder for user reducer
    emp : (state = [], action) => state, // placeholder for emp reducer
});

export default rootReducer;