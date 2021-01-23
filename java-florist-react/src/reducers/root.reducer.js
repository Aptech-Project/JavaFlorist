import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import { productReducer } from "./product.reducer"
import { feedbackReducer } from "./feedback.reducer"
import { contactReducer } from "./contact.reducer"
import { customerReducer } from "./customer.reducer"
import { cartReducer } from "./cart.reducer"
import { categoryReducer } from "./category.reducer";

export const rootReducer = combineReducers({
    product: productReducer,
    feedback: feedbackReducer,
    contact: contactReducer,
    login: loginReducer,
    customer: customerReducer,
    cart: cartReducer,
    category: categoryReducer
})