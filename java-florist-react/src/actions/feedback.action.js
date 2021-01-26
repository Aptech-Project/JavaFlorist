import apiService from "../services/api.service"
export const ACTION_TYPES = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    FETCH_ALL: "FECTH_ALL",
    FETCH_BY_ID_PRO: "FETCH_BY_ID_PRO",
    REP_COMMENT: "REP_COMMENT"
}
export const fetchAll = () => dispatch => {
    apiService.feedbacks().fetchAll()
        .then(
            response => {
                // console.log(response)
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                })
            }
        ).catch(err => console.log(err))
}
export const fetchByIdPro = (pId, uId) => dispatch => {
    apiService.feedbacks().fetchByIdPro(pId, uId)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const create = (data, onSuccess) => dispatch => {
    apiService.feedbacks().create(data).then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
        .catch(err => console.log(err))
}
export const update = (id, data, onSuccess) => dispatch => {
    apiService.feedbacks().update(id, data).then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: { id, ...data }
        })
        onSuccess()
    })
        .catch(err => console.log(err))
}
export const repComment = (id, rep) => dispatch => {
    apiService.feedbacks().repComment(id, rep).then(res => {
        dispatch({
            type: ACTION_TYPES.REP_COMMENT,
            payload: { id, rep }
        })
    })
        .catch(err => console.log(err))
}
export const Delete = (id, onSuccess) => dispatch => {
    apiService.feedbacks().delete(id).then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
        .catch(err => console.log(err))
}