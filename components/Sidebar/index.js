import React, { useState, useEffct } from "react";
import GridSVG from "components/SVG/GridSVG";
import ArrowUpSVG from "components/SVG/ArrowUpSVG";
import PlusSVG from "components/SVG/PlusSVG";
import UserSVG from "components/SVG/UserSVG";
import LogoutSVG from "components/SVG/LogoutSVG";

export default function Sidebar() {
  return (
    <>
      <div className="side-box col-lg-3">
        <div className="side-content d-flex flex-column justify-content-between py-lg-5 px-lg-4">
          <div>
            <div className="side-content__dashboard mb-5 d-flex align-items-center">
              <GridSVG color={"#3A3D42CC"} />
              <span>Dashboard</span>
            </div>
            <div className="side-content__transfer mb-5 d-flex align-items-center">
              <ArrowUpSVG color={"#3A3D42CC"} />
              <span>Transfer</span>
            </div>
            <div className="side-content__topup mb-5 d-flex align-items-center">
              <PlusSVG color={"#3A3D42CC"} />
              <span>Top Up</span>
            </div>
            <div className="side-content__profile mb-5 d-flex align-items-center">
              <UserSVG color={"#3A3D42CC"} />
              <span>Profile</span>
            </div>
          </div>
          <div className="side-content__logout d-flex align-items-center">
            <LogoutSVG color={"#3A3D42CC"} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}
