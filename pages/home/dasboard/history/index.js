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

  const historyList = await axios
    .get(`/transaction/history?page=2&limit=8&filter=MONTH`, {
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
    props: { historyList },
  };
}

export default function DasboardHistory(props) {
  console.log(props.historyList);
  return (
    <>
      <Layout title="Dashboard | History">
        <div className="container">
          <div className="row rp">
            <Sidebar />
            <div className="row col-lg-9 rp">
              <div className="history-out rpr">
                <div className="history-box p-lg-4">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <span className="fw-700 fs-18">Transaction History</span>
                    <select className="px-4 py-1">
                      <option>--Select Filter--</option>
                      <option>Filter</option>
                      <option>Filter</option>
                      <option>Filter</option>
                    </select>
                  </div>
                  {props.historyList
                    ? props.historyList.map((item, index) => (
                        <div
                          key={index}
                          className="history-list d-flex align-items-center justify-content-between"
                        >
                          <div className="history-list__image-user"></div>
                          <div className="history-list__details-user d-flex flex-column justify-content-evenly col-8">
                            <span className="fw-700 fs-16 text-truncate ">
                              Samuel Suhi 123123123
                            </span>
                            <span className="fw-400 fs-14">Accept</span>
                          </div>
                          <div className="history-list__amount fw-700 fs-16">
                            +Rp50.000
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
