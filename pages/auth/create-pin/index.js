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

export default function CreatePin() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    axios
      .post("/auth/register", form)
      .then((res) => {
        console.log(res.data.data);
        Cookie.set("token", res.data.data.token);
        Cookie.set("id", res.data.data.id);

        // router.push("/main/login");
      })
      .catch((err) => {
        console.log("test");
        console.log(err);
        console.log(err.msg);
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
        <title>Z-Wallet | Create Pin</title>
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
            Create 6 digits pin to secure all your money and your data in
            Zwallet app. Keep it secret and don’t tell anyone about your Zwallet
            account password and the PIN.
          </p>
          <form
            onSubmit={
              !form.email || !form.password
                ? (event) => errMsg(event, "Enter Email & Password")
                : (event) => handleSubmit(event)
            }
          >
            <div className="input-pin my-5">
              <input className="pinForm p-3"></input>
              <input className="pinForm p-3"></input>
              <input className="pinForm p-3"></input>
              <input className="pinForm p-3"></input>
              <input className="pinForm p-3"></input>
              <input className="pinForm p-3"></input>
            </div>

            <button
              type="submit"
              className={
                form.email && form.password
                  ? "btn btn-enable col-12 py-3"
                  : "btn btn-disable col-12 py-3"
              }
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
