
import React, { useEffect } from "react";
import AddToCardImg from "../assets/icons/addToHome.svg";
import AddToCardButton from "../assets/icons/button.svg";
import { IoIosCloseCircle } from "react-icons/io";

const AddShortCut = ({
  isModalOpen,
  setIsModalOpen,
  handleInstallClick,
  isIos,
  canInstall,
}) => {
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "90%",
            position: "relative",
          }}
        >
          <IoIosCloseCircle
            color={"#2A0181"}
            size={30}
            onClick={closeModal}
            style={{
              position: "absolute",
              right: 15,
              top: 15,
              cursor: "pointer",
            }}
          />

          <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
            Add Tagis To Your Home Screen
          </h5>

          <img
            src={AddToCardImg}
            alt="Install Illustration"
            style={{ width: "auto", height: "auto", marginTop: 20 }}
          />

          {isIos ? (
            <p style={{ marginTop: 20, padding: "0 10px", fontSize: "14px" }}>
              1. Tap the <strong>Share</strong> button in Safari. <br />
              2. Select <strong>"Add to Home Screen"</strong>.
            </p>
          ) : (
            canInstall && (
              <img
                src={AddToCardButton}
                alt="Install Button"
                style={{ width: "auto", height: "auto", marginTop: 20, cursor: "pointer" }}
                onClick={handleInstallClick}
              />
            )
          )}
        </div>
      </div>
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
