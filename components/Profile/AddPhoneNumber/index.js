import ArrowUP from "components/SVG/ArrowUpSVG";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";
import { getDataUser, changePass } from "redux/action/user";

function AddPhoneNumber(props) {
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

  const [btnDisable, setBtnDisable] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(
    props.user.dataUserLogin.noTelp
      ? parseInt(
          props.user.dataUserLogin.noTelp.slice(4, 18).split(" ").join("")
        )
      : ""
  );

  useEffect(() => {
    props.user.dataUserLogin.noTelp
      ? setPhoneNumber(
          props.user.dataUserLogin.noTelp.slice(4, 18).split(" ").join("")
        )
      : null;
  }, [props.user.dataUserLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noTelp = `+62 ${phoneNumber.slice(0, 4)} ${phoneNumber.slice(
      4,
      8
    )} ${phoneNumber.slice(8, 12)}`;

    axios
      .patch(`/user/profile/${props.user.dataUserLogin.id}`, {
        noTelp: phoneNumber ? noTelp : "",
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.msg);
        props.getDataUser(props.user.dataUserLogin.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="rpr">
      <ToastContainer />
      <div
        className="profile-menu__cont  bg-white rpr p-4"
        style={{ height: "100%" }}
      >
        <div className="fw-700 fs-18 ">Add Phone Number</div>
        <div className="col-12 my-4 mb-5">
          <div className="fw-400 fs-16 color-gray86 col-6 mb-5">
            Add at least one phone number for the transfer ID so you can start
            transfering your money to another user.
          </div>
        </div>
        <form>
          <div className="col-12 row d-flex justify-content-center mt-5">
            <div
              className="col-7 d-flex justify-content-center align-items-center pb-2 my-4"
              style={{ borderBottom: "1.5px solid #A9A9A999" }}
            >
              <img
                src="/assets/image/phone.png"
                alt=""
                style={{
                  width: "24px",
                  height: "24px",
                }}
                className="me-3 rds-0"
              />

              <span className="fw-600 fs-16 me-2">+62</span>

              <input
                className="fw-400 fs-16"
                autoComplete="off"
                type="number"
                placeholder="Enter your phone number"
                style={{ width: "100%" }}
                name="phoneNumber"
                value={phoneNumber}
                maxLength="12"
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>

            <button
              className={
                btnDisable
                  ? "btn-disable col-7 px-5 py-3 rds-12 mt-5"
                  : "btn-enable col-7 px-5 py-3 rds-12 mt-5"
              }
              onClick={(event) => handleSubmit(event)}
              disabled={btnDisable}
            >
              Update Phone Number
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoneNumber);
