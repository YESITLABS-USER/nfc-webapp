import React, { useEffect, useState } from "react";
import "./App.css";
import BackgroundImg from "./assets/images/backgrounImg.png";
import Logo from "./assets/icons/logo.png";
import { BrowserRouter as Router } from "react-router-dom";
import SplashImg from "./assets/images/splashScreen.png";
import AppRoutes from "./AppRoutes";

function App() {
  const [isMobile, setIsMobile] = useState(false); // State for mobile detection
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if the user is on a mobile device
    const checkDeviceType = () => {
      const isMobileDevice = window.innerWidth <= 768; // Example breakpoint for mobile
      setIsMobile(isMobileDevice);
    };

    // Initial check on component mount
    checkDeviceType();

    // Listen for window resize to update the device type
    window.addEventListener("resize", checkDeviceType);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(splashTimer);
  }, []);

  // useEffect(() => {
  //   // Check if the splash screen has already been shown
  //   const splashShown = localStorage.getItem("splashShown");

  //   if (!splashShown) {
  //     // If not shown, show splash screen and set the flag
  //     setShowSplash(true);
  //     const splashTimer = setTimeout(() => {
  //       setShowSplash(false); // Hide splash screen after 3 seconds
  //       localStorage.setItem("splashShown", "true"); // Save the flag
  //     }, 3000);

  //     return () => clearTimeout(splashTimer); // Cleanup timer on component unmount
  //   }
  // }, []);

  if (showSplash && isMobile) {
    // Splash screen content with a background image
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${SplashImg})`, // Add the background image
          backgroundSize: "cover", // Cover the entire div
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent repetition
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          zIndex: 1000,
        }}
      ></div>
    );
  }

  return (
    <Router>
      <div>
        {/* Show the message for desktop users */}
        {!isMobile && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${BackgroundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              display: "flex",
              flexDirection: "column", // Arrange children in a column
              justifyContent: "center", // Vertically center the content
              alignItems: "center", // Horizontally center the content
              textAlign: "center",
              fontSize: "1.5em",
              padding: "20px",
              zIndex: 1000,
            }}
          >
            <img src={Logo} alt="Logo" />
            <span
              style={{ marginBottom: "10px", fontSize: 28, fontWeight: 500 }}
            >
              Welcome to Tagis!
            </span>
            <span style={{ fontSize: 35, fontWeight: 500 }}>
              Please open in your mobile phone for better experience
            </span>
          </div>
        )}
      </div>

      <AppRoutes />
    </Router>
  );
}

export default App;
