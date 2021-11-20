import ArrowUP from "components/SVG/ArrowUpSVG";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDataUser } from "redux/action/user";

function ChangePasswordComp(props) {
  const router = useRouter();
  const [dataUserLogin, setDataUserLogin] = useState(props.user.dataUserLogin);
  return (
    <div className="rpr">
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
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="sec-card p-4 my-4">
          <div className="fw-400 fs-16 color-gray86">First Name</div>
          <div className="fw-700 fs-22 color-gray5b">
            <input
              type="text"
              className="fw-700 fs-22 color-gray5b col-12"
              value={dataUserLogin.lastName}
              name="lastName"
              onChange={(event) =>
                setDataUserLogin({
                  ...dataUserLogin,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="sec-card p-4 my-4">
          <div className="fw-400 fs-16 color-gray86">Verified E-mail</div>
          <div className="fw-700 fs-22 color-gray5b">
            <input
              type="text"
              className="fw-700 fs-22 color-gray5b col-12"
              value={dataUserLogin.email}
              name="email"
              onChange={(event) =>
                setDataUserLogin({
                  ...dataUserLogin,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="sec-card p-4 my-4">
          <div className="fw-400 fs-16 color-gray86">Phone Number</div>
          <div className="fw-700 fs-22 color-gray5b">
            <input
              type="text"
              className="fw-700 fs-22 color-gray5b col-12"
              value={dataUserLogin.noTelp}
              name="noTelp"
              onChange={(event) =>
                setDataUserLogin({
                  ...dataUserLogin,
                  [event.target.name]: event.target.value,
                })
              }
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
