import React from "react";
import orange from "../assets/coupans/orange-coupon.svg";
import blue from "../assets/coupans/blue-coupon.svg";
import red from "../assets/coupans/red-coupon.svg";
import black from "../assets/coupans/black-coupon.svg";
import "../styles/coupan.css";
import { MdDelete } from "react-icons/md";

const CoupanComponent = ({
  coupan_type,
  coupan_discount,
  coupan_title,
  coupan_validity,
  coupan_age,
  coupan_color,
  occupied,
  onClick,
}) => {
  const colorMapping = {
    orange: orange,
    blue: blue,
    red: red,
    black: black,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        className="coupan-container"
        style={{ cursor: "pointer", filter: occupied ? "brightness(0.5)" : "" }}
        onClick={occupied ? null : onClick}
      >
        <img
          src={colorMapping[coupan_color]}
          alt="Coupon"
          className="coupan-image"
        />
        <div className="coupan-content">
          <div className="coupan-details">
            <div className="coupan-vertical-text" style={{ color: "#FF6B00" }}>
              <p className="coupan-description">
                {coupan_type || "Beverages coupon"}
              </p>
              <h2 className="coupan-offer">{coupan_discount || "FREE"}</h2>
            </div>
            <div className="coupan-main-text">
              <h2 className="coupan-title">
                {" "}
                {coupan_title.length <= 9
                  ? coupan_title.split(" ").map((word, index) => (
                      <span key={index} style={{ display: "block" }}>
                        {word}
                      </span>
                    ))
                  : coupan_title}
              </h2>
              <span className="coupan-validity">
                <span style={{ color: "#d9d0d0" }}>VALID UNTIL </span>{" "}
                {coupan_validity || "31 DECEMBER 2025"}
              </span>
              {coupan_age && <span className="coupan-age"> Age : 18+ </span>}
            </div>
          </div>
        </div>
      </div>

      {/* <MdDelete style={{ fontSize: "25px", color: "red" }} /> */}
    </div>
  );
};

export default CoupanComponent;
