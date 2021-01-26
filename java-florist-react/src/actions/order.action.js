import apiService from "../services/api.service"


export const GET_ORDER_BY_ID = 'GET_ORDER_BY_ID';
export const DELETE_ORDER = 'DELETE_ORDER';
export const GET_ALL_ORDER = 'GET_ALL_ORDER';
export const REV_ORDER = 'REV_ORDER';

export const GetOrder = (id) => dispatch => {
  apiService.orders().fetchById(id)
    .then(response => {
      dispatch({
        type: GET_ORDER_BY_ID,
        payload: response.data
      })
    })
    .catch(err => console.log(err))
}

export const deleteOrder = (id) => dispatch => {
  apiService.orders().delete(id)
    .then(response => {
      dispatch({
        type: DELETE_ORDER,
        payload: response
      })
    })
    .catch(err => console.log(err))
}
export const GetAllOrder = () => dispatch => {
  apiService.orders().fetchAll()
    .then(response => {
      dispatch({
        type: GET_ALL_ORDER,
        payload: response.data
      })
    })
    .catch(err => console.log(err))
}
export const confirmRevOrder = (id) => dispatch => {
  apiService.orders().update(id)
    .then(response => {
      dispatch({
        type: REV_ORDER,
        payload: response
      })
    })
    .catch(err => console.log(err))
}