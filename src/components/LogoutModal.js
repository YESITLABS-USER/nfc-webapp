import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import LogoutModalImg from "../assets/icons/logoutModal.png";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ isModalOpen, setIsModalOpen }) => {
  const closeModal = () => setIsModalOpen(false);
    const lang = localStorage.getItem("language") || "fin";


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
                size={25}
                style={{
                  position: "absolute",
                  right: "-8px",
                  cursor: "pointer",
                  top: "-10px",
                }}
                onClick={closeModal}
              />
            </div>

            <img
              src={LogoutModalImg}
              alt="Logoutmodal"
              style={{ width: "70px", objectFit: "contain", marginBottom: "20px" }}
            />

            <div>
              <span style={{ color: "white" }}>
                {lang == "eng" ? "Are you sure you want to Logout?" : "Oletko varma että haluat kirjautua ulos?"}
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
                  color: "#000",
                  border: "none",

                  padding: "5px 0px",
                  cursor: "pointer",
                  fontWeight: "600",
                  borderRadius: "30px",
                  width: "40%",
                }}
                onClick={closeModal}
              >
                {lang == "eng" ? "No" : "Älä kirjaudu ulos"}
              </button>
              <button
                style={{
                  backgroundColor: "white",
                  color: "#000",
                  border: "none",
                  padding: "5px 0px",
                  cursor: "pointer",
                  fontWeight: "600",
                  borderRadius: "30px",
                  width: "40%",
                }}
                onClick={() => {
                  navigate("/");
                  closeModal();
                  localStorage.removeItem("nfc-app");
                }}
              >
                {lang == "eng" ? "Yes" : "Kyllä, kirjaudun ulos"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutModal;
