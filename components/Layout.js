import Head from "next/head";
import Navbar from "./module/Navbar";

export default function Layout(props) {
  return (
    <div className="container-fluid">
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <Navbar />

      {props.children}
    </div>
  );
}
