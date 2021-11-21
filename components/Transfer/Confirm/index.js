import router from "next/router";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import axios from "utils/axios";
import {
  setTransferData,
  checkPin,
  doTransfer,
} from "redux/action/transaction";
import { getDataUser } from "redux/action/user";
import moment from "moment";
import { Modal, Button, ModalBody } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function Confirm(props) {
  const { dataReceiver } = props;

  const { dataUserLogin } = props.user;
  const { transferData } = props.transaction;
  const [transfer, setTransfer] = useState({
    receiverId: dataReceiver.id,
    amount: 0,
    notes: "",
  });

  const dateNow = new Date(Date.now());

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [pin, setPin] = useState({});
  const addPin = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const combinePin =
    pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
  const allPin = parseInt(combinePin);

  const cekPin = (event) => {
    event.preventDefault();
    props
      .checkPin(allPin)
      .then((res) => {
        props
          .doTransfer(props.transaction.transferData)
          .then((res) => {
            console.log(res.value);
            router.push(
              "/home/transfer/success",
              props.transaction.transferData
            );
          })
          .catch((err) => {});
      })
      .catch((err) => {
        // console.log(err.response);
        handleClose();
        toast.error(err.response.data.msg);
      });
  };

  return (
    <>
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleClose}
        // style={{ borderRadius: "25% !important" }}
        style={{ top: "10%", bottom: "10%" }}
        className="modal-confirm-pin"
      >
        <div className="p-3 rds-25p">
          <Modal.Header closeButton style={{ borderBottom: "none" }}>
            <div className="fw-700 fs-16">Enter PIN to Transfer</div>
          </Modal.Header>
          <Modal.Body style={{ borderBottom: "none" }}>
            <div className="fw-400 col-8">
              Enter your 6 digits PIN for confirmation to continue transferring
              money.{" "}
            </div>
            <form>
              <div className="input-pin my-5">
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-1"
                  name="1"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-2"
                  name="2"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-3"
                  name="3"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-4"
                  name="4"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-5"
                  onChange={(event) => addPin(event)}
                  name="5"
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-6"
                  name="6"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: "none" }}>
            <button
              className="px-5 btn-enable rds-12 py-3"
              variant="primary"
              onClick={(event) => cekPin(event)}
            >
              Continue
            </button>
          </Modal.Footer>
        </div>
      </Modal>
      <div className="col-12 rpr">
        <div
          className="search-receiver__label rds-20 sec-card p-lg-4"
          style={{ height: "100%" }}
        >
          <span className="fs-18 fw-700 col-12">Transfer To</span>

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

            <div className="sec-card p-4 d-flex flex-column justify-content-between my-3">
              <span className="color-gray86 fw-400 fs-16">Notes</span>
              <span className="fw-700 fs-22 color-gray5b">
                {transferData.notes}
              </span>
            </div>

            <div className="text-center">
              <div className="d-flex justify-content-end">
                <button
                  className={"btn-enable px-5 py-3 rds-12 mt-2"}
                  onClick={handleShow}
                >
                  Continue
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
  doTransfer,
  getDataUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
