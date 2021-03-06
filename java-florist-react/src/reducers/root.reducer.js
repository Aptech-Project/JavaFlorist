import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import { productReducer } from "./product.reducer"
import { feedbackReducer } from "./feedback.reducer"
import { contactReducer } from "./contact.reducer"
import { customerReducer } from "./customer.reducer"
import { cartReducer } from "./cart.reducer"
// import { checkoutReducer } from "./checkout.reducer"
import { orderReducer } from "./order.reducer"

import { categoryReducer } from "./category.reducer";

export const rootReducer = combineReducers({
    product: productReducer,
    feedback: feedbackReducer,
    contact: contactReducer,
    login: loginReducer,
    customer: customerReducer,
    cart: cartReducer,
    // checkout: checkoutReducer,
    order: orderReducer,
    category: categoryReducer
})