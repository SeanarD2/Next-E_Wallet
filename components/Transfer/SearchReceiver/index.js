import router from "next/router";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { getAllUser, getDataReceiver } from "redux/action/user";
import { connect } from "react-redux";

function SearchReceiver(props) {
  console.log(props.allUser);
  const [allUser, setAllUser] = useState(props.allUser);

  const handleSelectedReceiver = (id) => {
    Cookie.set("receiverId", id);
    props.getDataReceiver(id);
    router.push("/home/transfer/amount");
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(props.page);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(
        `/transfer?search=${search}&page=${1}&sort=${
          router.query.sort ? router.query.sort : ""
        }`
      );
    }
  };

  const handleSort = (event) => {
    router.push(
      `/transfer?search=${router.query.search}&=page=1&sort=${event.target.value}`
    );
  };

  useEffect(() => {
    setAllUser(props.user.dataAllUser);
  }, [props.user.dataAllUser]);

  return (
    <div className="col-12 p-0 ps-lg-3">
      <div
        className="search-receiver__label rds-20 sec-card p-4 p-lg-4"
        style={{ height: "100%", minHeight: "600px" }}
      >
        <div className="col-12 d-flex justify-content-between align-items-center row">
          <span className="fs-18 fw-700 col-12 col-lg-4 mb-4 mb-lg-0">
            Search Receiver
          </span>
          <select
            className="fs-14 fw-400 rds-12 col-12 col-lg-4 py-2"
            onChange={(event) => handleSort(event)}
          >
            <option value="">Select Sort By</option>
            <option value="firstName ASC">First Name ASC</option>
            <option value="firstName DESC">First Name DESC</option>
            <option value="noTelp ASC">Phone Number ASC</option>
            <option value="noTelp DESC">Phone Number DESC</option>
          </select>
        </div>
        <div className="mt-4 py-lg-2 py-2 px-3 px-lg-3 col-12 search-receiver__input d-flex align-items-center">
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
          {allUser.length > 0 ? (
            allUser.map((item, index) => (
              <div
                key={index}
                className="hover-pointer history-list d-flex align-items-center my-4 sec-card p-3 p-lg-4"
                onClick={() => handleSelectedReceiver(item.id)}
              >
                <div className="history-list__image-user">
                  <img
                    src={
                      item.image
                        ? `${
                            process.env.STATUS === "dev"
                              ? process.env.BE_DEV
                              : process.env.BE_PROD
                          }/uploads/${item.image}`
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
            <div className="text-center">
              <h3>Can`t Find Another User</h3>
            </div>
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
