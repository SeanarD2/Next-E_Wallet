module.exports = {
  reactStrictMode: true,
  env: {
    STATUS: "dev",
    // BE_DEV: "http://localhost:3001",
    BE_DEV: "https://zwalet.herokuapp.com",
    BE_PROD: "https://jsonplaceholder.typicode.com/",
  },
  async rewrites() {
    return [
      {
        source: "/profile",
        destination: "/User/profile",
      },
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/sign-up",
        destination: "/auth/sign-up",
      },
      {
        source: "/create-pin",
        destination: "/auth/create-pin",
      },
      {
        source: "/create-new-pass",
        destination: "/auth/create-new-pass",
      },
      {
        source: "/create-new-pass/:key",
        destination: "/auth/create-new-pass/:key",
      },

      {
        source: "/dashboard",
        destination: "/home/dasboard",
      },
      {
        source: "/history",
        destination: "/home/dasboard/history",
      },

      {
        source: "/transfer",
        destination: "/home/transfer",
      },
      {
        source: "/transfer/amount",
        destination: "/home/transfer/amount",
      },
      {
        source: "/transfer/confirm",
        destination: "/home/transfer/confirm",
      },
      {
        source: "/transfer/confirm",
        destination: "/home/transfer/confirm",
      },
    ];
  },
};
