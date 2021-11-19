import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Layout from "components/Layout";
import axios from "utils/axios";
import { authPage, getDataCookie } from "middleware/authPage";

// TODO SERVER SIDE RENDERING
export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const response = await axios
    .get("/user?page=1&limit=2&search=&sort=", {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      // console.log("THEN");
      return res.data.data;
    })
    .catch((err) => {
      // console.log("CATCH");
      return [];
    });
  return {
    props: { data: response },
  };
}

export default function Home(props) {
  // console.log(process.env.URL_BE);

  //TODO CLIENT SIDE RENDERING
  // const [data, setData] = useState([]);
  // const getDataUser = () => {
  //   axios
  //     .get("/user?page=1&limit=2&search=&sort=")
  //     .then((res) => {
  //       setData(res.data.data);
  //       console.log(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getDataUser();
  // }, []);

  // console.log(props);

  return (
    <Layout title="Home">
      <h1>Home Page</h1>
      <hr />
      {props.data.map((item) => (
        <div key={item.id}>
          <h3>{item.firstName}</h3>
        </div>
      ))}
    </Layout>
  );
}
