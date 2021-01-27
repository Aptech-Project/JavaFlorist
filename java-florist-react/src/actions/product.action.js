import apiService from "../services/api.service"



export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_BY_ID: 'FETCH_BY_ID',
    SET_ACTIVE_INDEX: 'SET_ACTIVE_INDEX'
}

export const fetchAll = () => dispatch => {
    apiService.products().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    apiService.products().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data) => dispatch => {
    apiService.products().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: { data: res.data, status: res.status }
            })
        })
        .catch(err => console.log(err))
}

export const update = (id, data) => dispatch => {
    apiService.products().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
        })
        .catch(err => console.log(err))
}

export const Delete = (id) => dispatch => {
    apiService.products().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

export const setActiveIndex = (index) => {
    return {
        type: ACTION_TYPES.SET_ACTIVE_INDEX,
        payload: index,
    }
}