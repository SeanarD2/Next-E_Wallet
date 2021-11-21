const initialScale = {
  dashboard: {},
  history: [],
  transferData: {},
  transferDataSuccess: {},

  isLoading: false,
  isError: false,
  msg: "",
};

const transaction = (state = initialScale, action) => {
  switch (action.type) {
    case "GET_INCOME_EXPENSE_PENDING": {
      return {
        //
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "GET_INCOME_EXPENSE_FULFILLED": {
      return {
        //
        ...state,
        dashboard: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.message,
      };
    }
    case "GET_INCOME_EXPENSE_REJECTED": {
      return {
        //
        ...state,
        dashboard: {},
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "GET_TRANSACTION_HISTORY_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "GET_TRANSACTION_HISTORY_FULFILLED": {
      return {
        ...state,
        history: action.payload.data.data,
        isLoading: false,
        isError: false,
        msg: action.payload.data.message,
      };
    }
    case "GET_TRANSACTION_HISTORY_REJECTED": {
      return {
        ...state,
        history: [],
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.message,
      };
    }
    case "SET_TRANSFER_DATA": {
      return {
        ...state,
        transferData: action.payload,
      };
    }
    case "CHECK_PIN_PENDING": {
      return { ...state };
    }
    case "CHECK_PIN_FULFILLED": {
      return { ...state };
    }
    case "CHECK_PIN_REJECTED": {
      return {
        ...state,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "TRANSFER_PENDING": {
      return {
        ...state,
      };
    }
    case "TRANSFER_FULFILLED": {
      return {
        ...state,
        transferDataSuccess: action.payload.data.data,
      };
    }
    case "TRANSFER_REJECTED": {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default transaction;
