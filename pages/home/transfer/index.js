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
    .get(`/user?page=1&limit=5&search=&sort=`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      // console.log("THEN");
      // console.log("DATA", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      // console.log("CATCH");
      // console.log(err.response);
      return [];
    });
  return {
    props: { allUser: allUser },
  };
}

function Dasboard(props) {
  // console.log(props.dataUser);
  const [dataAllUser, setDataAllUser] = useState(props.allUser);
  const router = useRouter();
  console.log(router.query);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Layout title="Home | Transfer">
        <div className="container">
          <div className="row rp">
            <Sidebar activePage="menu2" />
            <div className="row col-lg-9 rp">
              <SearchReceiver
                allUser={dataAllUser}
                getDataAllUser={() => getDataAllUser()}
              />
            </div>
          </div>
          <Paginate
            previousLabel={null}
            nextLabel={null}
            breakLabel={"..."}
            pageCount={props.user.pageInfo.totalPage}
            onPageChange={(event) => handlePagination(event)}
            containerClassName={"pagination"}
            disabledClassName={"pagination__disabled"}
            activeClassName={"pagination__active"}
            className="justify-content-center align-items-center"
          />
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
