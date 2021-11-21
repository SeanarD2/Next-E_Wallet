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

export default function Sidebar(props) {
  const [active, setActive] = useState(props.activePage);
  const [hover, setHover] = useState("");

  const handleChangePage = (page) => {
    setActive(page);
  };

  const toDashboardPage = () => {
    handleChangePage("menu2");
    router.push("/home/dasboard");
  };

  const toTransverPage = () => {
    handleChangePage("menu2");
    router.push("/home/transfer?search=&page=1");
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
            <input className="input-gray text-center px-5 py-2 mt-5 fs-24 color-prim fw-600"></input>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: "none" }}>
            <button
              className="px-5 btn-enable rds-12 py-3"
              variant="primary"
              onClick={(event) => cekPin(event)}
            >
              Submit
            </button>
          </Modal.Footer>
        </div>
      </Modal>
      <div className="side-box col-lg-3">
        <div className="side-content d-flex flex-column justify-content-between py-lg-5 px-lg-4">
          <div>
            <div
              className="hover-pointer side-content__dashboard mb-5 d-flex align-items-center"
              onClick={() => toDashboardPage()}
              onMouseOver={() => mouseOver("menu1")}
              onMouseOut={() => mouseOut("menu1")}
            >
              <GridSVG
                color={
                  active === "menu1"
                    ? "#6379F4"
                    : hover === "menu1"
                    ? "#8591d4"
                    : "rgba(58, 61, 66, 0.8)"
                }
              />
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
            >
              <ArrowUpSVG
                color={
                  active === "menu2"
                    ? "#6379F4"
                    : hover === "menu2"
                    ? "#8591d4"
                    : "rgba(58, 61, 66, 0.8)"
                }
              />
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
              className="hover-pointer side-content__topup mb-5 d-flex align-items-center"
              onClick={() => handleTopUp()}
              onMouseOver={() => mouseOver("menu3")}
              onMouseOut={() => mouseOut("menu3")}
            >
              <PlusSVG
                color={
                  active === "menu3"
                    ? "#6379F4"
                    : hover === "menu3"
                    ? "#8591d4"
                    : "rgba(58, 61, 66, 0.8)"
                }
              />
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
            >
              <UserSVG
                color={
                  active === "menu4"
                    ? "#6379F4"
                    : hover === "menu4"
                    ? "#8591d4"
                    : "rgba(58, 61, 66, 0.8)"
                }
              />
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
            onClick={() => handleLogout()}
            onMouseOver={() => mouseOver("menu5")}
            onMouseOut={() => mouseOut("menu5")}
          >
            <LogoutSVG
              color={
                active === "menu5"
                  ? "#6379F4"
                  : hover === "menu5"
                  ? "#8591d4"
                  : "rgba(58, 61, 66, 0.8)"
              }
            />
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
