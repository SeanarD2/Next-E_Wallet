const initialScale = {
  auth: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const auth = (state = initialScale, action) => {
  switch (action.type) {
    case "login_PENDING": {
      return {
        //
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "login_FULFILLED": {
      return {
        //
        ...state,
        auth: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.message,
      };
    }
    case "login_REJECTED": {
      return {
        //
        ...state,
        auth: {},
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

export default auth;
