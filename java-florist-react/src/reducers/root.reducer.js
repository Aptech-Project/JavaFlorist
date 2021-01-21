import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import { productReducer } from "./product.reducer"
import { feedbackReducer} from "./feedback.reducer"
import { contactReducer} from "./contact.reducer"
import { customerReducer} from "./customer.reducer"
export const rootReducer = combineReducers({
    product: productReducer,
    feedback: feedbackReducer,
    contact: contactReducer,
    login: loginReducer,
    customer: customerReducer
})