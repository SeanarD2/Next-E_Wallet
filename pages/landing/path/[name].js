import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import Navbar from "../../../components/module/Navbar";
import Layout from "../../../components/Layout";
import { getDataCookie } from "middleware/authPage";

export const getStaticPaths = async () => {
  const data = [
    {
      name: "Andreas",
      text: "“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”",
    },
    {
      name: "Jessica",
      text: "“I use Zwallet to manage all financial needs. It’s super easy to use and it’s 100% free app”",
    },
    {
      name: "Robert",
      text: "“Since I’m using this app, I’m not going to move to another similar app. Thank you Zwallet!”",
    },
  ];

  const paths = data.map((item) => {
    return {
      params: { name: item.name },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const name = context.params.name;
  const data = [
    {
      name: "Andreas",
      text: "“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”",
    },
    {
      name: "Jessica Mera",
      text: "“I use Zwallet to manage all financial needs. It’s super easy to use and it’s 100% free app”",
    },
    {
      name: "Robert Chandler",
      text: "“Since I’m using this app, I’m not going to move to another similar app. Thank you Zwallet!”",
    },
  ];

  return {
    props: { data },
  };
};

export default function Home(props) {
  return (
    <div className={styles.container}>
      <section className="landing-section">
        <div className="text-center container d-flex flex-column align-items-center">
          <h1>Awesome App For Saving Time.</h1>
          <p className="my-4">
            We bring you a mobile app for banking problems that
            <br /> oftenly wasting much of your times.
          </p>
          <span className="landing-white-button">Try it for free</span>
        </div>
      </section>
      <section className="landing-section">
        <div className="text-center container d-flex why flex-column align-items-center">
          <h1>Why Choose Zwallet?</h1>
          <p className="my-4" style={{ width: "40%" }}>
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </p>
          <div className="reason row">
            <div className="col-4 p-5">
              <h4>24/7 Support</h4>

              <p>
                We have 24/7 contact support so you can contact us whenever you
                want and we will respond it.
              </p>
            </div>
            <div className="col-4 p-5">
              <h4>Data Privacy</h4>
              <p>
                We make sure your data is safe in our database and we will
                encrypt any data you submitted to us.
              </p>
            </div>
            <div className="col-4 p-5">
              <h4>Easy Download</h4>
              <p>
                Zwallet is 100% totally free to use it’s now available on Google
                Play Store and App Store.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-section">
        <div className="text-center container d-flex best flex-column align-items-center">
          <div className="amount__amount">Rp. 390.736.500</div>
          <p className="amount__has-tf my-4">Money has Been Transfered.</p>
          <div className="amount__has-tf--desc">
            That amount of money has been transfered from all users. We still
            counting and going strong!
          </div>
        </div>
      </section>
      <section className="landing-section">
        <div className="text-center container d-flex why flex-column align-items-center">
          <h1>What Users are Saying.</h1>
          <p className="my-4" style={{ width: "40%" }}>
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </p>
          <div className="userSaid row">
            {props.data.map((item, index) => (
              <div key={index} className="col-4">
                <div className="p-5">
                  <h4>{item.name}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
