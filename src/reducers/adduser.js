const adduser = (state = { isLoading: false, error: '', data: [] }, action) => {
    switch (action.type) {

      case 'REQUEST_ADDUSER_START':
          return{
              ...state,
              isLoading: true
          }
        
      case 'REQUEST_ADDUSER_SUCCESS':
        console.log(action);          
        return {
          ...state,
          isLoading: false,
          data: Object.assign({}, state.data, action.user)
      };

      case 'REQUEST_ADDUSER_FAIL':
          return {
              ...state,
              isLoading: false,
              error: action.error
          }

      default:
        return state;
    }
  };
  
  export default adduser;