import ArrowUP from "components/SVG/ArrowUpSVG";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getDataUser, changePass } from "redux/action/user";

function ChangePasswordComp(props) {
  const router = useRouter();
  const [idUser, setIdUser] = useState(props.user.dataUserLogin.id);

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfNewPass, setConfNewPass] = useState(false);

  const [dataNewPass, setDataNewPass] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    console.log(
      dataNewPass.oldPassword,
      dataNewPass.newPassword,
      dataNewPass.confirmPassword
    );
    if (
      dataNewPass.oldPassword &&
      dataNewPass.newPassword &&
      dataNewPass.confirmPassword
    ) {
      setBtnDisable(false);
      console.log(btnDisable);
    } else {
      setBtnDisable(true);
      console.log(btnDisable);
    }
  }, [dataNewPass]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({...dataNewPass, id:idUser});
    setBtnDisable(true);

    props
      .changePass({ ...dataNewPass, id: idUser })
      .then((res) => {
        toast.success(res.value.data.msg);

        setDataNewPass({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        setDataNewPass({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        console.log(err.response.data.msg);
        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="p-0 ps-lg-3">
      <ToastContainer />
      <div
        className="profile-menu__cont  bg-white rpr p-4"
        style={{ height: "100%" }}
      >
        <div className="fw-700 fs-18 ">Change Password</div>
        <div className="col-12 my-4 mb-5">
          <div className="fw-400 fs-16 color-gray86 col-lg-6 col-12 mb-5">
            You must enter your current password and then type your new password
            twice.
          </div>
        </div>
        <form>
          <div className="col-12 row d-flex justify-content-center mt-5">
            <div
              className="col-lg-7 col-12 d-flex justify-content-center align-items-center pb-2 my-4"
              style={{ borderBottom: "1.5px solid #A9A9A999" }}
            >
              <img
                src="/assets/image/loginPage/icon/lock.png"
                alt=""
                style={{ width: "24px", height: "24px" }}
                className="me-3"
              />
              <input
                autoComplete="off"
                type={showCurrentPass ? "text" : "password"}
                placeholder="Current password"
                style={{ width: "100%" }}
                name="oldPassword"
                value={dataNewPass.oldPassword}
                onChange={(event) =>
                  setDataNewPass({
                    ...dataNewPass,
                    [event.target.name]: event.target.value,
                  })
                }
              />
              <img
                src="/assets/image/loginPage/icon/eye.png"
                alt=""
                style={{ width: "20px", height: "20px" }}
                className="ms-3"
                onClick={
                  showCurrentPass
                    ? () => setShowCurrentPass(false)
                    : () => setShowCurrentPass(true)
                }
              />
            </div>

            <div
              className="col-lg-7 col-12 d-flex justify-content-center align-items-center pb-2 my-4"
              style={{ borderBottom: "1.5px solid #A9A9A999" }}
            >
              <img
                src="/assets/image/loginPage/icon/lock.png"
                alt=""
                style={{ width: "24px", height: "24px" }}
                className="me-3"
              />
              <input
                autoComplete="off"
                type={showNewPass ? "text" : "password"}
                placeholder="New Password"
                style={{ width: "100%" }}
                name="newPassword"
                value={dataNewPass.newPassword}
                onChange={(event) =>
                  setDataNewPass({
                    ...dataNewPass,
                    [event.target.name]: event.target.value,
                  })
                }
              />
              <img
                src="/assets/image/loginPage/icon/eye.png"
                alt=""
                style={{ width: "20px", height: "20px" }}
                className="ms-3"
                onClick={
                  showNewPass
                    ? () => setShowNewPass(false)
                    : () => setShowNewPass(true)
                }
              />
            </div>

            <div
              className="col-lg-7 col-12 d-flex justify-content-center align-items-center pb-2 my-4"
              style={{ borderBottom: "1.5px solid #A9A9A999" }}
            >
              <img
                src="/assets/image/loginPage/icon/lock.png"
                alt=""
                style={{ width: "24px", height: "24px" }}
                className="me-3"
              />
              <input
                autoComplete="off"
                type={showConfNewPass ? "text" : "password"}
                placeholder="Current password"
                style={{ width: "100%" }}
                name="confirmPassword"
                value={dataNewPass.confirmPassword}
                onChange={(event) =>
                  setDataNewPass({
                    ...dataNewPass,
                    [event.target.name]: event.target.value,
                  })
                }
              />
              <img
                src="/assets/image/loginPage/icon/eye.png"
                alt=""
                style={{ width: "20px", height: "20px" }}
                className="ms-3"
                onClick={
                  showConfNewPass
                    ? () => setConfNewPass(false)
                    : () => setConfNewPass(true)
                }
              />
            </div>

            <button
              className={
                btnDisable
                  ? "btn-disable col-lg-7 col-12 px-5 py-3 rds-12 mt-5"
                  : "btn-enable col-lg-7 col-12 px-5 py-3 rds-12 mt-5"
              }
              onClick={(event) => handleSubmit(event)}
              disabled={btnDisable}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  getDataUser,
  changePass,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordComp);
