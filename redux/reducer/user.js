const initialScale = {
  dataUserLogin: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialScale, action) => {
  switch (action.type) {
    case "GET_USER_LOGIN_PENDING": {
      return {
        //
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "GET_USER_LOGIN_FULFILLED": {
      return {
        //
        ...state,
        dataUserLogin: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.message,
      };
    }
    case "login_REJECTED": {
      return {
        //
        ...state,
        dataUserLogin: {},
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }

    default: {
      return state;
    }
  }
};

export default user;
