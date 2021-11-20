import React, { useState, useEffct } from "react";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { getDataCookie } from "middleware/authPage";
import axios from "utils/axios";
import { useRouter } from "next/router";
import PersonalInfo from "components/Profile/PersonalInfo";

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

  const historyList = await axios
    .get(`/transaction/history?page=1&limit=6&filter=MONTH`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      console.log("THEN");
      console.log(res);
      return res.data.data;
    })
    .catch((err) => {
      console.log("CATCH");
      return [];
    });
  return {
    props: { historyList: historyList },
  };
}

export default function EditPersonalInfoUser(props) {
  const router = useRouter();
  console.log(router.query);
  console.log(props.historyList);
  return (
    <>
      <Layout title="Dashboard | History">
        <div className="container">
          <div className="row rp">
            <Sidebar activePage="menu4" />
            <div className="row col-lg-9 rp">
              <PersonalInfo />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
