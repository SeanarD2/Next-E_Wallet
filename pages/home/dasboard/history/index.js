import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { getDataCookie } from "middleware/authPage";
import axios from "utils/axios";
import { useRouter } from "next/router";
import {
  getIncomeExpense,
  getTransactionHistory,
  setTransferData,
} from "redux/action/transaction";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";

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

function DasboardHistory(props) {
  const router = useRouter();
  const [historyList, setHistoryList] = useState(props.historyList);
  const [page, setPage] = useState(1);

  const handleFilter = (event) => {
    router.push(`/history?filter=${event.target.value}&page=1`);
    // props
    //   .getTransactionHistory({ page: 1, filter: event.target.value })
    //   .then((res) => {
    //     console.log(res.value.data.data);
    //     setHistoryList(res.value.data.data);
    //   });
  };

  console.log(router.query);
  console.log(props.historyList);

  const handlePagination = (event) => {
    setPage(event.selected + 1);
    router.push(
      `/history?filter=${router.query.filter ? router.query.filter : ""}&page=${
        event.selected + 1
      }`
    );
  };

  console.log(router.query);

  useEffect(() => {
    props
      .getTransactionHistory({
        page: router.query.page,
        filter: router.query.filter,
      })
      .then((res) => {
        console.log(res.value.data.data);
        setHistoryList(res.value.data.data);
        setPage(res.value.data.pagination.totalPage);
      })
      .catch((err) => {
        toast.error(err.value.data.msg);
      });
  }, [router.query]);

  return (
    <>
      <ToastContainer />
      <Layout title="Dashboard | History">
        <div className="container">
          <div className="row rp">
            <Sidebar activePage="menu1" />
            <div className="row col-lg-9 rp">
              <div
                className="history-out p-0 ps-lg-3 rpr"
                style={{ height: "100%" }}
              >
                <div className="history-box p-4 p-lg-4">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <span className="fw-700 fs-18">Transaction History</span>
                    <select
                      onChange={(event) => handleFilter(event)}
                      className="hover-pointer px-4 py-2 history-filter d-flex justify-content-center fw-400 fs-13"
                    >
                      <option value="">--- Select Filter ---</option>
                      <option value="WEEK">WEEK</option>
                      <option value="MONTH">MONTH</option>
                      <option value="YEAR">YEAR</option>
                    </select>
                  </div>
                  {historyList ? (
                    historyList.map((item, index) => (
                      <div
                        key={index}
                        className="history-list d-flex align-items-center justify-content-between my-5"
                      >
                        <div className="col-9 d-flex">
                          <div className="history-list__image-user">
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
                              alt=""
                            />
                          </div>
                          <div className="ms-4 history-list__details-user d-flex flex-column justify-content-evenly col-9">
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
                        </div>
                        <div
                          className="history-list__amount fw-700 fs-16 color-green"
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
                    <h1>TEST</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Paginate
          previousLabel={null}
          nextLabel={null}
          breakLabel={"..."}
          pageCount={page}
          onPageChange={(event) => handlePagination(event)}
          containerClassName={"pagination"}
          disabledClassName={"pagination__disabled"}
          activeClassName={"pagination__active"}
          className="justify-content-center pagination d-flex align-items-center"
        />
      </Layout>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DasboardHistory);
