import apiService from "../services/api.service"

const SET_USER_AUTHENTICATE = 'user_authenticated'
const userAuth = localStorage.getItem(SET_USER_AUTHENTICATE);

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DELETEID: 'DELETEID',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_BY_ID: 'FETCH_BY_ID',
    UPDATE_ACTIVE: 'UPDATE_ACTIVE',
    UPDATE_INACTIVE: 'UPDATE_INACTIVE',
    LOG_IN: 'LOG_IN',
    UPDATE_IMAGE: 'UPDATE_IMAGE'
}

export const fetchAll = () => dispatch => {
    apiService.customers().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    apiService.customers().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data) => dispatch => {
    apiService.customers().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.status
            })
        })
        .catch(err => console.log(err))
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
export const updateImage = (id, data) => dispatch => {
    apiService.customers().updateImage(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_IMAGE,
                payload: { id, ...data },
                status: res.status
            })
        })
        .catch(err => console.log(err))
}
export const updateActive = (id) => dispatch => {
    apiService.customers().updateActive(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_ACTIVE,
                payload: id,
                status: res.status
            })
        })
        .catch(err => console.log(err))
}
export const updateInActive = (id) => dispatch => {
    apiService.customers().updateInActive(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_INACTIVE,
                payload: id,
                status: res.status
            })
        })
        .catch(err => console.log(err))
}

export const Delete = (id) => dispatch => {
    apiService.customers().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
        })
        .catch(err => console.log(err))
}
export const DeleteID = (id) => dispatch => {
    apiService.customers().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

export const login = (email) => dispatch => {
    apiService.customers().login(email)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.LOG_IN,
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

export const backStatusCode = () => {
    return {
        type: 'STATUS_CODE',
    }
}