import React, { useState, useEffct } from "react";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
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

export default function DasboardHistory(props) {
  console.log(props.historyList);
  return (
    <>
      <Layout title="Dashboard | History">
        <div className="container">
          <div className="row rp">
            <Sidebar activePage="menu1" />
            <div className="row col-lg-9 rp">
              <div className="history-out rpr" style={{ height: "100%" }}>
                <div className="history-box p-lg-4">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <span className="fw-700 fs-18">Transaction History</span>
                    <select className="px-4 py-3 history-filter fw-400 fs-13">
                      <option>--- Select Filter ---</option>
                      <option>Filter</option>
                      <option>Filter</option>
                      <option>Filter</option>
                    </select>
                  </div>
                  {props.historyList ? (
                    props.historyList.map((item, index) => (
                      <div
                        key={index}
                        className="history-list d-flex align-items-center justify-content-between my-5"
                      >
                        <div className="history-list__image-user">
                          <img
                            src={
                              item.image
                                ? "http://localhost:3001"
                                : "/assets/image/default-profile.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="history-list__details-user d-flex flex-column justify-content-evenly col-9">
                          <span className="fw-700 fs-16 text-truncate color-gray57">
                            {item.fullName}
                          </span>
                          <span className="fw-400 fs-14 color-gray86">
                            {item.type === "send"
                              ? "Transfer"
                              : item.type === "topup"
                              ? "Topup"
                              : "Accept"}
                          </span>
                        </div>
                        <div
                          className="history-list__amount fw-700 fs-16 color-green"
                          style={
                            item.type === "send" || item.type === "topup"
                              ? {
                                  color: "#FF5B37",
                                }
                              : { color: "#1EC15F" }
                          }
                        >
                          {item.type === "send" ? "-" : "+"}
                          Rp{item.amount}
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1>TEST</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
