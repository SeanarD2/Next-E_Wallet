import axiosDef from "axios";
import Cookie from "js-cookie";

const axios = axiosDef.create({
  baseURL:
    process.env.STATUS === "dev" ? process.env.BE_DEV : process.env.BE_PROD,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    if (Cookie.get("token")) {
      config.headers = {
        Authorization: `Bearer ${Cookie.get("token")}`,
      };
    }

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
      if (Cookie.get("token")) {
        axios
          .post(`user/refresh`, { rToken: Cookie.get("refresh") })
          .then((res) => {
            Cookie.set("token", res.value.data.data.token);
            Cookie.set("id", res.value.data.data.id);
            Cookie.set("refresh", res.value.data.data.token);
          })
          .catch((err) => {
            console.log(err.response);
            Cookie.remove("token");
            Cookie.remove("id");
            Cookie.remove("refresh");
            window.location.href = "/login";
          });
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
