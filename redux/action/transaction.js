import axios from "utils/axios";

export const getIncomeExpense = (data) => {
  return {
    type: "GET_INCOME_EXPENSE",
    payload: axios.get(`/dashboard/${data}`),
  };
};

export const getTransactionHistory = (data) => {
  return {
    type: "GET_TRANSACTION_HISTORY",
    payload: axios.get(
      `/transaction/history?page=${data.page}&limit=5&filter=${data.filter}`
    ),
  };
};

export const setTransferData = (data) => {
  return {
    type: "SET_TRANSFER_DATA",
    payload: data,
  };
};

export const checkPin = (data) => {
  return {
    type: "CHECK_PIN",
    payload: axios.get(`/user/pin?pin=${data}`),
  };
};

export const doTransfer = (data) => {
  return {
    type: "TRANSFER",
    payload: axios.post(`/transaction/transfer`, {
      receiverId: data.receiverId,
      amount: data.amount,
      notes: data.notes,
    }),
  };
};
