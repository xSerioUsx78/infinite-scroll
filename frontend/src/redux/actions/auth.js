import axios from '../../axios';
import requests from '../../requests';


export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: 'USER_LOADING' });
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
    axios
      .get(requests.getUserURL, config)
      .then(res => {
        dispatch({
          type: 'USER_LOADED',
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err.response.data)
        dispatch({
          type: 'USER_FAIL'
        });
      })
      .finally(() => {
        dispatch({ type: 'USER_NOT_LOADING' });
      })
  } else {
    dispatch({
      type: 'USER_FAIL'
    });
  }
};


export const loginUser = (data) => (dispatch) => {
  dispatch({ type: 'USER_LOADING' });
  axios
  .post(requests.loginURL, data)
    .then(res => {
      const token = res.data.token;
      const user = res.data.user;
      dispatch({
        type: 'USER_LOGGED_IN',
        payload: {
          'token': token,
          'user': user
        },
      });
      dispatch({ type: 'RESET_ERROR' });
    })
    .catch(err => {
      dispatch({
        type: 'USER_FAIL'
      });
      dispatch({
        type: 'SET_ERROR',
        payload: {
          msg: err.response.data.detail,
          status: err.response.status
        }
      });
    })
    .finally(() => {
      dispatch({
        type: 'USER_NOT_LOADING'
      })
    })
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'IS_LOADING' });
  dispatch({
    type: 'USER_LOGGED_OUT'
  });
  dispatch({ type: 'NOT_LOADING' });
};