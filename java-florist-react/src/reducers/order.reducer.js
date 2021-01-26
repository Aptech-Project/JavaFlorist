import { combineReducers } from 'redux';
import {
  GET_ALL_ORDER,
  DELETE_ORDER,
  GET_ORDER_BY_ID,
  REV_ORDER
} from '../actions/order.action';

const initialState = {
  Order: [],
  _orders: [],
  allOrder: []
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_BY_ID:
      return {
        ...state,
        Order: action.payload.orders,
      }
    case DELETE_ORDER:
      return {
        ...state,
      }
    case GET_ALL_ORDER:
      return {
        ...state,
        allOrder: action.payload,
      }
    case REV_ORDER:
      return {
        ...state,
      }
    default:
      return state;
  }
}

