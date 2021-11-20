const initialScale = {
  dataUserLogin: {},
  dataReceiver: {},
  dataAllUser: {},
  pageInfo: {
    totalPage: 1,
  },
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
    case "GET_USER_LOGIN_REJECTED": {
      return {
        //
        ...state,
        dataUserLogin: {},
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "GET_RECEIVER_DATA_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "GET_RECEIVER_DATA_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataReceiver: action.payload.data.data,
        msg: action.payload.data.message,
      };
    }
    case "GET_RECEIVER_DATA_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataReceiver: {},
        msg: action.payload.response.data.msg,
      };
    }
    case "UPDATE_PIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        // msg: action.payload.response.data.msg,
      };
    }
    case "UPDATE_PIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case "UPDATE_PIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "GET_ALL_USER_PENDING": {
      return {
        ...state,
      };
    }
    case "GET_ALL_USER_REJECTED": {
      return {
        ...state,
      };
    }
    case "GET_ALL_USER_FULFILLED": {
      return {
        ...state,
        dataAllUser: action.payload.data.data,
        isError: false,
        isLoading: false,
        pageInfo: action.payload.data.pagination,
      };
    }
    case "UPDATE_DATA_USER_PENDING": {
      return {
        ...state,
      };
    }
    case "UPDATE_DATA_USER_REJECTED": {
      return {
        ...state,
      };
    }
    case "UPDATE_DATA_USER_FULFILLED": {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default user;
