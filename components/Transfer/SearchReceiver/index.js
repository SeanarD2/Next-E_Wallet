import router from "next/router";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { getAllUser, getDataReceiver } from "redux/action/user";
import { connect } from "react-redux";

function SearchReceiver(props) {
  // console.log(props.allUser, "ALL USER");
  const [allUser, setAllUser] = useState(props.allUser);

  const handleSelectedReceiver = (id) => {
    Cookie.set("receiverId", id);
    props.getDataReceiver(id);
    router.push("/home/transfer/amount");
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(`/home/transfer?search=${search}`);
      props.getAllUser({ search: search }).then((res) => {
        setAllUser(res.value.data.data);
      });
    }
  };

  return (
    <div className="col-12 rpr">
      <div
        className="search-receiver__label rds-20 sec-card p-lg-4"
        style={{ height: "100%" }}
      >
        <span className="fs-18 fw-700 col-12">Search Receiver</span>
        <div className="mt-4 py-lg-2 px-lg-3 col-12 search-receiver__input d-flex align-items-center">
          <img src="/assets/image/search.svg" alt="search" className="me-3" />
          <input
            className=""
            style={{ width: "100%" }}
            placeholder="Search receiver here"
            onChange={(event) => setSearch(event.target.value)}
            onKeyPress={(event) => handleSearch(event)}
            value={search}
          ></input>
        </div>
        <div className="my-5">
          {allUser ? (
            allUser.map((item, index) => (
              <div
                key={index}
                className="history-list d-flex align-items-center my-5 sec-card p-lg-4"
                onClick={() => handleSelectedReceiver(item.id)}
              >
                <div className="history-list__image-user">
                  <img
                    src={
                      item.image
                        ? `http://localhost:3001/uploads/${item.image}`
                        : "/assets/image/default-profile.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="history-list__details-user d-flex flex-column justify-content-between ms-4">
                  <span className="fw-700 fs-18 text-truncate color-gray57">
                    {`${item.firstName} ${item.lastName}`}
                  </span>
                  {item.noTelp ? (
                    <span className="fw-400 fs-16 color-gray86">
                      {item.noTelp}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))
          ) : (
            <h1>TEST</h1>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { getDataReceiver, getAllUser };

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceiver);
