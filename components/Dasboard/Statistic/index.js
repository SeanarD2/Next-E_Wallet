import ArrowUP from "components/SVG/ArrowUpSVG";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
import axios from "utils/axios";
import {
  getIncomeExpense,
  getTransactionHistory,
  setTransferData,
} from "redux/action/transaction";
import { connect } from "react-redux";

function Statistic(props) {
  console.log(props, "STATISTIC");
  const { dataUserLogin } = props.user;
  // const { dashboard } = props.transaction;

  const [dataBalance, setDataBalance] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  const [labelExpense, setLabelExpense] = useState([]);
  const [listExpense, setListExpense] = useState([]);
  const [listIncome, setListIncome] = useState([]);
  const [labelIncome, setLabelIncome] = useState([]);

  useEffect(() => {
    console.log(labelIncome);
  }, [labelIncome]);

  // CHART CONFIG
  const data = {
    labels: [...labelIncome],

    datasets: [
      {
        id: 1,
        label: "Income This Week",
        data: [...listIncome],
        fill: false,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      },
      // {
      //   id: 2,
      //   label: "Income This Week",
      //   data: [...listExpense],
      //   fill: false,
      //   backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      //   borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      // },
    ],
  };

  // GET HISTORY
  const [dataHistory, setDataHistory] = useState([]);
  const getTransactionHistory = () => {
    axios
      .get("/transaction/history?page=1&limit=5&filter=WEEK")
      .then((res) => {
        console.log(res.data.data);
        setDataHistory(res.data.data);
        // setDataHistory([]);

        // console.log(res.data.data);
      })
      .catch((err) => {
        setDataHistory([]);
        err.response.data.msg;
      });
  };

  useEffect(() => {
    props.getIncomeExpense(dataUserLogin.id).then((res) => {
      console.log(res.value.data.data);
      setDataBalance(res.value.data.data);
      console.log("income Expense =>", res.value.data.data);

      let labelNewIncome = [];
      let newIncome = [];
      let labelNewExpense = [];
      let newExpense = [];
      res.value.data.data.listIncome.map((item) => {
        newIncome.push(item.total);
        labelNewIncome.push(item.day);
        console.log(item.day, item.total);
      });
      res.value.data.data.listExpense.map((item) => {
        newExpense.push(item.total);
        labelNewExpense.push(item.day);
        console.log(item.day, item.total);
      });

      setLabelIncome(labelNewIncome);
      setLabelExpense(labelNewExpense);
      setListExpense(newExpense);
      setListIncome(newIncome);
    });

    props
      .getTransactionHistory({ page: 1, filter: "WEEK" })
      .then((res) => {
        console.log(res.value.data.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="statistic-out row p-0 ps-lg-3 mt-3">
      <div className="statistic-box row p-4 col-lg-7 col-12 d-flex justify-content-between">
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
        <div className="col-lg-12 mt-5">
          <Bar data={data} />
        </div>
      </div>
      <div className="col-lg-5 col-12 my-3 my-lg-0 p-0 ps-lg-3 pe-lg-0">
        <div className="history-box p-4">
          <div className="col-12 d-flex justify-content-between">
            <span>Transaction History</span>

            <Link
              href="/history?filter=&page=1"
              style={{ textDecoration: "none" }}
            >
              See All
            </Link>
          </div>
          <div className="trans-history my-3">
            {props.transaction.history ? (
              props.transaction.history.map((item, index) => (
                <div
                  key={index}
                  className="history-list d-flex align-items-center justify-content-between my-3"
                >
                  <div className="d-flex text-truncate">
                    <div className="history-list__image-user me-3">
                      <img
                        src={
                          item.image
                            ? `${
                                process.env.STATUS === "dev"
                                  ? process.env.BE_DEV
                                  : process.env.BE_PROD
                              }/uploads/${item.image}`
                            : "/assets/image/default-profile.jpg"
                        }
                        alt="userProfiles"
                      />
                    </div>
                    <div className="history-list__details-user d-flex flex-column justify-content-evenly">
                      <span className="fw-700 fs-16 text-truncate ">
                        {`${item.firstName}`}
                      </span>
                      <span className="fw-400 fs-14">
                        {item.type === "send"
                          ? "Transfer"
                          : item.type === "topup"
                          ? "Topup"
                          : "Accept"}
                      </span>
                    </div>
                  </div>
                  <div
                    className="history-list__amount fw-700 fs-16 ms-2"
                    style={
                      item.type === "send" ||
                      (item.type === "topup" && item.status == "pending")
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
              <h1>Can`t Find Any Transaction History</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  transaction: state.transaction,
});
const mapDispatchToProps = {
  getIncomeExpense,
  getTransactionHistory,
  setTransferData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
