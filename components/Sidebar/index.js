import React, { useState, useEffct } from "react";
import GridSVG from "components/SVG/GridSVG";
import ArrowUpSVG from "components/SVG/ArrowUpSVG";
import PlusSVG from "components/SVG/PlusSVG";
import UserSVG from "components/SVG/UserSVG";
import LogoutSVG from "components/SVG/LogoutSVG";
import Link from "next/link";
import router from "next/router";
import Cookie from "js-cookie";

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

  const mouseOver = (page) => {
    setHover(page);
  };

  const mouseOut = () => {
    setHover("");
  };
  return (
    <>
      <div className="side-box col-lg-3">
        <div className="side-content d-flex flex-column justify-content-between py-lg-5 px-lg-4">
          <div>
            <div
              className="side-content__dashboard mb-5 d-flex align-items-center"
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
              className="side-content__transfer mb-5 d-flex align-items-center"
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
              className="side-content__topup mb-5 d-flex align-items-center"
              onClick={() => handleChangePage("menu3")}
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
              className="side-content__profile mb-5 d-flex align-items-center"
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
            className="side-content__logout d-flex align-items-center"
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
