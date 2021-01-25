import { combineReducers } from 'redux';
import {
  GET_ALL_ORDER
} from '../actions/order.action';

const initialState = {
  Order: [],
  _orders: [],
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        Order: action.payload.orders,
      }
    default:
      return state;
  }
}

