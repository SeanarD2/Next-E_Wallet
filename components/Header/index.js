import React, { useState, useEffect } from "react";
import { getDataCookie } from "middleware/authPage";
import axios from "utils/axios";
import Cookie from "js-cookie";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  console.log(dataCookie + "DATAAAAAA");

  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const dataUser = await axios
    .get(`/user/profile/${dataCookie.id}`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      console.log("Then");
    })
    .catch((err) => {
      console.log("Catch");
    });
  return {
    props: { dataUser },
  };
}

export default function Header(props) {
  // console.log(props);
  const { firstName, lastName } = props;

  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    axios
      .get(`/user/profile/${Cookie.get("id")}`)
      .then((res) => {
        console.log(res.data.data);
        setDataUser(res.data.data);
      })
      .catch((err) => {
        setDataUser({});
        console.log(err.response.data.msg);
      });
  }, []);

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
                  dataUser.image
                    ? `${dataUser.image}`
                    : "/assets/image/default-profile.jpg"
                }
              />
            </div>
            <div className="user-info__name-numb">
              <span className="header__user-name fw-700 fs-18">
                {dataUser
                  ? dataUser.firstName + " " + dataUser.lastName
                  : "User Name"}
              </span>
              {dataUser.noTelp ? (
                <span className="header__user-numb fw-400 fs-13">
                  {dataUser.noTelp}
                </span>
              ) : (
                ""
              )}
            </div>
            <img src="/assets/image/home/icon/bell.png"></img>
          </div>
        </div>
      </div>
    </>
  );
}
