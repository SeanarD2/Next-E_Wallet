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
