import React from "react";
// import orange from "../assets/coupans/orange-coupon.svg";
import orange from "../assets/coupans/orange-coupon.png";
import blue from "../assets/coupans/blue-coupon.svg";
import red from "../assets/coupans/red-coupon.svg";
import black from "../assets/coupans/black-coupon.svg";
import "../styles/coupan.css";
import { MdDelete } from "react-icons/md";
import { formatDate } from "../assets/common";

const CoupanComponent = ({
  allData,  
  clientData,
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
      <div  className="coupan-container" style={{ cursor: "pointer", filter: occupied ? "brightness(0.5)" : "" }}
        onClick={occupied ? null : onClick} >
        <img 
        src={colorMapping[allData?.color_selection in colorMapping ? allData?.color_selection : "orange"]}
        // src={colorMapping["orange"]} 
          alt="Coupon" style={{width:"100%"}}
          className="coupan-image"
        />
        <div className="coupan-content">
          <div className="coupan-details">
            <div className="coupan-vertical-text" style={{ color: "#FF6B00" }}>
              <p className="coupan-description">
                {allData?.campaign_name || "Beverages coupon"}
              </p>
              <h2 className="coupan-offer">
                {(allData?.coupon_type_content?.[0]?.discount_value || allData?.coupon_type_content?.[0]?.discount_percentage) ? `${allData?.coupon_type_content?.[0]?.discount_value || allData?.coupon_type_content?.[0]?.discount_percentage}%` : "FREE"} 
              </h2>
            </div>
            <div className="coupan-main-text">
              <span style={{marginTop:"-12px", fontSize:"12px"}}> {clientData?.client_name ?? "OLO"} </span>

              <h2 className="coupan-title" style={{textTransform:"uppercase"}}>
                {allData?.coupon_name?.length <= 9
                  ? allData?.coupon_name.split(" ").map((word, index) => (
                      <span key={index} style={{ display: "block" }}>
                        {word}
                      </span>
                    ))
                  : allData?.coupon_name}
              </h2>
              <span className="coupan-validity"  style={{textTransform:"uppercase"}}>
                <span style={{ color: "#d9d0d0" }}>VALID UNTIL </span>
                {allData?.validity_no_limit ? "No Expiration" : formatDate(allData?.validity_expiration_date) || ""}
              </span>
              {allData?.campaign_age_restriction_start_age >= 18 && <span className="coupan-age"> Age : 18+ </span>}
            </div>
          </div>
        </div>
      </div>

      {/* <MdDelete style={{ fontSize: "25px", color: "red" }} /> */}
    </div>
  );
};

export default CoupanComponent;
