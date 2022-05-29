const initialState = {
  user: {},
  allusers: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "GET_ALL_USERS":
      return {
        ...state,
        allusers: action.payload,
      };
    default:
      return state;
  }
};
