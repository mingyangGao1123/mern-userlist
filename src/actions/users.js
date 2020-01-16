import axios from 'axios';

function requestStart() {
    return {
      type: 'REQUEST_USERS_START'
    };
  }
  function requestSuccess(users) {
    return {
      type: 'REQUEST_USERS_SUCCESS',
      users
    };
  }
  function requestFail(error) {
    return {
      type: 'REQUEST_USERS_FAIL',
      error
    };
  }
  export function getUsers() {
    return (dispatch, getState) => {
      dispatch(requestStart());
      axios
        .get('/api/users/userlist')
        .then(response => {
          dispatch(requestSuccess(response.data));
          console.log(response);
        })
        .catch(err => {
          dispatch(requestFail(err));
        });
    };
  }
  