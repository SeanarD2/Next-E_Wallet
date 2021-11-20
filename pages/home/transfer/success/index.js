import React, { useState, useEffct } from "react";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { getDataCookie } from "middleware/authPage";
import axios from "utils/axios";
import TransferSuccess from "components/Transfer/Success";

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

  const dataReceiver = await axios
    .get(`/user/profile/${dataCookie.receiverId}`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      // console.log("THEN");
      // console.log("DATA", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      // console.log("CATCH");
      return [];
    });
  return {
    props: { dataReceiver: dataReceiver },
  };
}

export default function Dasboard(props) {
  // console.log(props.dataReceiver);
  return (
    <>
      <Layout title="Home | Transfer">
        <div className="container">
          <div className="row rp">
            <Sidebar activePage="menu2" />
            <div className="row col-lg-9 rp">
              <TransferSuccess dataReceiver={props.dataReceiver} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
