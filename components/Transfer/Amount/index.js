import router from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setTransferData } from "redux/action/transaction";

function Amount(props) {
  const { dataReceiver } = props;
  const { dataUserLogin } = props.user;
  const [transfer, setTransfer] = useState({
    receiverId: dataReceiver.id,
    amount: 0,
    notes: "",
  });

  const [btnDisable, setBtnDisable] = useState(true);
  const changeAmount = (event) => {
    event.preventDefault();
    setTransfer({
      ...transfer,
      [event.target.name]: event.target.value,
    });
    if (
      event.target.value > 1000 &&
      event.target.value <= dataUserLogin.balance
    ) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(transfer);
    props.setTransferData(transfer);
    // console.log(props.transaction.transferData);
    router.push("/home/transfer/confirm");
  };

  return (
    <div className="col-12 rpr">
      <div
        className="search-receiver__label rds-20 sec-card p-lg-4"
        style={{ height: "100%" }}
      >
        <span className="fs-18 fw-700 col-12">Transfer Money</span>

        <div className="my-5">
          <div className="history-list d-flex align-items-center my-5 sec-card p-lg-4">
            <div className="history-list__image-user">
              <img
                src={
                  dataReceiver.image
                    ? `http://localhost:3001/uploads/${dataReceiver.image}`
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
          <div className="col-6 fw-400 fs-16 lh-28 mb-5">
            Type the amount you want to transfer and then press continue to the
            next steps.
          </div>

          <div className="text-center">
            <form onSubmit={(event) => handleSubmit(event)}>
              <input
                type="number"
                placeholder="1001"
                className="fs-42 fw-700 text-center amont-input"
                style={
                  transfer.amount > 1000 &&
                  transfer.amount <= dataUserLogin.balance
                    ? { color: "#6379F4" }
                    : { color: "#FF5B37" }
                }
                name="amount"
                onChange={(event) => changeAmount(event)}
              ></input>
              <p>Rp{dataUserLogin.balance} Available</p>
              <div className="text-center d-flex justify-content-center">
                <div
                  style={{
                    width: "50%",
                    borderBottom: "1.5px solid #A9A9A999",
                  }}
                  className="text-center pb-2"
                >
                  <img src="/assets/image/edit.svg" alt="" className="me-3" />
                  <input
                    name="notes"
                    onChange={(event) =>
                      setTransfer({
                        ...transfer,
                        [event.target.name]: event.target.value,
                      })
                    }
                    type="text"
                    style={{ border: "none", width: "80%" }}
                    placeholder="Add some notes"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className={
                    btnDisable
                      ? "btn-disable px-5 py-3 rds-12 mt-5"
                      : "btn-enable px-5 py-3 rds-12 mt-5"
                  }
                  disabled={btnDisable}
                >
                  Continue
                </button>
              </div>
            </form>
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
  setTransferData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Amount);
