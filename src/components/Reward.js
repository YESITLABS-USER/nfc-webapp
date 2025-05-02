import React, { useEffect, useRef, useState } from "react";
import bg from "../assets/images/rewardBg.png";
import bgOrange from "../assets/images/bgOrange.png";
import bgBlack from "../assets/images/bgBlack.png";
import bgBlue from "../assets/images/bgBlue.png";
import bgRed from "../assets/images/bgRed.png";
import cross from "../assets/icons/cross-icon.svg";
import header from "../assets/icons/header.png";
import { parseTime, rewardFormatTime } from "../assets/common";
import { useDispatch } from "react-redux";
import { getAllActivatedCoupans, getAllCoupans } from "../store/slices/coupanSlice";
import { getAllLoyalityCards } from "../store/slices/clientSlice";

const Reward = ({ showPopup, onClose, countText, clientLogo, timer, couponData }) => {
  const dispatch = useDispatch();
  const client_id = localStorage.getItem("client_id");
  const storedData = JSON.parse(localStorage.getItem("nfc-app")) || {};
  const { user_id } = storedData;
  const hasDispatched = useRef(false); // <-- Keeps track of dispatch status


  const [timeLeft, setTimeLeft] = useState(() => parseTime(String(timer))); // 15 minute in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft == 0 && !hasDispatched.current) {
      hasDispatched.current = true;
      dispatch(getAllLoyalityCards({ client_table_id: client_id, user_id: user_id }));
      dispatch(getAllCoupans({ client_table_id: client_id, user_table_id: user_id }));
      dispatch(getAllActivatedCoupans({ client_table_id: client_id, user_table_id: user_id }));
    }
  }, [timeLeft, dispatch, client_id, user_id]);


  const pFontSize = countText?.length <= 8 ? "26px" : "12px";

  if (!showPopup) return null;

  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg, #2D008C, #25046B)",
          width: "100%",
          height: "100vh",
          position: "relative",
          maxWidth: "500px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          justifyContent: "center"
        }}
      >
          <div className="reward-wrapper">
          <img
          // src={bg}
          src={
            couponData?.color_selection == "orange" ? bgOrange :
    couponData?.color_selection == "red" ? bgRed :
    couponData?.color_selection == "blue" ? bgBlue :
    couponData?.color_selection == "black" ? bgBlack :
    bg
          }
          alt="background"
          style={{
            width: "90%",
            height: "100%",
            padding: "20px 0",
            objectFit: "contain",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <span
            style={{
              position: "absolute",
              width: "5%",
              top: "0",
              right: "15px",
              color: "white",
              fontSize: "25px",
              cursor: "pointer",
              fontWeight: "400",
              backgroundColor: "transparent",
              zIndex: "1",
            }}
            onClick={onClose}
          >
            <img src={cross} alt="" style={{ width: "100%", height: "100%" }} />
          </span>
          <div className="reward-top">
            <h4 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px" }} >
              Congratulations
            </h4>

            <p style={{ fontSize: pFontSize, fontWeight: "bold", margin: "10px 0", textTransform: "uppercase" }} >
              {countText || `3 / 9`}
            </p>
            <p style={{ fontSize: pFontSize, fontWeight: "bold", margin: "10px 0", textTransform: "uppercase", marginTop: "auto" }} >
              {countText || `3 / 9`}
            </p>
          </div>
          <div className="reward-bottom">
          <img src={clientLogo ? clientLogo : header} alt="header" style={{ width: "80px", height: "80px", marginBottom: "10px", marginTop: "10px", borderRadius: "5px" }} />


            {/* <h2 style={{ fontSize: "14px", margin: "10px 0 0 0", fontWeight: "bold" }}>
              Coupon Valid 15 Minutes From Activation
            </h2> */}

            <div style={{ fontSize: "40px", marginTop: "0px", fontWeight: "bold" }}>
              {rewardFormatTime(timeLeft)}
            </div>

            <span style={{ fontSize: "14px", marginTop: "0px", fontWeight: "600", display: "block", }} >
              Coupon is active
            </span>

            <div style={{ fontSize: "14px", marginTop: "20px", fontWeight: "bold", }}>
              Show The Coupon To The Cashier After Activation
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Reward;
