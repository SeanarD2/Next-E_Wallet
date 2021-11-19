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

// ROUTING
export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/main/home",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function ResetPassword() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    linkDirect: "http://localhost:3000/create-new-pass",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    axios
      .post("/auth/forgot-password", form)
      .then((res) => {
        // console.log(res.data.data);
        toast.success(res.data.msg);

        // router.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

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

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Z-Wallet | Forgot Password</title>
      </Head>
      <div className="container-fluid d-flex rp">
        <div className="login-left-side d-flex justify-content-center">
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

        <div className="login-right-side pr-lg-5  p-lg-5 text-start">
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
              !form.email
                ? (event) => errMsg(event, "Enter Email")
                : (event) => handleSubmit(event)
            }
          >
            <div
              className="login-password-form d-flex align-items-center justify-content-between mt-5 mb-3"
              style={{ borderBottom: "1.5px solid #A9A9A999" }}
            >
              <img
                alt="mail"
                src="../assets/image/loginPage/icon/mail.png"
                // onClick={showPass ? setShowPass(false) : setShowPass(true)}
              />
              <input
                name="email"
                placeholder="Enter your E-mail"
                onChange={(event) => handleChangeText(event)}
                className="form-control border-0"
              />
            </div>

            <button
              type="submit"
              className={
                form.email
                  ? "btn btn-enable col-12 py-3"
                  : "btn btn-disable col-12 py-3"
              }
            >
              Confirm
            </button>
          </form>
          <div className="text-center my-5">
            Already have an account? Let’s <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
