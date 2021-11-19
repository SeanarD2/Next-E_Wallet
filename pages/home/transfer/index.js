import React, { useState, useEffct } from "react";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import Balance from "components/Dasboard/Balance";
import Statistic from "components/Dasboard/Statistic";
import { getDataCookie } from "middleware/authPage";
import axios from "utils/axios";

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

  const dataUser = await axios
    .get(`/user/profile/${dataCookie.id}`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      console.log("THEN");
      return res.data.data;
    })
    .catch((err) => {
      console.log("CATCH");
      return [];
    });
  return {
    props: { dataUser },
  };
}

export default function Dasboard(props) {
  console.log(props.dataUser);
  return (
    <>
      <Layout title="Home | Transfer">
        <div className="container">
          <div className="row rp">
            <Sidebar />
            <div className="row col-lg-9 rp">
              <Balance />
              <Statistic />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
