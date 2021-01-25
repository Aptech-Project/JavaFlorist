import apiService from "../services/api.service"

export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_ALL_CART = 'GET_ALL_CART';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const USER_PROFILE = 'USER_PROFILE';

export const GetCart = (id) => dispatch => {
  apiService.carts().fetchById(id)
    .then(response => {
      dispatch({
        type: GET_ALL_CART,
        payload: response.data
      })
    })
    .catch(err => console.log(err))
}

export function GetNumberCart() {
  return {
    type: 'GET_NUMBER_CART'
  }
}

export const AddCart = (product) => dispatch => {
  apiService.carts().update(1, product)
    .then(response => {
      dispatch({
        type: ADD_CART,
        payload: response.data
      })
    })
    .catch(err => console.log(err))
}

export function UpdateCart(payload) {
  return {
    type: 'UPDATE_CART',
    payload
  }
}

export const DeleteCarts = (cartdetail) => dispatch => {
  apiService.cartdetail().delete(cartdetail.id)
    .then(response => {
      dispatch({
        type: DELETE_CART,
        payload: response
      })
    })
    .catch(err => console.log(err))
}

export const DecreaseQuantity = (cartdetail) => dispatch => {
  apiService.cartdetail().update(-1, cartdetail)
    .then(response => {
      dispatch({
        type: DECREASE_QUANTITY,
        payload: response
      })
    })
    .catch(err => console.log(err))
}

export const IncreaseQuantity = (cartdetail) => dispatch => {
  apiService.cartdetail().update(1, cartdetail)
    .then(response => {
      dispatch({
        type: INCREASE_QUANTITY,
        payload: response
      })
    })
    .catch(err => console.log(err))
}
export const loadprofile = (userData) => {
  return {
    type: 'USER_PROFILE',
    payload: userData
  }
}

export const update = (id, data) => dispatch => {
  apiService.customers().update(id, data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
        status: res.status
      })
    })
    .catch(err => console.log(err))
}

