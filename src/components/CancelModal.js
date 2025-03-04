import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Cancel from "../assets/icons/calcelModal.png";

const CancelModal = ({ isModalOpen, setIsModalOpen }) => {
  const closeModal = () => setIsModalOpen(false);

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
            height: "100%",
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
              borderRadius: "18px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "90%",
              maxWidth: "400px", // Ensures the modal doesn't get too wide
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
              <img src={Cancel} alt="cancel" />

              <IoIosCloseCircle
                color={"#2A0181"}
                size={30}
                style={{
                  position: "absolute",
                  right: "-10px",
                  cursor: "pointer",
                  top: "-10px",
                }}
                onClick={() => {
                  closeModal();
                }}
              />
            </div>
            <h5 style={{ marginTop: 20, fontWeight: "700" }}>
              You are not allowed to use this coupon.
            </h5>

            <div style={{ marginTop: "20px" }}>
              <button
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#2A0181",
                  color: "white",
                  border: "none",
                  borderRadius: "40px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "40%",
                }}
                onClick={() => {
                  closeModal();
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelModal;
