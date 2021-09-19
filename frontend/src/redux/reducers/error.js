const initialState = {
    message: null,
    status: null
}


const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return {
                ...state,
                message: action.payload.msg,
                status: action.payload.status
            };
        case 'RESET_ERROR':
            return {};
        default:
            return state;
    }
}

export default errorReducer;