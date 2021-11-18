module.exports = {
  reactStrictMode: true,
  env: {
    URL_BE: "https://jsonplaceholder.typicode.com/",
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
    ];
  },
};
