const edituser = (state = { isLoading: false, error: '', data: [] }, action) => {
    switch (action.type) {
      case 'REQUEST_EDITUSER_START':
        return {
          ...state,
          isLoading: true
        };
        

      case 'REQUEST_EDITUSER_SUCCESS':
        console.log(action);
        return {
          ...state,
          isLoading: false,
          data: [...state.data.filter( _id => _id !== action.user_id ), Object.assign({}, action.user)]
        };


      case 'REQUEST_EDITUSER_FAIL':
        return {
          ...state,
          isLoading: false,
          error: action.error
        };
        
      default:
        return state;
    }
  };
  
  export default edituser;