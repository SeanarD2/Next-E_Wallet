import ArrowUP from "components/SVG/ArrowUpSVG";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDataUser } from "redux/action/user";

function ProfileComp(props) {
  const router = useRouter();
  const { dataUserLogin } = props.user;
  return (
    <div className="rpr">
      <div
        className="profile-menu__cont  text-center bg-white rpr p-4"
        style={{ height: "100%" }}
      >
        <img
          src={
            dataUserLogin.image
              ? `http://localhost:3001/uploads/${dataUserLogin.image}`
              : "/assets/image/default-profile.jpg"
          }
          alt=""
          className="mt-5"
        />
        <div className="text-center my-3 d-flex align-items-center justify-content-center">
          {/* <img className="edit-picture__pen" src="/assets/image/edit.png" alt="" /> */}
          <span className="fw-400 fs-16 color-gray86">Edit</span>
        </div>
        <div className="fw-700 fs-24 color-gray57">
          {dataUserLogin.firstName + " " + dataUserLogin.lastName}
        </div>
        <div className="fw-400 fs-16 mt-3 color-gray86">
          {dataUserLogin.noTelp}
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="menuEditProfile col-6 my-4 ">
            <div
              onClick={() => router.push("/home/profile/personal-info")}
              className="edit-menu__personal-info my-4 rds-10 p-3 bg-8ed d-flex justify-content-between align-items-center"
            >
              <span className="fw-700 fs-16 color-gray57">
                Personal Information
              </span>
              <img
                src="/assets/image/sidebar/arrow-up.svg"
                alt=""
                className="rotate90"
                style={{ width: "28px", height: "28px" }}
              />
            </div>

            <div
              onClick={() => router.push("/home/profile/change-password")}
              className="edit-menu__personal-info my-4 rds-10 p-3 bg-8ed d-flex justify-content-between align-items-center"
            >
              <span className="fw-700 fs-16 color-gray57">Change Password</span>
              <img
                src="/assets/image/sidebar/arrow-up.svg"
                alt=""
                className="rotate90"
                style={{ width: "28px", height: "28px" }}
              />
            </div>

            <div
              onClick={() => router.push("/home/profile/change-pin")}
              className="edit-menu__personal-info my-4 rds-10 p-3 bg-8ed d-flex justify-content-between align-items-center"
            >
              <span className="fw-700 fs-16 color-gray57">Change PIN</span>
              <img
                src="/assets/image/sidebar/arrow-up.svg"
                alt=""
                className="rotate90"
                style={{ width: "28px", height: "28px" }}
              />
            </div>

            <div className="edit-menu__personal-info my-4 rds-10 p-3 bg-8ed d-flex justify-content-start align-items-center">
              <span className="fw-700 fs-16 color-gray57">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  getDataUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComp);
