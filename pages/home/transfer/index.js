import React, { useState, useEffct } from "react";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { getDataCookie } from "middleware/authPage";
import axios from "utils/axios";
import SearchReceiver from "components/Transfer/SearchReceiver";

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

  const allUser = await axios
    .get(`/user?page=1&limit=5&search=&sort=`, {
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
      // console.log(err.response);
      return [];
    });
  return {
    props: { allUser: allUser },
  };
}

export default function Dasboard(props) {
  // console.log(props.dataUser);
  return (
    <>
      <Layout title="Home | Transfer">
        <div className="container">
          <div className="row rp">
            <Sidebar activePage="menu2" />
            <div className="row col-lg-9 rp">
              <SearchReceiver allUser={props.allUser} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
