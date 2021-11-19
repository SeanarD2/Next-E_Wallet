import router from "next/router";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";

export default function Amount(props) {
  // console.log(props.dataReceiver);
  // const [dataReciver, setAllUser] = useState(props.dataReceiver);
  const { dataReceiver } = props;

  const handleSelectedReceiver = (id) => {
    Cookie.set("receiverId", id);
    router.push("/home/transfer/amount");
  };

  return (
    <div className="col-12 rpr">
      <div
        className="search-receiver__label rds-20 sec-card p-lg-4"
        style={{ height: "100%" }}
      >
        <span className="fs-18 fw-700 col-12">Transfer Money</span>

        <div className="my-5">
          <div
            className="history-list d-flex align-items-center my-5 sec-card p-lg-4"
            onClick={() => handleSelectedReceiver(item.id)}
          >
            <div className="history-list__image-user">
              <img
                src={
                  dataReceiver.image
                    ? "http://localhost:3001"
                    : "/assets/image/default-profile.jpg"
                }
                alt=""
              />
            </div>
            <div className="history-list__details-user d-flex flex-column justify-content-between ms-4">
              <span className="fw-700 fs-18 text-truncate color-gray57">
                {`${dataReceiver.firstName} ${dataReceiver.lastName}`}
              </span>
              {dataReceiver.noTelp ? (
                <span className="fw-400 fs-16 color-gray86">
                  {dataReceiver.noTelp}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-6 fw-400 fs-16 lh-28 mb-5">
            Type the amount you want to transfer and then press continue to the
            next steps.
          </div>
          <div className="text-center">
            <input
              type="number"
              placeholder="0"
              className="fs-42 fw-700 text-center amont-input"
              style={{ width: "auto" }}
            ></input>
            <p>Rp120.000 Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
