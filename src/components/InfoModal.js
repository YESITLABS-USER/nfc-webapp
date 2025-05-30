// import React, { useEffect } from "react";
// import { IoIosCloseCircle } from "react-icons/io";

// const InfotModal = ({ isModalOpen, setIsModalOpen }) => {
//   const closeModal = () => setIsModalOpen(false);

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
//             zIndex: "101",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "#2E0090",
//               padding: "20px",
//               borderRadius: "30px",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//               textAlign: "center",
//               width: "90%",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 position: "relative",
//                 textAlign: "start",
//               }}
//             >
//               <h2 style={{ color: "#FFFFFF", fontSize: 22 }}>Information</h2>
//               <IoIosCloseCircle
//                 color={"white"}
//                 size={30}
//                 style={{
//                   position: "absolute",
//                   right: "5px",
//                   cursor: "pointer",
//                   top: "-10px",
//                 }}
//                 onClick={closeModal}
//               />
//             </div>
//             <p style={{ color: "#FFFFFF", textAlign: "center" }}>
//               Discover exclusive promotions from businesses on Tagis. By
//               following businesses, you can access special campaigns and unique
//               discounts crafted for loyal customers. Here’s what you can expect:
//               <br />
//               <br />
//               <ul>
//                 <li>
//                   Welcome Discounts: Many businesses offer first-time coupons as
//                   a thank-you for following them.{" "}
//                 </li>
//               </ul>
//               <ul>
//                 <li>
//                   Loyalty Rewards: Earn additional rewards with every tap or
//                   after a certain number of visits.
//                 </li>
//               </ul>
//               <br />
//               <ul>
//                 <li>
//                   Seasonal & Limited-Time Offers: Get notified about seasonal
//                   deals and limited-time promotions that you won’t want to miss!
//                 </li>
//               </ul>
//               <br />
//               <p>
//                 Tap Follow on your favorite businesses to unlock their offers
//                 and receive updates directly to your Tagis Wallet.
//               </p>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InfotModal;
//

//

import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const InfotModal = ({ isModalOpen, setIsModalOpen }) => {
      const lang = localStorage.getItem("language") || "eng";

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
            zIndex: "101",
            flexWrap: "wrap",
            overflowY: "scroll",
            padding: "10px 0"
          }}
        >
          <div
            style={{
              backgroundColor: "#2E0090",
              padding: "20px",
              borderRadius: "30px",
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
                textAlign: "start",
              }}
            >
              <h2 style={{ color: "#FFFFFF", fontSize: 22 }}>Information</h2>
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
            <p style={{ color: "#FFFFFF", textAlign: "left" }}>
              <span style={{ display: "inline-block" }}>
                {lang == "eng" ? "Discover exclusive promotions from businesses on Tagis. By following businesses, you can access special campaigns and unique discounts crafted for loyal customers. Here’s what you can expect:" : "Löydä eksklusiivisia tarjouksia Tagis-yrityksiltä. Seuraamalla yrityksiä pääset käsiksi erikoiskampanjoihin ja uniikkeihin alennuksiin, jotka on suunniteltu kanta-asiakkaille. Tässä mitä voit odottaa:"}
              </span>
            </p>
            <p style={{ color: "#FFFFFF", textAlign: "left" }}>
              <ul>
                <li>
                  {lang == "eng" ? "Welcome Discounts: Many businesses offer first-time coupons as a thank-you for following them." : "Tervetuliaisalennukset: Monet yritykset tarjoavat ensikertalaisen kuponkeja kiitoksena seurannasta."}
                </li>
              </ul>
              <ul>
                <li>
                  {lang == "eng" ? "Loyalty Rewards: Earn additional rewards with every tap or after a certain number of visits." : "Kanta-asiakaspalkinnot: Ansaitse lisäpalkintoja jokaisella täppäyksellä tai tietyn käyntimäärän jälkeen."}
                </li>
              </ul>
              <ul>
                <li>
                  {lang == "eng" ?  "Seasonal & Limited-Time Offers: Get notified about seasonal deals and limited-time promotions that you won’t want to miss!" : "Kausi- & Rajoitetun Ajan Tarjoukset: Saat ilmoituksia kausittaisista diileistä ja rajoitetun ajan kampanjoista, joita et halua ohittaa!"}
                </li>
              </ul>
            </p>
            <p style={{ color: "#FFFFFF", textAlign: "left" }}>
              { lang == "eng" ? "Tap Follow on your favorite businesses to unlock their offers and receive updates directly to your Tagis Wallet." : "Täppää `Seuraa` suosikkiyrityksiäsi avataksesi heidän tarjouksensa ja saadaksesi päivitykset suoraan Tagis-lompakkoosi."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfotModal;
