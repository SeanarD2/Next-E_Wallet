import axiosDef from "axios";
import Cookie from "js-cookie";

const axios = axiosDef.create({
  // baseURL: "https://zwalet.herokuapp.com",
  baseURL: "http://localhost:3001",
});

if (Cookie.get("token")) {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers = {
        Authorization: `Bearer ${Cookie.get("token")}`,
      };
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 403) {
        alert(error.response.msg);
        Cookie.remove("token");
        Cookie.remove("id");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}

export default axios;
