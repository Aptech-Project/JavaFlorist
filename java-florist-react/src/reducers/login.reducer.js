const initialState = {
    isAuthenticated: true
}
const loginReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'AUTHENTICATE_SIGNAL': {
            let newIsAuthenticated = state.isAuthenticated;
            newIsAuthenticated = action.isAuthenticated;
            return{
                ...state,
                isAuthenticated: newIsAuthenticated
            }
        }
        default:
            return state;
    }
}

export default loginReducer;