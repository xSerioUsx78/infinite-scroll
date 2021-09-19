const initialState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_NOT_LOADING':
            return {
                ...state,
                isLoading: false
            }
        case 'USER_LOADED':
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case 'USER_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                isLoading: false,
            }
        case 'USER_LOGGED_IN':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
            }
        case 'USER_LOGGED_OUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default authReducer;