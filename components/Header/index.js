import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

function Header(props) {
  // console.log(props.user.dataUserLogin, "HEADER");
  const { dataUserLogin } = props.user;
  return (
    <>
      <div className="header-box">
        <div className="container header-content">
          <img
            src="/assets/image/home/Zwallet.png"
            alt="Z-Wallet Logo"
            className="header-logo"
          />
          <div className="header__user-info">
            <div className="user-img">
              <img
                src={
                  dataUserLogin.image
                    ? `${dataUserLogin.image}`
                    : "/assets/image/default-profile.jpg"
                }
                alt=""
              />
            </div>
            <div className="user-info__name-numb">
              <span className="header__user-name fw-700 fs-18">
                {dataUserLogin
                  ? dataUserLogin.firstName + " " + dataUserLogin.lastName
                  : "User Name"}
              </span>
              {dataUserLogin.noTelp ? (
                <span className="header__user-numb fw-400 fs-13">
                  {dataUserLogin.noTelp}
                </span>
              ) : (
                ""
              )}
            </div>
            <img src="/assets/image/home/icon/bell.png" alt=""></img>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
