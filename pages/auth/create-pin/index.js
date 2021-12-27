import React, { useEffect, useState } from "react";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { getDataCookie } from "middleware/authPage";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Head from "next/head";
import { connect } from "react-redux";
import { updatePin } from "redux/action/user";

// ROUTING
export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

function CreatePin(props) {
  const router = useRouter();

  const [pin, setPin] = useState({});
  const [btnDisable, setBtnDisable] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setBtnDisable(true);

    const combinePin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    const allPin = parseInt(combinePin);

    props
      .updatePin({ id: props.user.dataUserLogin.id, pin: allPin })
      .then((res) => {
        console.log(res);
        router.push("/auth/create-pin/success");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Z-Wallet | Create Pin</title>
      </Head>
      <div className="container-fluid d-flex rp">
        <div className="login-left-side d-lg-flex d-none justify-content-center">
          <div className="color-white login-left-side__content">
            <h3>Zwallet</h3>
            <img src="../assets/image/loginPage/2phone.png" />
            <h3 className="my-4">App that Covering Banking Needs.</h3>
            <p className="zwalet-desc">
              Zwallet is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Zwallet everyday with worldwide
              users coverage.
            </p>
          </div>
        </div>

        <div className="login-right-side pr-lg-5 p-4 p-lg-5 text-start">
          <div className="text-center d-block d-lg-none my-4">
            <img src="/assets/image/home/Zwallet.png" alt="" />
          </div>
          <h3 className="text-start f-nunito-sans fs-24 fw-700 login-title my-4 right-side__text-header">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h3>
          <p className="my-4">
            Create 6 digits pin to secure all your money and your data in
            Zwallet app. Keep it secret and don’t tell anyone about your Zwallet
            account password and the PIN.
          </p>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="input-pin my-5">
              <input
                className="pinForm p-2 text-center fw-700 fs-30 rds-12"
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

            <button
              type="submit"
              className={
                pin
                  ? "btn btn-enable col-12 py-3"
                  : "btn btn-disable col-12 py-3"
              }
              disabled={btnDisable}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  updatePin,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePin);
