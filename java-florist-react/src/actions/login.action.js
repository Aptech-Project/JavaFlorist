export const isAuthenticated = (flag) => {
    return {
        type: 'AUTHENTICATE_SIGNAL',
        isAuthenticated: flag,
    }
}