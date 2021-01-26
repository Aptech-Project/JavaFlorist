import apiService from "../services/api.service"


export const GET_ALL_ORDER = 'GET_ALL_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const GetOrder = (id) => dispatch => {
  apiService.orders().fetchById(id)
    .then(response => {
      dispatch({
        type: GET_ALL_ORDER,
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
        payload: response.data
      })
    })
    .catch(err => console.log(err))
}