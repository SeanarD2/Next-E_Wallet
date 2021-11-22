import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { getDataCookie } from "middleware/authPage";
import axios from "utils/axios";
import SearchReceiver from "components/Transfer/SearchReceiver";
import { useRouter } from "next/router";
import { getAllUser } from "redux/action/user";
import { connect } from "react-redux";
import Paginate from "react-paginate";

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

  const allUser = await axios
    .get(`/user?page=1&limit=3&search=&sort=`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      return { data: res.data.data, pagination: res.data.pagination };
    })
    .catch((err) => {
      return [];
    });
  return {
    props: {
      allUser: allUser,
    },
  };
}

function Dasboard(props) {
  // console.log(props.allUser);
  const [totalPage, setTotalPage] = useState(
    props.allUser.pagination.totalPage
  );
  const [dataAllUser, setDataAllUser] = useState(props.allUser.data);
  const router = useRouter();
  console.log(router.query);

  const [page, setPage] = useState(1);

  const handlePagination = (event) => {
    setPage(event.selected + 1);
    // setPage(router.query.page);

    router.push(
      `/transfer?search=${
        router.query.search ? router.query.search : ""
      }&page=${event.selected + 1}&sort=${
        router.query.search ? router.query.sort : ""
      }`
    );
  };

  useEffect(() => {
    router.push("/transfer?search=&page=1&sort=");
  }, []);

  useEffect(() => {
    setPage = router.query.page;
    props
      .getAllUser({
        search: router.query.search,
        page: router.query.page,
        sort: router.query.sort,
      })
      .then((res) => {
        setTotalPage(res.value.data.pagination.totalPage);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.query.page]);

  useEffect(() => {
    props
      .getAllUser({
        search: router.query.search,
        page: 1,
        sort: router.query.sort,
      })
      .then((res) => {
        console.log(res);
        setTotalPage(res.value.data.pagination.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.query.search]);

  useEffect(() => {
    props
      .getAllUser({
        search: router.query.search,
        page: 1,
        sort: router.query.sort,
      })
      .then((res) => {
        console.log(res);
        setTotalPage(res.value.data.pagination.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.query.sort]);

  return (
    <>
      <Layout title="Home | Transfer">
        <div className="container">
          <div className="row rp">
            <Sidebar activePage="menu2" />
            <div className="row col-lg-9 rp">
              <SearchReceiver allUser={dataAllUser} page={page} />
            </div>
          </div>
          <div className="justify-content-center d-flex text-center my-5">
            <Paginate
              previousLabel={null}
              nextLabel={null}
              breakLabel={"..."}
              pageCount={totalPage}
              onPageChange={(event) => handlePagination(event)}
              containerClassName={"pagination"}
              disabledClassName={"pagination__disabled"}
              activeClassName={"pagination__active"}
              className="justify-content-center pagination d-flex align-items-center"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  getAllUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dasboard);
