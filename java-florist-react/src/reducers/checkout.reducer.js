import { combineReducers } from 'redux';
import {
  GET_ALL_PRODUCT,
  GET_ALL_CART,
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
  USER_PROFILE,
  INSERT_ORDER
} from '../actions/checkout.action';

const initialState = {
  numberCart: 0,
  Carts: [],
  _products: [],
  _carts: [],
  userProfile: null,
}

export const CheckoutReducer = (state = initialState, action) => {
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
        Carts: action.payload.cartdetails,
        numberCart: action.payload.cartdetails.length,
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
      }
    case INSERT_ORDER:
      return {
        ...state,
      }
    case USER_PROFILE:
      let newProfile = state.userProfile;
      newProfile = action.payload
      return {
        ...state,
        userProfile: newProfile
      }
    default:
      return state;
  }
}

