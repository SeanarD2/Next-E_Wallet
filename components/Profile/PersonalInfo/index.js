import ArrowUP from "components/SVG/ArrowUpSVG";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getDataUser, updateDataUser } from "redux/action/user";
import Link from "next/link";

function PersonalInfo(props) {
  const router = useRouter();
  const [dataUserLogin, setDataUserLogin] = useState(props.user.dataUserLogin);

  const handeChangeText = (event) => {
    setDataUserLogin({
      ...dataUserLogin,
      [event.target.name]: event.target.value,
    });
    console.log(dataUserLogin);
  };

  const handleUpdateData = (event) => {
    if (event.key === "Enter") {
      props
        .updateDataUser({
          id: dataUserLogin.id,
          firstName: dataUserLogin.firstName,
          lastName: dataUserLogin.lastName,
        })
        .then((res) => {
          props.getDataUser(dataUserLogin.id).then((res) => {
            console.log(res);
          });

          toast.success(res.value.data.msg);
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="rpr">
      <ToastContainer />
      <div
        className="profile-menu__cont  bg-white rpr p-4"
        style={{ height: "100%" }}
      >
        <div className="fw-700 fs-18 ">Personal Information</div>
        <div className="col-12 my-4">
          <div className="fw-400 fs-16 color-gray86 col-6">
            We got your personal information from the sign up proccess. If you
            want to make changes on your information, contact our support.
          </div>
        </div>
        <div className="sec-card p-4 my-4">
          <div className="fw-400 fs-16 color-gray86">First Name</div>
          <div className="fw-700 fs-22 color-gray5b">
            <input
              type="text"
              className="fw-700 fs-22 color-gray5b col-12"
              value={dataUserLogin.firstName}
              name="firstName"
              onChange={(event) =>
                setDataUserLogin({
                  ...dataUserLogin,
                  firstName: event.target.value,
                })
              }
              onKeyPress={(event) => handleUpdateData(event)}
            />
          </div>
        </div>

        <div className="sec-card p-4 my-4">
          <div className="fw-400 fs-16 color-gray86">Last Name</div>
          <div className="fw-700 fs-22 color-gray5b">
            <input
              type="text"
              className="fw-700 fs-22 color-gray5b col-12"
              value={dataUserLogin.lastName}
              name="lastName"
              onChange={(event) =>
                setDataUserLogin({
                  ...dataUserLogin,
                  lastName: event.target.value,
                })
              }
              onKeyPress={(event) => handleUpdateData(event)}
            />
          </div>
        </div>

        <div className="sec-card p-4 my-4">
          <div className="fw-400 fs-16 color-gray86">Verified E-mail</div>
          <div className="fw-700 fs-22 color-gray5b">
            <span className="fw-700 fs-22 color-gray5b col-12">
              {dataUserLogin.email}
            </span>
          </div>
        </div>

        <div className="sec-card p-4 my-4 d-flex justify-content-between align-items-center">
          <div className="">
            <div className="fw-400 fs-16 color-gray86">Phone Number</div>
            <div className="fw-700 fs-22 color-gray5b">
              <span className="fw-700 fs-22 color-gray5b col-12">
                {dataUserLogin.noTelp}
              </span>
            </div>
          </div>
          <div className="" style={{ color: "#6379F4" }}>
            <Link
              href="/home/profile/phone-number"
              style={{ color: "#6379F4" }}
            >
              Manage
            </Link>
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
  updateDataUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
