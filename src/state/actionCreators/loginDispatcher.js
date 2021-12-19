import { _getUsers } from "../../_DATA";


export const allUsers = () => {
  return async (dispatch) => {
  await  _getUsers().then((users) => {
    
        dispatch({
          type: "SET_USERS",
          users,
        });
      
    });
  };
};

export const dispatchAuthUser = (SelectedUser) => {
  return (dispatch) => {
    if(SelectedUser !==null && SelectedUser !== '') {

      _getUsers().then((users) => {
       const authUser = Object.values(users).filter((user) => user.id === SelectedUser);
     
        dispatch({
          type: "SET_authUSER",
          authUser: authUser
        });
      
    });


  }
  };
};



export const logout = () => {
  return (dispatch) => {

    dispatch({
      type: "USER_LOGOUT",
      authUser: []
      
    });


  };
};