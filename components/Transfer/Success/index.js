import router from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setTransferData, checkPin } from "redux/action/transaction";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { getDataUser } from "redux/action/user";
import axios from "utils/axios";

function TransferSuccess(props) {
  const { dataReceiver } = props;

  const { dataUserLogin } = props.user;
  const { transferData } = props.transaction;

  const [btnDisable, setBtnDisable] = useState(false);

  const dateNow = new Date(Date.now());

  const backToHome = () => {
    props.getDataUser(props.user.dataUserLogin.id).then((res) => {
      router.push("/dashboard");
    });
  };

  const exportTrans = () => {
    axios
      .get(`export/transaction/${props.transaction.transferDataSuccess.id}`)
      .then((res) => {
        console.log(res.data.data.url);
        window.open(res.data.data.url, `_blank`);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="col-12 ps-lg-3 p-0 rpr">
        <div
          className="search-receiver__label p-4 rds-20 sec-card p-lg-4"
          style={{ height: "100%" }}
        >
          <div className="text-center d-flex flex-column justify-content-center align-items-center mt-4">
            <div className="check d-flex justify-content-center align-items-center">
              <img src="/assets/image/check.png" alt="" />
            </div>
            <div className="fw-700 fs-22">Transfer Success</div>
          </div>

          <div className="my-5">
            <span className="fs-18 fw-700 col-12">Details</span>

            <div className="sec-card p-4 d-flex flex-column justify-content-between my-3">
              <span className="color-gray86 fw-400 fs-16">Amount</span>
              <span className="fw-700 fs-22 color-gray5b">
                Rp {transferData.amount}
              </span>
            </div>

            <div className="sec-card p-4 d-flex flex-column justify-content-between my-3">
              <span className="color-gray86 fw-400 fs-16">Balance Left</span>
              <span className="fw-700 fs-22 color-gray5b">
                Rp {dataUserLogin.balance - transferData.amount}
              </span>
            </div>

            <div className="sec-card p-4 d-flex flex-column justify-content-between my-3">
              <span className="color-gray86 fw-400 fs-16">Date & Time</span>
              <span className="fw-700 fs-22 color-gray5b">
                {moment(dateNow).format("MMMM DD, YYYY - HH.mm")}
              </span>
            </div>

            <div className="sec-card p-4 d-flex flex-column justify-content-between mt-3 mb-5">
              <span className="color-gray86 fw-400 fs-16">Notes</span>
              <span className="fw-700 fs-22 color-gray5b ">
                {transferData.notes}
              </span>
            </div>

            <span className="fs-18 fw-700 col-12 my-5">Transfer To</span>

            <div className="history-list p-3 d-flex align-items-center my-5 sec-card p-lg-4">
              <div className="history-list__image-user">
                <img
                  src={
                    dataReceiver.image
                      ? `${
                          process.env.STATUS === "dev"
                            ? process.env.BE_DEV
                            : process.env.BE_PROD
                        }/uploads/${dataReceiver.image}`
                      : "/assets/image/default-profile.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="history-list__details-user d-flex flex-column justify-content-between ms-4">
                <span className="fw-700 fs-18 text-truncate color-gray57">
                  {`${dataReceiver.firstName} ${dataReceiver.lastName}`}
                </span>
                {dataReceiver.noTelp ? (
                  <span className="fw-400 fs-16 color-gray86">
                    {dataReceiver.noTelp}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="d-flex row justify-content-lg-end justify-content-between">
                <button
                  className={
                    "btn-export col-lg-3 col-12 py-3 my-2 color-prim px-lg-5 py-lg-3 mx-lg-2 rds-12 mt-2 fw-700 fs-18"
                  }
                  onClick={() => exportTrans()}
                >
                  Download PDF
                </button>
                <button
                  className={
                    "btn-enable col-lg-3 col-12 py-3 my-2 px-5 py-lg-3 mx-lg-2 rds-12 mt-2 fw-700 fs-18"
                  }
                  onClick={() => backToHome()}
                >
                  Back To Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  transaction: state.transaction,
});
const mapDispatchToProps = {
  setTransferData,
  checkPin,
  getDataUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferSuccess);
