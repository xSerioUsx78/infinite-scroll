export const setError = (msg, status) => {
    return {
        type: 'SET_ERROR',
        payload: {
            'msg': msg,
            'status': status
        }
    }
}