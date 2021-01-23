import { ACTION_TYPES } from "../actions/category.action"

const initialState = {
    categoriesList: []
}


export const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                categoriesList: [...action.payload]
            }

        case ACTION_TYPES.FETCH_BY_ID:
            return {
                ...state,
                category: action.payload
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                categoriesList: [...state.categoriesList, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                categoriesList: state.categoriesList.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                categoriesList: state.categoriesList.filter(x => x.id != action.payload)
            }

        case ACTION_TYPES.SET_ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: action.payload
            }

        default:
            return state
    }
}