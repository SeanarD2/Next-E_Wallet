import cookie from "next-cookies";

export function getDataCookie(context) {
  return new Promise((resolve) => {
    let dataCookie = cookie(context);
    // console.log(dataCookie.token);
    if (dataCookie.token) {
      dataCookie.isLogin = true;
    } else {
      dataCookie.isLogin = false;
    }
    resolve(dataCookie);
  });
}

// PUBLIC ROUTE
export function unAuthPage(context) {
  return new Promise((resolve) => {
    const dataCookie = cookie(context);
    // console.log(dataCookie);
    if (dataCookie.token) {
      return context.res.writeHead(302, {
        Location: "/main/home",
      });
    }
    resolve("unathorized");
  });
}

// PRIVATE ROUTE
export function authPage(context) {
  return new Promise((resolve) => {
    const dataCookie = cookie(context);
    // console.log(dataCookie);
    if (!dataCookie.token) {
      return context.res.writeHead(302, {
        Location: "/auth/login",
      }).end;
    }
    return resolve(dataCookie);
  });
}
