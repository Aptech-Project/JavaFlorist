import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import { productReducer } from "./product.reducer"

export const rootReducer = combineReducers({
    product: productReducer,
    login: loginReducer
})