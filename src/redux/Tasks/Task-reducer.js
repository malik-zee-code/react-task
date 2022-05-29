const initialState = {
  tasks: {},
  showSingle: {},
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TASK":
      return {
        ...state,
        tasks: action.payload,
      };

    case "GET_SINGLE_TASK":
      return {
        ...state,
        showSingle: action.payload,
      };

    default:
      return state;
  }
};
