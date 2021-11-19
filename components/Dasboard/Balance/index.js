import React, { useEffect, useState } from "react";
import ArrowUpSVG from "components/SVG/ArrowUpSVG";
import PlusSVG from "components/SVG/PlusSVG";
import axios from "utils/axios";
import Cookie from "js-cookie";
import router from "next/router";

export default function Balance(props) {
  // console.log(props);
  const { firstName, lastName } = props;

  // GET DATA USER
  const [dataUser, setDataUser] = useState({});
  useEffect(() => {
    axios
      .get(`/user/profile/${Cookie.get("id")}`)
      .then((res) => {
        // console.log(res.data.data);
        setDataUser(res.data.data);
      })
      .catch((err) => {
        setDataUser({});
        // console.log(err.response.data.msg);
      });
  }, []);

  const intBalance = parseInt(dataUser.balance);
  const balanceIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(intBalance);

  return (
    <div className="balance-out col-lg-12 rpr ">
      <div className="ml-1 p-lg-4 balance-box row">
        <div className="col-lg-9 d-flex flex-column justify-content-between color-white">
          <span className="fs-18 fw-400">Balance</span>
          <span className="fw-700 fs-40">{balanceIDR}</span>
          {dataUser.noTelp ? (
            <span className="fw-600 fw-14">{dataUser.noTelp}</span>
          ) : (
            ""
          )}
        </div>
        <div className="col-lg-3 balance-btn">
          <div
            onClick={() => router.push("/home/transfer")}
            className="balance__transfer px-lg-2 py-lg-2 mb-3 d-flex justify-content-center align-items-center"
          >
            <ArrowUpSVG color={"#B5B0ED"} />
            <span>Transfer</span>
          </div>
          <div className="balance__topup p-4 px-lg-2 py-lg-2 mt-3 d-flex justify-content-center align-items-center">
            <PlusSVG color={"#B5B0ED"} />
            <span>Top Up</span>
          </div>
        </div>
      </div>
    </div>
  );
}
