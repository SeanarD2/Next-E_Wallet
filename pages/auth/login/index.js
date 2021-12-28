import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { getDataCookie } from "middleware/authPage";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Head from "next/head";
import { login } from "redux/action/auth";
import { connect } from "react-redux";
import { getDataUser } from "redux/action/user";

// ROUTING
export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/home/dasboard",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

function Login(props) {
  console.log(props);

  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    setBtnDisable(true);
    props
      .login(form)
      .then((res) => {
        console.log(res);
        Cookie.set("token", res.value.data.data.token);
        Cookie.set("id", res.value.data.data.id);
        Cookie.set("refresh", res.value.data.data.token);

        props
          .getDataUser(Cookie.get("id"))
          .then((res) => {
            console.log(res.value.data);
            setBtnDisable(false);
          })
          .catch((err) => {
            console.log(err.value);
          });

        console.log(res.value.data.data.pin);
        !res.value.data.data.pin
          ? router.push("/create-pin")
          : router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setBtnDisable(false);
      });
    // axios
    //   .post("/auth/login", form)
    //   .then((res) => {
    //     // console.log(res.data.data);
    //     Cookie.set("token", res.data.data.token);
    //     Cookie.set("id", res.data.data.id);

    //     router.push("/");
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.msg);
    //     setBtnDisable(false);
    //   });
  };

  useEffect(() => {
    props.auth.isError ? toast.error(props.auth.msg) : null;
  }, [props.auth.isError]);

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // TODO SHOW PASSWORD
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    showPass ? setShowPass(false) : setShowPass(true);
  };

  const errMsg = (event, msg) => {
    event.preventDefault();
    toast.error(msg);
  };

  // TODO DISABLE BTN
  const [btnDisable, setBtnDisable] = useState(false);

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Z-Wallet | Login</title>
      </Head>
      <div className="container-fluid d-flex rp">
        <div className="login-left-side d-lg-flex d-none justify-content-center">
          <div className="color-white login-left-side__content">
            <h3>Zwallet</h3>
            <img src="../assets/image/loginPage/2phone.png" alt="" />
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
          <div className="text-center d-block d-lg-none mt-5 mb-5">
            <img src="/assets/image/home/Zwallet.png" alt="" />
          </div>
          <h3 className="text-start f-nunito-sans fs-24 fw-700 login-title my-4 right-side__text-header">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h3>
          <p className="my-4">
            Transfering money is eassier than ever, you can access Zwallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>
          <form
            onSubmit={
              !form.email || !form.password
                ? (event) => errMsg(event, "Enter Email & Password")
                : (event) => handleSubmit(event)
            }
          >
            <div
              className="login-email-form d-flex align-items-center justify-content-between my-5"
              style={{ borderBottom: "1.5px solid #A9A9A999" }}
            >
              <img
                alt="loch"
                src="../assets/image/loginPage/icon/mail.png"
                // onClick={showPass ? setShowPass(false) : setShowPass(true)}
              />
              <input
                name="email"
                placeholder="Enter your email"
                onChange={(event) => handleChangeText(event)}
                className="form-control login-input border-0"
                type="email"
              />
            </div>

            <div
              className="login-password-form d-flex align-items-center justify-content-between mt-5 mb-3"
              style={{ borderBottom: "1.5px solid #A9A9A999" }}
            >
              <img
                alt="loch"
                src="../assets/image/loginPage/icon/lock.png"
                // onClick={showPass ? setShowPass(false) : setShowPass(true)}
              />
              <input
                name="password"
                placeholder="Enter your password"
                onChange={(event) => handleChangeText(event)}
                className="form-control border-0 login-input"
                type={showPass ? "text" : "password"}
              />
              <img
                alt="eye"
                src="../assets/image/loginPage/icon/eye.png"
                onClick={handleShowPass}
              />
            </div>
            <div className="d-flex justify-content-end mb-5">
              <Link href="/auth/reset-pass">Forgot Password ?</Link>
            </div>

            <button
              type="submit"
              className={
                form.email && form.password
                  ? "btn btn-enable col-12 py-3"
                  : "btn btn-disable col-12 py-3"
              }
              // {form.email && form.password ? enabled : disabled}
              disabled={btnDisable}
            >
              Log In
            </button>
          </form>
          <div className="text-center my-5">
            Don’t have an account? Let’s <Link href="/sign-up">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
const mapDispatchToProps = {
  login,
  getDataUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
