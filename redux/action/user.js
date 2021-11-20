import axios from "utils/axios";

export const getDataUser = (data) => {
  return {
    type: "GET_USER_LOGIN",
    payload: axios.get(`/user/profile/${data}`),
  };
};

export const getDataReceiver = (data) => {
  return {
    type: "GET_RECEIVER_DATA",
    payload: axios.get(`/user/profile/${data}`),
  };
};

export const updatePin = (data) => {
  return {
    type: "UPDATE_PIN",
    payload: axios.patch(`/user/pin/${data.id}`, { pin: data.pin }),
  };
};

export const getAllUser = (data) => {
  return {
    type: "GET_ALL_USER",
    payload: axios.get(`/user?page=1&limit=5&search=${data.search}&sort=`),
  };
};

export const updateDataUser = (data) => {
  return {
    type: "UPDATE_DATA_USER",
    payload: axios.patch(`/user/profile/${data.id}`, {
      firstName: data.firstName,
      lastName: data.lastName,
    }),
  };
};
