import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getDataUser,
  updateImageUser,
  deleteImageUser,
} from "redux/action/user";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function ProfileComp(props) {
  const router = useRouter();
  const { dataUserLogin } = props.user;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({ image: "" });

  const formData = new FormData();
  for (const data in form) {
    formData.append(data, form[data]);
  }

  useEffect(() => {
    if (form.image) {
      props
        .updateImageUser({ id: props.user.dataUserLogin.id, image: formData })
        .then((res) => {
          handleClose();
          props.getDataUser(props.user.dataUserLogin.id).then((res) => {
            console.log();
          });
          toast.success(res.value.data.msg);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
          handleClose();
        });
    }
  }, [form]);

  const deleteImage = () => {
    props.deleteImageUser(props.user.dataUserLogin.id).then((res) => {
      handleClose();
      toast.success(res.value.data.msg);
      props.getDataUser(props.user.dataUserLogin.id);
    });
  };

  return (
    <>
      <ToastContainer />
      <div style={{ top: "10px", bottom: "10px " }}>
        <Modal
          show={show}
          onHide={handleClose}
          style={{ top: "25%", bottom: "25%" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                type="file"
                onChange={(event) => setForm({ image: event.target.files[0] })}
              />
            </form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <div className="col-5">
              <Button
                variant="secondary"
                className="col-12 btn-error"
                onClick={() => deleteImage()}
              >
                Delete
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="ps-0 ps-lg-3">
        <div
          className="profile-menu__cont  text-center bg-white rpr p-4"
          style={{ height: "100%" }}
        >
          <img
            src={
              dataUserLogin.image
                ? `${
                    process.env.STATUS === "dev"
                      ? process.env.BE_DEV
                      : process.env.BE_PROD
                  }/uploads/${dataUserLogin.image}`
                : "/assets/image/default-profile.jpg"
            }
            alt=""
            className="mt-5"
          />
          <div
            onClick={handleShow}
            className="text-center my-3 d-flex align-items-center justify-content-center hover-pointer"
          >
            <img
              className="rds-0 me-2"
              src="/assets/image/edit.png"
              alt=""
              style={{ width: "17px", height: "17px" }}
            />
            <span className="fw-400 fs-16 color-gray86">Edit</span>
          </div>
          <div className="fw-700 fs-24 color-gray57">
            {dataUserLogin.firstName + " " + dataUserLogin.lastName}
          </div>
          <div className="fw-400 fs-16 mt-3 color-gray86">
            {dataUserLogin.noTelp}
          </div>

          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="menuEditProfile col-lg-6 col-12 my-4 ">
              <div
                onClick={() => router.push("/home/profile/personal-info")}
                className="hover-pointer edit-menu__personal-info my-4 rds-10 p-3 bg-8ed d-flex justify-content-between align-items-center"
              >
                <span className="fw-700 fs-16 color-gray57">
                  Personal Information
                </span>
                <img
                  src="/assets/image/sidebar/arrow-up.svg"
                  alt=""
                  className="rotate90"
                  style={{ width: "28px", height: "28px" }}
                />
              </div>

              <div
                onClick={() => router.push("/home/profile/change-password")}
                className="hover-pointer edit-menu__personal-info my-4 rds-10 p-3 bg-8ed d-flex justify-content-between align-items-center"
              >
                <span className="fw-700 fs-16 color-gray57">
                  Change Password
                </span>
                <img
                  src="/assets/image/sidebar/arrow-up.svg"
                  alt=""
                  className="rotate90"
                  style={{ width: "28px", height: "28px" }}
                />
              </div>

              <div
                onClick={() => router.push("/home/profile/change-pin")}
                className="hover-pointer edit-menu__personal-info my-4 rds-10 p-3 bg-8ed d-flex justify-content-between align-items-center"
              >
                <span className="fw-700 fs-16 color-gray57">Change PIN</span>
                <img
                  src="/assets/image/sidebar/arrow-up.svg"
                  alt=""
                  className="rotate90"
                  style={{ width: "28px", height: "28px" }}
                />
              </div>

              <div className="hover-pointer edit-menu__personal-info my-4 rds-10 p-3 bg-8ed d-flex justify-content-start align-items-center">
                <span className="fw-700 fs-16 color-gray57">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  getDataUser,
  updateImageUser,
  deleteImageUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComp);
