import React, { useEffect, useState } from "react";
import AddToCardImg from "../assets/icons/addToHome.svg";
import AddToCardButton from "../assets/icons/button.svg";
import { IoIosCloseCircle } from "react-icons/io";
import logo from "../assets/logo_white.png"

const AddShortCut = ({ isModalOpen, setIsModalOpen }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);
  const lang = localStorage.getItem("language") || "fin";

  const closeModal = () => {
    localStorage.setItem("nfc-shortcut", "dismissed");
    setIsModalOpen(false);
  };

  // const handleInstallClick = () => {
  //   if (isIos) {
  //     // Show iOS-specific manual instructions
  //     return;
  //   }
  //   if (deferredPrompt) {
  //     deferredPrompt.prompt();
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome == "accepted") {
  //         console.log("User accepted the A2HS prompt");
  //       }
  //       setDeferredPrompt(null);
  //       setIsModalOpen(false);
  //     });
  //   }
  // };
  
  
  const handleInstallClick = () => {
    if (isIos) {
      alert('To install this app, tap the "Share" button in Safari and select "Add to Home Screen".');
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt.");
        } else {
          console.log("User dismissed the install prompt.");
        }
      });
    }
    closeModal();
  };

  useEffect(() => {
    const savedDismissed = localStorage.getItem("nfc-shortcut");
    if (savedDismissed) {
      setIsModalOpen(false);
      return;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) && !window.navigator.standalone;
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

    setIsIos(isIOSDevice);
    setIsInStandaloneMode(isStandalone);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsModalOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);
 
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isModalOpen && !isInStandaloneMode && (
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
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "93%",
            }}
          >
            <h5
              style={{ color: "#000000", fontSize: "20px", fontWeight: "bold" }}
            >
              {isIos
                ? lang == "eng" ? "Add Tagis To Your Home Screen" : "Lisää Tagis pikakuvake näytölle"
                : lang == "eng" ? "Add Tagis To Your Home Screen" : "Lisää Tagis pikakuvake näytölle"}
            </h5>
            <IoIosCloseCircle
              color={"#2A0181"}
              size={30}
              onClick={closeModal}
              style={{
                position: "absolute",
                right: 15,
                cursor: "pointer",
                marginTop: -70,
              }}
            />

            <img
              src={AddToCardImg}
              alt="Start Pattern"
              style={{ width: "auto", height: "auto" }}
            />

            <button style={{backgroundColor:"rgb(42, 1, 129)", padding:"6px",width:"78%",fontSize:"15px", color:"white", borderRadius:"50px", marginTop:20}}> Add <img src={logo} style={{maxWidth:"25px", marginRight:"-9px", marginTop:"-10px"}} onClick={handleInstallClick}/> agis Shortcut</button>
            {/* <img
              src={AddToCardButton}
              alt="Start Pattern"
              style={{ width: "auto", height: "auto", marginTop: 20 }}
              onClick={handleInstallClick}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddShortCut;


// import React, { useEffect } from "react";

// import AddToCardImg from "../assets/icons/addToHome.svg";
// import AddToCardButton from "../assets/icons/button.svg";
// import { IoIosCloseCircle } from "react-icons/io";

// const AddShortCut = ({
//   isModalOpen,
//   setIsModalOpen,
//   handleInstallClick,
//   showInstallButton,
// }) => {
//   const closeModal = () => {localStorage.removeItem('nfc-shortcut'); setIsModalOpen(false);}

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden"; // Disable scroll
//     } else {
//       document.body.style.overflow = "auto"; // Enable scroll
//     }

//     // Cleanup on component unmount
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isModalOpen]);
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       {isModalOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               padding: "20px",
//               borderRadius: "10px",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//               textAlign: "center",
//               width: "93%",
//             }}
//           >
//             <h5
//               style={{ color: "#000000", fontSize: "20px", fontWeight: "bold" }}
//             >
//               {showInstallButton
//                 ? " Already registered"
//                 : "Add Tagis To Your Home Screen"}
//             </h5>
//             <IoIosCloseCircle
//               color={"#2A0181"}
//               size={30}
//               onClick={closeModal}
//               style={{
//                 position: "absolute",
//                 right: 15,
//                 cursor: "pointer",
//                 marginTop: -70,
//               }}
//             />
//             {showInstallButton ? (
//               "Already installed "
//             ) : (
//               <img
//                 src={AddToCardImg}
//                 alt="Start Pattern"
//                 style={{ width: "auto", height: "auto" }}
//               />
//             )}

//             <img
//               src={AddToCardButton}
//               alt="Start Pattern"
//               style={{ width: "auto", height: "auto", marginTop: 20 }}
//               onClick={handleInstallClick}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddShortCut;
