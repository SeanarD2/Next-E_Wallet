import React from "react";
import Navbar from "components/module/Navbar";
import Layout from "components/Layout";

export default function profile() {
  console.log(process.env.URL_BE);
  return (
    <Layout title="Profile">
      <h1>Page Profile</h1>
      <h3>LINK BACKEND : {process.env.URL_BE} </h3>
      <button className="btn btn-primary">Click Me !</button>
    </Layout>
  );
}
