import UserSVG from "components/SVG/UserSVG";
import React, { useState, useEffect } from "react";

export default function HandleNavigation() {
  const [active, setActive] = useState("menu1");
  const [hover, setHover] = useState("");

  const handleChangePage = (page) => {
    setActive(page);
  };

  const mouseOver = (page) => {
    // console.log("HOVER", page);
    setHover(page);
  };

  const mouseOut = () => {
    setHover("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <div
              onClick={() => handleChangePage("menu1")}
              onMouseOver={() => mouseOver("menu1")}
              onMouseOut={() => mouseOut("menu1")}
            >
              <UserSVG
                color={
                  active === "menu1"
                    ? "blue"
                    : hover === "menu1"
                    ? "red"
                    : "grey"
                }
              />
              Menu 1
            </div>
            <div
              onClick={() => handleChangePage("menu2")}
              onMouseOver={() => mouseOver("menu2")}
              onMouseOut={() => mouseOut("menu2")}
            >
              <UserSVG
                color={
                  active === "menu2"
                    ? "blue"
                    : hover === "menu2"
                    ? "red"
                    : "grey"
                }
              />
              Menu 2
            </div>
            <div
              onClick={() => handleChangePage("menu3")}
              onMouseOver={() => mouseOver("menu3")}
              onMouseOut={() => mouseOut("menu3")}
            >
              <UserSVG
                color={
                  active === "menu3"
                    ? "blue"
                    : hover === "menu3"
                    ? "red"
                    : "grey"
                }
              />
              Menu 3
            </div>
            <div
              onClick={() => handleChangePage("menu4")}
              onMouseOver={() => mouseOver("menu4")}
              onMouseOut={() => mouseOut("menu4")}
            >
              <UserSVG
                color={
                  active === "menu4"
                    ? "blue"
                    : hover === "menu4"
                    ? "red"
                    : "grey"
                }
              />
              Menu 4
            </div>
          </div>
        </div>
        <div className="col-md-8">Right Side</div>
      </div>
    </div>
  );
}
