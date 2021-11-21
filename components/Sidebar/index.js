import React, { useState, useEffct } from "react";
import GridSVG from "components/SVG/GridSVG";
import ArrowUpSVG from "components/SVG/ArrowUpSVG";
import PlusSVG from "components/SVG/PlusSVG";
import UserSVG from "components/SVG/UserSVG";
import LogoutSVG from "components/SVG/LogoutSVG";
import Link from "next/link";
import router from "next/router";
import Cookie from "js-cookie";
import { Modal, Button } from "react-bootstrap";
import axios from "utils/axios";

export default function Sidebar(props) {
  const [active, setActive] = useState(props.activePage);
  const [hover, setHover] = useState("");

  const [showLogout, setShowLogout] = useState(false);

  const setCloseOut = () => setShowLogout(false);
  const setShowOut = () => setShowLogout(true);

  const handleChangePage = (page) => {
    setActive(page);
  };

  const toDashboardPage = () => {
    handleChangePage("menu1");
    router.push("/dashboard");
  };

  const toTransverPage = () => {
    handleChangePage("menu2");
    router.push("/transfer?search=&page=1");
  };

  const toProfile = () => {
    handleChangePage("menu4");
    router.push("/home/profile");
  };

  const handleLogout = () => {
    handleChangePage("menu5");
    Cookie.remove("id");
    Cookie.remove("token");
    Cookie.remove("receiverId");
    router.push("/login");
    axios.post(`/auth/logout`);
  };

  const handleTopUp = () => {
    handleChangePage("menu3");
    handleShow();
  };

  const mouseOver = (page) => {
    setHover(page);
  };

  const mouseOut = () => {
    setHover("");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [amount, setAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault;
    axios.post(`/transaction/top-up`, { amount: amount }).then((res) => {
      console.log(res.data);
      window.open(res.data.data.redirectUrl);
      handleClose();
    });
  };

  return (
    <>
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
            <div className="fw-400 col-8 color-gray5b">
              Enter the amount of money, and click submit
            </div>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="input-gray text-center px-5 py-2 mt-5 fs-24 color-prim fw-600"
            ></input>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: "none" }}>
            <button
              className="px-5 btn-enable rds-12 py-3"
              variant="primary"
              onClick={(event) => handleSubmit(event)}
            >
              Submit
            </button>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal show={showLogout} onHide={setCloseOut}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to Logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setCloseOut}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="side-box rp d-none d-lg-block col-lg-3">
        <div className="side-content d-flex flex-column justify-content-between py-lg-5 pe-lg-4">
          <div>
            <div
              className="hover-pointer side-content__dashboard mb-5 d-flex align-items-center"
              onClick={() => toDashboardPage()}
              onMouseOver={() => mouseOver("menu1")}
              onMouseOut={() => mouseOut("menu1")}
              style={
                active === "menu1" ? { borderLeft: "5px solid #6379F4" } : null
              }
            >
              <span className="ms-4">
                <GridSVG
                  color={
                    active === "menu1"
                      ? "#6379F4"
                      : hover === "menu1"
                      ? "#8591d4"
                      : "rgba(58, 61, 66, 0.8)"
                  }
                />
              </span>
              <span
                style={
                  active === "menu1"
                    ? { color: "#6379F4" }
                    : hover === "menu1"
                    ? { color: "#8591d4" }
                    : { color: "rgba(58, 61, 66, 0.8)" }
                }
              >
                Dashboard
              </span>
            </div>
            <div
              className="hover-pointer side-content__transfer mb-5 d-flex align-items-center"
              onClick={() => toTransverPage()}
              onMouseOver={() => mouseOver("menu2")}
              onMouseOut={() => mouseOut("menu2")}
              style={
                active === "menu2" ? { borderLeft: "5px solid #6379F4" } : null
              }
            >
              <span className="ms-4">
                <ArrowUpSVG
                  color={
                    active === "menu2"
                      ? "#6379F4"
                      : hover === "menu2"
                      ? "#8591d4"
                      : "rgba(58, 61, 66, 0.8)"
                  }
                />
              </span>
              <span
                style={
                  active === "menu2"
                    ? { color: "#6379F4" }
                    : hover === "menu2"
                    ? { color: "#8591d4" }
                    : { color: "rgba(58, 61, 66, 0.8)" }
                }
              >
                Transfer
              </span>
            </div>
            <div
              className="hover-pointer side-content__topup  mb-5 d-flex align-items-center"
              onClick={() => handleTopUp()}
              onMouseOver={() => mouseOver("menu3")}
              onMouseOut={() => mouseOut("menu3")}
              style={
                active === "menu3" ? { borderLeft: "5px solid #6379F4" } : null
              }
            >
              <span className="ms-4">
                <PlusSVG
                  color={
                    active === "menu3"
                      ? "#6379F4"
                      : hover === "menu3"
                      ? "#8591d4"
                      : "rgba(58, 61, 66, 0.8)"
                  }
                />
              </span>
              <span
                style={
                  active === "menu3"
                    ? { color: "#6379F4" }
                    : hover === "menu3"
                    ? { color: "#8591d4" }
                    : { color: "rgba(58, 61, 66, 0.8)" }
                }
              >
                Top Up
              </span>
            </div>
            <div
              className="hover-pointer side-content__profile mb-5 d-flex align-items-center"
              onClick={() => toProfile()}
              onMouseOver={() => mouseOver("menu4")}
              onMouseOut={() => mouseOut("menu4")}
              style={
                active === "menu4" ? { borderLeft: "5px solid #6379F4" } : null
              }
            >
              <span className="ms-4">
                <UserSVG
                  color={
                    active === "menu4"
                      ? "#6379F4"
                      : hover === "menu4"
                      ? "#8591d4"
                      : "rgba(58, 61, 66, 0.8)"
                  }
                />
              </span>
              <span
                style={
                  active === "menu4"
                    ? { color: "#6379F4" }
                    : hover === "menu4"
                    ? { color: "#8591d4" }
                    : { color: "rgba(58, 61, 66, 0.8)" }
                }
              >
                Profile
              </span>
            </div>
          </div>
          <div
            className="hover-pointer side-content__logout d-flex align-items-center"
            onClick={() => setShowOut()}
            onMouseOver={() => mouseOver("menu5")}
            onMouseOut={() => mouseOut("menu5")}
          >
            <span className="ms-4">
              <LogoutSVG
                color={
                  active === "menu5"
                    ? "#6379F4"
                    : hover === "menu5"
                    ? "#8591d4"
                    : "rgba(58, 61, 66, 0.8)"
                }
              />
            </span>
            <span
              style={
                active === "menu5"
                  ? { color: "#6379F4" }
                  : hover === "menu5"
                  ? { color: "#8591d4" }
                  : { color: "rgba(58, 61, 66, 0.8)" }
              }
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
