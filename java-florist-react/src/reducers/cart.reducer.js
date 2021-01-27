import { combineReducers } from 'redux';
import {
    GET_ALL_PRODUCT,
    GET_ALL_CART,
    GET_NUMBER_CART,
    ADD_CART,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY,
    DELETE_CART
} from '../actions/cart.action';

const initialState = {
    numberCart: 0,
    Carts: [],
    _products: [],
    _carts: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CART:
            return {
                ...state,
                Carts: action.payload.cartdetails,
                numberCart: action.payload.cartdetails.length,
            }
        case GET_NUMBER_CART:
            return {
                ...state
            }
        case ADD_CART:
            return {
                ...state,
                numberCart: state.numberCart + 1,
            }
        case INCREASE_QUANTITY:
            return {
                ...state
            }
        case DECREASE_QUANTITY:
            return {
                ...state
            }
        case DELETE_CART:
            return {
                ...state,
                numberCart: state.numberCart - 1,
            }
        default:
            return state;
    }
}

