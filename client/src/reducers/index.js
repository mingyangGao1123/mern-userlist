import { combineReducers } from 'redux';
import users from './users';
import adduser from './adduser';
import deleteuser from './deleteuser';
import edituser from './edituser';

const reducers = combineReducers({
  users,
  adduser,
  deleteuser,
  edituser,
});

export default reducers;