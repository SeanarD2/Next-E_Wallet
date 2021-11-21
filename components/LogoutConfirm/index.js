import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function LogoutConfirm() {
  const [showLogout, setShowLogout] = useState(false);

  const setCloseOut = () => setShowLogout(false);
  const setShowOut = () => setShowLogout(true);

  const handleLogout = () => {
    handleChangePage("menu5");
    Cookie.remove("id");
    Cookie.remove("token");
    Cookie.remove("receiverId");
    router.push("/login");
    axios.post(`/auth/logout`);
  };

  return (
    <>
      <Modal show={showLogout} onHide={setCloseOut}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to Logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setCloseOut}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      ;
    </>
  );
}
