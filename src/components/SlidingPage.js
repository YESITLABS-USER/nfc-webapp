import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Logo from "../assets/icons/logo.png";
import BackgroundImg from "../assets/images/slider.png";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";

const SlidingPage = ({ showPage, setShowPage }) => {
  // Handle enabling/disabling background scroll
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const lang = localStorage.getItem("language") || "eng";
  const url = localStorage.getItem("url") || "/home/invalid-page";


  useEffect(() => {
    if (showPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPage]);

  const handleNavigation = (goTo) => {
    navigate(goTo); // Replace "/contact-us" with your actual route
    setShowPage(false);
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: showPage ? 0 : "-100%",
          width: "100vw",
          height: "100%",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          transition: "left 0.5s ease-in-out",
          zIndex: 1000,
          backgroundImage: `url(${BackgroundImg})`,
          backgroundSize: "cover",
        }}
      >

        <img
          src={Logo}
          alt="logo"
          style={{ margin: 10 }}
          onClick={() => handleNavigation(url)}
        />
        <FaTimes
          onClick={() => setShowPage(false)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontSize: "24px",
            fontWeight: "500",
            color: "white",
            cursor: "pointer",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "90%",
            height: "100%",
            margin: "auto",
          }}
        >
          <ul
            style={{
              width: "100%",
              listStyleType: "none",
              padding: 0,
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              margin: "20px 0px",
            }}
          >
            <li
              style={{ marginBottom: "10px", margin: 0, cursor: "pointer", fontWeight: "500", fontSize: "15px" }}
              onClick={() => handleNavigation("/myprofile")}
            >
              {lang == "eng" ? "My Profile" : "Omat tiedot"}
            </li>
            <div
              style={{
                backgroundColor: "#1C0056",
                width: "100%",
                height: "1px",
                padding: "0",
                boxSizing: "border-box",
                margin: "10px 0px",
              }}
            />
            <li
              style={{ marginBottom: "10px", margin: 0, cursor: "pointer", fontWeight: "500", fontSize: "15px" }}
              onClick={() => handleNavigation("/mypage")}
            >
              {lang == "eng" ? "My Page" : "Omat edut"}
            </li>
            <div
              style={{
                backgroundColor: "#1C0056",
                width: "100%",
                height: "1px",
                padding: "0",
                boxSizing: "border-box",
                margin: "10px 0px",
              }}
            />
            <li
              style={{ marginBottom: "10px", margin: 0, cursor: "pointer", fontWeight: "500", fontSize: "15px" }}
              onClick={() => handleNavigation("/aboutService")}
            >
              {lang == "eng" ? "About Services" : "Palvelut"}
            </li>
            <div
              style={{
                backgroundColor: "#1C0056",
                width: "100%",
                height: "1px",
                padding: "0",
                boxSizing: "border-box",
                margin: "10px 0px",
              }}
            />
            <li
              style={{ marginBottom: "10px", margin: 0, cursor: "pointer", fontWeight: "500", fontSize: "15px" }}
              onClick={() => handleNavigation("/privacy-policy")}
            >
              {lang == "eng" ? "Terms and Condition & Privacy Policy" : "Käyttöehdot ja Tietosuojakäytäntö" }
            </li>
            <div
              style={{
                backgroundColor: "#1C0056",
                width: "100%",
                height: "1px",
                padding: "0",
                boxSizing: "border-box",
                margin: "10px 0px",
              }}
            />
            <li
              style={{ marginBottom: "10px", margin: 0, cursor: "pointer", fontWeight: "500", fontSize: "15px" }}
              onClick={() => handleNavigation("/contactFaq")}
            >
              {lang == "eng" ? "Contact Us & FAQs" : "Ota Yhteyttä & UKK"}
            </li>
            <div
              style={{
                backgroundColor: "#1C0056",
                width: "100%",
                height: "1px",
                padding: "0",
                boxSizing: "border-box",
                margin: "10px 0px",
              }}
            />
            <li
              style={{ marginBottom: "10px", margin: 0, cursor: "pointer", fontWeight: "500", fontSize: "15px" }}
              onClick={() => {
                if (location.pathname !== "/") {
                  setIsLogoutModalOpen(true);
                  setShowPage(false);
                }
                setShowPage(false);
              }}
            >
              {lang == "eng" ? "Logout" : "Kirjaudu Ulos"}
            </li>
          </ul>
        </div>
      </div>

      <LogoutModal
        isModalOpen={isLogoutModalOpen}
        setIsModalOpen={setIsLogoutModalOpen}
      />
    </div>
  );
};

export default React.memo(SlidingPage);
