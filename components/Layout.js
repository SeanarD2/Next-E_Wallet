import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <Header />
      <div className="my-5">{props.children}</div>
      <Footer />
    </div>
  );
}
