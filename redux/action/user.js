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
    payload: axios.get(
      `/user?page=${data.page}&limit=3&search=${data.search}&sort=${data.sort}`
    ),
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

export const changePass = (data) => {
  return {
    type: "CHANGE_PASS",
    payload: axios.patch(`/user/password/${data.id}`, {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    }),
  };
};

export const updateImageUser = (data) => {
  return {
    type: "UPDATE_IMAGE_USER",
    payload: axios.patch(`/user/image/${data.id}`, data.image),
  };
};

export const deleteImageUser = (data) => {
  return {
    type: "DELTE_IMAGE_USER",
    payload: axios.delete(`/user/image/${data}`),
  };
};
