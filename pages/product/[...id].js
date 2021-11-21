import React from "react";
import Navbar from "components/module/Navbar";
import Layout from "components/Layout";
import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();

  console.log(process.env.STATUS);
  console.log(process.env.BE_PROD);
  console.log(process.env.BE_DEV);

  // console.log(router.query);
  return (
    <Layout title="Product Details">
      <h1>Page Details Product</h1>
    </Layout>
  );
}
