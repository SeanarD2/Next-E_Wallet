import axios from "utils/axios";

export const login = (data) => {
  return {
    type: "login",
    payload: axios.post("/auth/login", data),
  };
};
