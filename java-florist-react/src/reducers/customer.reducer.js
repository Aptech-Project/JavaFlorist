import { ACTION_TYPES } from "../actions/customer.action"


const initialState = {
    list: [],
    registerStatus: null,
    userProfile: null,
    editStatus: null,
}


export const customerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.FETCH_BY_ID:
            console.log(action.payload);
            return {
                ...state,
                userProfile: {...action.payload}
            }

        case ACTION_TYPES.CREATE:
            console.log(action.payload);
            return {
                ...state,
                registerStatus: action.payload
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x),
                editStatus: action.status
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload),
            }

        case ACTION_TYPES.SET_ACTIVE_INDEX:
            return {
                ...state,
                activeIndex: action.payload
            }
            
        case 'USER_PROFILE':
            let newProfile = state.userProfile;
            newProfile = action.payload
            return {
                ...state,
                userProfile: newProfile
            }    
        default:
            return state
    }
}