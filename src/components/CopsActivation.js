import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import FreeCops from "../assets/icons/freeCopsAvail.png";
import AgeModal from "./AgeModal";
import CoupanComponent from "./CoupanComponent";
import { formatDate } from "../assets/common";

const CopsActivation = ({
  isModalOpen,
  setIsModalOpen,
  callBack,
  ageLimitaion,
  currentCoupanData,
  clientData,
  setAddlimitation,
}) => {
  const closeModal = () => setIsModalOpen(false);
  const [ageModal, setAgeModal] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const colorMapping = ['orange', 'blue', 'red', 'black'];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100vh",
            overflow: "auto",
            padding: "10px 0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: "10",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "25px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "90%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                position: "relative",
              }}
            >
              <h5 style={{ color: "black" }}>
                Congratulations, here is your coupon!
              </h5>
              <IoIosCloseCircle
                color={"#2A0181"}
                size={20}
                style={{
                  position: "absolute",
                  right: "-10px",
                  cursor: "pointer",
                  top: "-19px",
                }}
                onClick={closeModal}
              />
            </div>

            {/* <img src={FreeCops} alt="free cops" /> */}
            <div className="coupon-in">
            <div className="coupon-left">
              <div className={`coupon-left-text ${colorMapping.includes(currentCoupanData?.color_selection) || colorMapping["orange"]} ${currentCoupanData?.color_selection}-text`}>

                <p>{currentCoupanData?.campaign_name || "Beverages coupon"}</p>
                <h3> {(currentCoupanData?.coupon_type_content?.[0]?.discount_value || currentCoupanData?.coupon_type_content?.[0]?.discount_percentage) ? `${currentCoupanData?.coupon_type_content?.[0]?.discount_value || currentCoupanData?.coupon_type_content?.[0]?.discount_percentage}%` : "FREE"} </h3>
              </div>
            </div>

            <div className={`coupon-right ${colorMapping.includes(currentCoupanData?.color_selection) || colorMapping["orange"]} ${currentCoupanData?.color_selection}-bg`}>
              <div className="coupon-right-text">
                {/* <img src={OLOLogo} alt="" /> */}
                <h2>{clientData?.client_name ?? "OLO"}</h2>
                <h3> {currentCoupanData?.coupon_name} </h3>
                <p>VALID UNTIL <b> {currentCoupanData?.validity_no_limit ? "No Expiration" : formatDate(currentCoupanData?.validity_expiration_date) || ""} </b></p>
                {/* <span>Age : 18+</span> */}
              </div>
            </div>
          </div>
            <div style={{display: "none"}}> 
              <CoupanComponent allData={currentCoupanData} clientData={clientData} occupied={currentCoupanData?.occupied} />
            </div>
            
            <div> 
              <p style={{ color: "black", textAlign: "center", marginTop: 15 }}>
                Activate the coupon in-store and show this at the checkout.
                (Coupon is valid for 15 minutes after activation) <br />
              </p>

              <p style={{minHeight:'250px'}} dangerouslySetInnerHTML={{ __html: currentCoupanData?.other_customization  }} />
            </div>

            <button style={{ padding: "8px 12px", backgroundColor: "#2A0181", color: "white", border: "none", 
                borderRadius: "4px", cursor: "pointer", fontWeight: "bold", }}
              onClick={() => {
                if (ageLimitaion) {
                  setAgeModal(true);
                  setIsModalOpen(false);
                } else {
                  callBack(currentCoupanData);
                }
              }} >
              ACTIVATE
            </button>
            <p style={{ color: "black", textAlign: "center", marginTop: 10 }}>
              Read the campaign{" "}
              <span style={{ color: "#25026E", textDecoration: "underline" }}>
                terms and conditions
              </span>
              .
            </p>
          </div>
        </div>
      )}
      <AgeModal
        isModalOpen={ageModal}
        setIsModalOpen={setAgeModal}
        callBack={callBack}
      />
    </div>
  );
};

export default CopsActivation;
