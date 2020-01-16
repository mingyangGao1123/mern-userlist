import axios from 'axios';
import { getUsers } from './users';

function requestStart() {
    return {
      type: 'REQUEST_ADDUSER_START'
    };
  }
  function requestSuccess() {
    return {
      type: 'REQUEST_ADDUSER_SUCCESS',
    };
  }
  function requestFail(error) {
    return {
      type: 'REQUEST_ADDUSER_FAIL',
      error
    };
  }

  
  export function addUser(user) {
    return (dispatch, getState) => {
      dispatch(requestStart());
      axios
        .post('/api/users/add', user)
        .then(response => {
          dispatch(requestSuccess());
          //dispatch(getUsers());
        }).then(dispatch(getUsers()))
        .catch(err => {
          dispatch(requestFail(err));
        });
      };
  }

