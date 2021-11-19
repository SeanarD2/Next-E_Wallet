import React, { useEffect, useState } from "react";

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-content container d-flex justify-content-between align-items-center">
          <span>2020 Zwallet. All right reserved.</span>
          <div className="col-4 d-flex justify-content-between align-items-center">
            <span>+62 5637 8882 9901</span>
            <span>andreas@zwallet.com</span>
          </div>
        </div>
      </div>
    </>
  );
}
