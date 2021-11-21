import React, { useEffect, useState } from "react";

export default function Footer() {
  return (
    <>
      <div className="footer-container d-none d-lg-flex">
        <div className="footer-content container d-flex align-self-center justify-content-between align-items-center">
          <span>2020 Zwallet. All right reserved.</span>
          <div className="col-4 d-flex justify-content-between align-items-center">
            <span>+62 5637 8882 9901</span>
            <span>andreas@zwallet.com</span>
          </div>
        </div>
      </div>

      <div className="footer-container py-3 d-block d-lg-none">
        <div className="my-2">2020 Zwallet. All right reserved.</div>
        <div className="my-2">+62 5637 8882 9901</div>
        <div className="my-2">andreas@zwallet.com</div>
      </div>
    </>
  );
}
