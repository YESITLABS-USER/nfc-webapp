import React, { useEffect, useState } from "react";
import bg from "../assets/images/rewardBg.png";
import header from "../assets/icons/header.png";
import { formatTime, parseTime } from "../assets/common";

const Reward = ({ showPopup, onClose, countText,clientLogo, timer }) => {
  // const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 hours in seconds
  
  const [timeLeft, setTimeLeft] = useState(() => parseTime(String(timer))); // 15 hours in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const pFontSize = countText?.length <= 8 ? "26px" : "15px";

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
          height: "100%",
          position: "relative",
          maxWidth: "500px",
          padding: "20px 0",
        }}
      >
        <img
          src={bg}
          alt="background"
          style={{
            width: "90%",
            height: "94vh",
            padding: "20px 0",
            objectFit: "contain",
            margin: "0 auto",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "55%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <span
            style={{
              position: "absolute",
              width: "5%",
              top: "0%",
              right: "-26%",
              color: "white",
              fontSize: "25px",
              cursor: "pointer",
              fontWeight: "bolder",
              backgroundColor: "transparent",
            }}
            onClick={onClose}
          >
            X
          </span>

          <h4 style={{ fontSize: "22px", fontWeight: "bold", marginTop: "10px" }} >
            Congratulations
          </h4>

          <p style={{ fontSize: pFontSize, fontWeight: "bold", margin: "10px 0",textTransform:"uppercase" }} >
            {countText || `3 / 9`}
          </p>
          <img src={clientLogo ? clientLogo : header} alt="header" style={{ width: "81px", height: "77px", marginBottom: "20px", marginTop: "10px", }} />

          <h2 style={{ fontSize: "16px", margin: "50px 0 0 0", fontWeight: "bold" }}>
            Coupon Valid 15 Minutes From Activation
          </h2>

          <div style={{ fontSize: "55px", marginTop: "20px", fontWeight: "bold" }}>
            {formatTime(timeLeft)}
          </div>

          <span style={{ fontSize: "18px", marginTop: "-10px", fontWeight: "bold",display: "block",}} >
            Coupon is active
          </span>

          <div style={{ fontSize: "16px", marginTop: "90px", fontWeight: "bold",}}>
            Show The Coupon To The Cashier After Activation
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
