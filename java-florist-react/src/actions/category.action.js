import apiService from "../services/api.service"



export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL_CATEGORIES: 'FETCH_ALL_CATEGORIES',
    FETCH_BY_ID: 'FETCH_BY_ID',
    SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY'
}

export const fetchAll = () => dispatch => {
    apiService.categories().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_CATEGORIES,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    apiService.categories().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data) => dispatch => {
    apiService.categories().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const update = (id, data) => dispatch => {
    apiService.categories().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
        })
        .catch(err => console.log(err))
}

export const Delete = (id) => dispatch => {
    apiService.categories().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

export const setActiveCategory = (index) => {
    return {
        type: ACTION_TYPES.SET_ACTIVE_CATEGORY,
        payload: index,
    }
}