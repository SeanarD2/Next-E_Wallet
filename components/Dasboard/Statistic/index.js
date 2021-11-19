import ArrowUP from "components/SVG/ArrowUpSVG";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
import axios from "utils/axios";
import Cookie from "js-cookie";

export default function Statistic(props) {
  const { firstName, lastName } = props;

  const [dataBalance, setDataBalance] = useState({});
  const [labelExpense, setLabelExpense] = useState([]);
  const [listExpense, setListExpense] = useState([]);
  const [listIncome, setListIncome] = useState([]);

  useEffect(() => {
    axios
      .get(`/dashboard/${Cookie.get("id")}`)
      .then((res) => {
        console.log(res.data.data);
        setDataBalance(res.data.data);
      })
      .catch((err) => {
        setDataBalance({});
        console.log(err.response.data.msg);
      });

    getTransactionHistory();
  }, []);

  useEffect(() => {
    console.log(listExpense);
  }, [listExpense]);
  useEffect(() => {
    console.log(labelExpense);
  }, [labelExpense]);

  // CHART CONFIG
  const data = {
    labels: ["Jan", "Feb", "March", "April"],

    datasets: [
      {
        label: "Income This Month",
        data: [1, 2, 3, 1],
        fill: false,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      },
    ],
  };

  // GET HISTORY
  const [dataHistory, setDataHistory] = useState([]);
  const getTransactionHistory = () => {
    axios
      .get("/transaction/history?page=1&limit=2&filter=MONTH")
      .then((res) => {
        setDataHistory(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        setDataHistory([]);
        err.response.data.msg;
      });
  };

  return (
    <div className="statistic-out row rpr mt-3">
      <div className="statistic-box row p-4 col-lg-7 d-flex justify-content-between">
        <div className="col-12 d-flex justify-content-between">
          <div className="statistic-income">
            <div className="arrow-up-to-down text-start">
              <ArrowUP color="#1EC15F" />
            </div>
            <p className="fw-400 fs-14 my-lg-3">Income</p>
            <p className="fw-700 fs-18 my-lg-3">Rp{dataBalance.totalIncome}</p>
          </div>
          <div className="statistic-expense">
            <div>
              <ArrowUP color="#FF5B37" />
              <p className="fw-400 fs-14 my-lg-3">Expense</p>
              <p className="fw-700 fs-18 my-lg-3">
                Rp{dataBalance.totalExpense}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 mt-5">
          <Bar data={data} />
        </div>
      </div>
      <div className="col-5 rpr">
        <div className="history-box p-4">
          <div className="col-12 d-flex justify-content-between">
            <span>Transaction History</span>

            <Link
              href="/home/dasboard/history"
              style={{ textDecoration: "none" }}
            >
              See All
            </Link>
          </div>
          <div className="trans-history my-3">
            {dataHistory
              ? dataHistory.map((item, index) => (
                  <div
                    key={index}
                    className="history-list d-flex align-items-center justify-content-between"
                  >
                    <div className="history-list__image-user"></div>
                    <div className="history-list__details-user d-flex flex-column justify-content-evenly col-4">
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
  );
}
