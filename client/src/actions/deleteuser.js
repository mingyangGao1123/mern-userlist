import axios from 'axios';
import { getUsers } from './users';

function requestStart() {
    return {
      type: 'REQUEST_DELETEUSER_START'
    };
  }
  function requestSuccess() {
    return {
      type: 'REQUEST_DELETEUSER_SUCCESS',
    };
  }
  function requestFail(error) {
    return {
      type: 'REQUEST_DELETEUSER_FAIL',
      error
    };
  }

  
  export function deleteUser(user_id) {
    return (dispatch, getState) => {
      dispatch(requestStart());
      axios
        .delete('/api/users/del/' + user_id)
        .then(response => {
          dispatch(requestSuccess(dispatch(getUsers())));
        })
        .catch(err => {
          dispatch(requestFail(err));
        });
      };
  }