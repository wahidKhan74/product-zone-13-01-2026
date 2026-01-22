import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

// 3. combine reducers for the store
const rootReducer = combineReducers({
    cart: cartReducer,
});

export default rootReducer;