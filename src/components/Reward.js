import React, { useEffect, useState } from "react";
import bg from "../assets/images/rewardBg.png";
import header from "../assets/icons/header.png";
import { formatTime, parseTime } from "../assets/common";

const Reward = ({ showPopup, onClose, countText,clientLogo, timer }) => {
  const [timeLeft, setTimeLeft] = useState(() => parseTime(String(timer || "00:15:00"))); // 15 minute in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
        }}
      >
        <img
          src={bg}
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

        <div
          style={{
            position: "absolute",
            width: "min-content",
            top: "20px",
            left: "0",
            right: "0",
            margin: "auto",
            textAlign: "center",
            color: "white",
          }}
        >
          <span
            style={{
              position: "absolute",
              width: "5%",
              top: "-15px",
              right: "-35px",
              color: "white",
              fontSize: "25px",
              cursor: "pointer",
              fontWeight: "400",
              backgroundColor: "transparent",
            }}
            onClick={onClose}
          >
            x
          </span>

          <h4 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px" }} >
            Congratulations
          </h4>

          <p style={{ fontSize: pFontSize, fontWeight: "bold", margin: "10px 0",textTransform:"uppercase" }} >
            {countText || `3 / 9`}
          </p>
          <img src={clientLogo ? clientLogo : header} alt="header" style={{ width: "80px", height: "80px", marginBottom: "20px", marginTop: "10px", borderRadius: "5px"}} />

          <h2 style={{ fontSize: "14px", margin: "50px 0 0 0", fontWeight: "bold" }}>
            Coupon Valid 15 Minutes From Activation
          </h2>

          <div style={{ fontSize: "40px", marginTop: "20px", fontWeight: "bold" }}>
            {formatTime(timeLeft)}
          </div>

          <span style={{ fontSize: "14px", marginTop: "0px", fontWeight: "600", display: "block",}} >
            Coupon is active
          </span>

          <div style={{ fontSize: "14px", marginTop: "20px", fontWeight: "bold",}}>
            Show The Coupon To The Cashier After Activation
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
