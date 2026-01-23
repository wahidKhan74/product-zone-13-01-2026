import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";

// 3. combine reducers for the store
const rootReducer = combineReducers({
    cart: cartReducer,
    product: productReducer,
});

export default rootReducer;