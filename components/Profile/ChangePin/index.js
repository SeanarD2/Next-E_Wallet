import ArrowUP from "components/SVG/ArrowUpSVG";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { checkPin } from "redux/action/transaction";
import { getDataUser, changePass } from "redux/action/user";

function ChangeNewPin(props) {
  const router = useRouter();
  const [idUser, setIdUser] = useState(props.user.dataUserLogin.id);

  const [btnDisable, setBtnDisable] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    setBtnDisable(true);
    cekPin();
  };

  const [pin, setPin] = useState({});
  const addPin = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  useEffect(() => {
    pin.pin1 !== undefined &&
    pin.pin2 !== undefined &&
    pin.pin3 !== undefined &&
    pin.pin4 !== undefined &&
    pin.pin5 !== undefined &&
    pin.pin6 !== undefined
      ? setBtnDisable(false)
      : setBtnDisable(true);
  }, [pin]);

  const combinePin =
    pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
  const allPin = parseInt(combinePin);

  const cekPin = () => {
    setBtnDisable(true);
    props
      .checkPin(allPin)
      .then((res) => {
        setBtnDisable(false);
        router.push("/home/profile/change-pin/create-new");
      })
      .catch((err) => {
        setBtnDisable(false);
        document.getElementById(`pin-1`).value = "";
        document.getElementById(`pin-2`).value = "";
        document.getElementById(`pin-3`).value = "";
        document.getElementById(`pin-4`).value = "";
        document.getElementById(`pin-5`).value = "";
        document.getElementById(`pin-6`).value = "";

        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="rpr">
      <ToastContainer />
      <div
        className="profile-menu__cont  bg-white rpr p-4"
        style={{ height: "100%", minHeight: "600px" }}
      >
        <div className="fw-700 fs-18 ">Change PIN</div>
        <div className="col-12 my-4 mb-5">
          <div className="fw-400 fs-16 color-gray86 col-lg-6 col-12 mb-5">
            Enter your current 6 digits Zwallet PIN below to continue to the
            next steps.
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <div className="col-lg-8 col-12 ">
            <form>
              <div className="input-pin my-5">
                <input
                  className="pinForm py-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-1"
                  name="1"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-2"
                  name="2"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-3"
                  name="3"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-4"
                  name="4"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-5"
                  onChange={(event) => addPin(event)}
                  name="5"
                  type="number"
                ></input>
                <input
                  className="pinForm p-2 text-center fw-700 fs-30 rds-12"
                  maxLength="1"
                  id="pin-6"
                  name="6"
                  onChange={(event) => addPin(event)}
                  type="number"
                ></input>
              </div>
              <div className="col-12 row d-flex justify-content-center mt-5">
                <button
                  className={
                    btnDisable
                      ? "btn-disable col-12 px-5 py-3 rds-12 mt-5"
                      : "btn-enable col-12 px-5 py-3 rds-12 mt-5"
                  }
                  onClick={(event) => handleSubmit(event)}
                  disabled={btnDisable}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  transaction: state.transaction,
});
const mapDispatchToProps = {
  getDataUser,
  changePass,
  checkPin,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeNewPin);
