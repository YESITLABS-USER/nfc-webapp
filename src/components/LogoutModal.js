import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import LogoutModalImg from "../assets/icons/logoutModal.png";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ isModalOpen, setIsModalOpen }) => {
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();
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
    // <div style={{ textAlign: "center", marginTop: "50px" }}>
    <div>
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
            zIndex:200
          }}
        >
          <div
            style={{
              backgroundColor: "#2E0090",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "90%",
              maxWidth: "400px",
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
              <IoIosCloseCircle
                color={"white"}
                size={30}
                style={{
                  position: "absolute",
                  right: "5px",
                  cursor: "pointer",
                  top: "-10px",
                }}
                onClick={closeModal}
              />
            </div>

            <img
              src={LogoutModalImg}
              alt="Logoutmodal"
              style={{ objectFit: "contain", marginBottom: "20px" }}
            />

            <div>
              <span style={{ color: "white" }}>
                Are you sure you want to Logout?
              </span>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
                gap: "10px", // Spacing between buttons
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  color: "#2E0090",
                  border: "none",

                  padding: "10px 20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  width: "30%",
                }}
                onClick={closeModal}
              >
                No
              </button>
              <button
                style={{
                  backgroundColor: "white",
                  color: "#2E0090",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  width: "30%",
                }}
                onClick={() => {
                  navigate("/");
                  closeModal();
                  localStorage.removeItem("nfc-app");
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutModal;
