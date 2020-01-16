import axios from 'axios';
//import { getUsers } from './users';

function requestStart() {
    return {
      type: 'REQUEST_EDITUSER_START'
    };
  }
  function requestSuccess(user) {
    return {
      type: 'REQUEST_EDITUSER_SUCCESS',
      user
    };
  }
  function requestFail(error) {
    return {
      type: 'REQUEST_EDITUSER_FAIL',
      error
    };
  }

  
  export function editUser(user_id, user,history) {
    return (dispatch, getState) => {
      dispatch(requestStart());
      axios
        .put('/api/users/edit/' + user_id, user)
        .then(response =>{
          dispatch(requestSuccess(response.data));
          history.push('/');
        })
        .catch(err => {
          dispatch(requestFail(err));
        });
      };
  }