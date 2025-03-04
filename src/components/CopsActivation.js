import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import FreeCops from "../assets/icons/freeCopsAvail.png";
import AgeModal from "./AgeModal";

const CopsActivation = ({
  isModalOpen,
  setIsModalOpen,
  callBack,
  ageLimitaion,
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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
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
                size={28}
                style={{
                  position: "absolute",
                  right: "-10px",
                  cursor: "pointer",
                  top: "-19px",
                }}
                onClick={closeModal}
              />
            </div>
            <img src={FreeCops} alt="free cops" />

            <p style={{ color: "black", textAlign: "center", marginTop: 15 }}>
              Activate the coupon in-store and show this at the checkout.
              (Coupon is valid for 15 minutes after activation) <br />
            </p>

            <div style={{ margin: 10 }}>
              <strong style={{ display: "flex" }}>Item excluded:</strong>

              <span style={{ fontWeight: "normal" }}>
                Lorem ipsum dolor sit amet consectetur. Nibh quis vitae faucibus
                egestas.
              </span>
            </div>
            <div style={{ margin: 10 }}>
              <strong style={{ display: "flex" }}>Special conditions:</strong>
              <span style={{ fontWeight: "normal" }}>
                Lorem ipsum dolor sit amet consectetur. Nibh quis vitae faucibus
                egestas.
              </span>
            </div>
            <div style={{ margin: 10 }}>
              <strong style={{ display: "flex" }}>Validity information:</strong>
              <span style={{ fontWeight: "normal" }}>
                Lorem ipsum dolor sit amet consectetur. Nibh quis vitae faucibus
                egestas.
              </span>
            </div>

            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#2A0181",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => {
                if (ageLimitaion) {
                  setAgeModal(true);
                  setIsModalOpen(false);
                } else {
                  callBack(true);
                }
              }}
            >
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
