import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import React, { useState, useEffect } from "react";
import axios from "utils/axios";
import Cookie from "js-cookie";

export default function Layout(props) {
  const [activePage, setActivePave] = useState("menu1");

  const [dataUser, setDataUser] = useState({});

  const getDataUser = () => {
    axios
      .get(`/user/profile/${Cookie.get("id")}`)
      .then((res) => {
        // console.log(res.data.data);
        setDataUser(res.data.data);
      })
      .catch((err) => {
        setDataUser({});
        // console.log(err.response.data.msg);
      });
  };

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <Header dataUser={dataUser} />
      <div className="my-5">{props.children}</div>
      <Footer />
    </div>
  );
}
