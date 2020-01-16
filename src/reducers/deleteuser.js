const deleteuser = (state = { isLoading: false, error: '', data: [] }, action) => {
    switch (action.type) {
      case 'REQUEST_DELETEUSER_START':
        return {
          ...state,
          isLoading: true
        };
        

      case 'REQUEST_DELETEUSER_SUCCESS':
        console.log(action);
        return {
          ...state,
          isLoading: false,
          data: Object.assign({}, state.data, state.data.filter(_id=>_id!==action.user_id)),
        };


      case 'REQUEST_DELETEUSER_FAIL':
        return {
          ...state,
          isLoading: false,
          error: action.error
        };
        
      default:
        return state;
    }
  };
  
  export default deleteuser;