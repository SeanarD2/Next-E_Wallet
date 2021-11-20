import router from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setTransferData, checkPin } from "redux/action/transaction";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { getDataUser } from "redux/action/user";

function TransferSuccess(props) {
  const { dataReceiver } = props;

  const { dataUserLogin } = props.user;
  const { transferData } = props.transaction;

  const [btnDisable, setBtnDisable] = useState(false);

  const dateNow = new Date(Date.now());

  const backToHome = () => {
    props.getDataUser(props.user.dataUserLogin.id).then((res) => {
      router.push("/home/dasboard");
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="col-12 rpr">
        <div
          className="search-receiver__label rds-20 sec-card p-lg-4"
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
                {moment(dateNow).format("MMMM DD, YYYY - hh.mm")}
              </span>
            </div>

            <div className="sec-card p-4 d-flex flex-column justify-content-between mt-3 mb-5">
              <span className="color-gray86 fw-400 fs-16">Notes</span>
              <span className="fw-700 fs-22 color-gray5b ">
                {transferData.notes}
              </span>
            </div>

            <span className="fs-18 fw-700 col-12 my-5">Transfer To</span>

            <div className="history-list d-flex align-items-center my-5 sec-card p-lg-4">
              <div className="history-list__image-user">
                <img
                  src={
                    dataReceiver.image
                      ? "http://localhost:3001"
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
              <div className="d-flex justify-content-end">
                <button
                  className={"btn-enable px-5 py-3 rds-12 mt-2 fw-700 fs-18"}
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
