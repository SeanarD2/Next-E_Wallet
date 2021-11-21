import React, { useState, useEffct } from "react";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { getDataCookie } from "middleware/authPage";
import axios from "utils/axios";
import { useRouter } from "next/router";
import ProfileMenu from "components/Profile/ProfileMenu";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function ProfilUser(props) {
  const router = useRouter();

  return (
    <>
      <Layout title="Home | Profile">
        <div className="container">
          <div className="row rp">
            <Sidebar activePage="menu4" />
            <div className="row col-lg-9 rp">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
