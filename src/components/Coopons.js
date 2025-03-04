import React, { useState } from "react";

import CooponsImg from "../assets/icons/coopons.png";
import { FaInfoCircle } from "react-icons/fa";
import LoginModal from "./InfoModal";
const Coopons = ({ setCallback, value }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shakeIndex, setShakeIndex] = useState(null); // Track which image is shaking

  const handleImageClick = (index) => {
    setShakeIndex(index); // Trigger shake for the clicked image

    setTimeout(() => setShakeIndex(null), 500); // Remove shake effect after animation duration

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof setCallback === "function") {
      setCallback(true); // Pass true or any required value
    } else {
      console.error("setCallback is not a function");
    }
  };

  const shakeAnimation = {
    animation: "shake 0.5s ease", // Inline shake animation
  };

  const keyframes = `
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `;

  return (
    <div style={style.container}>
      <div
        style={{
          backgroundColor: "#E0E0E0",
          width: "100vw",
          height: "3px",
          padding: "0",
          boxSizing: "border-box",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            flexGrow: 1,
            textAlign: "center",
            marginLeft: "50px",
            fontWeight: "bold",
            fontSize: "22px",
            color: "#000000",
          }}
        >
          Coupons
        </span>
        <FaInfoCircle
          style={{ marginRight: "30px" }}
          size={24}
          color="#25026E"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <style>{keyframes}</style>
        {[1, 2].map((_, index) => (
          <img
            key={index}
            src={CooponsImg}
            alt={`Star Pattern ${index + 1}`}
            style={{
              width: "auto",
              height: "auto",
              cursor: "pointer",
              ...(shakeIndex === index ? shakeAnimation : {}), // Apply shake animation if clicked
            }}
            onClick={() => {
              handleImageClick(index);
            }}
          />
        ))}
      </div>
      <LoginModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Coopons;
const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    flexDirection: "column",
  },
};
