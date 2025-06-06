import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import FreeCops from "../assets/icons/freeCopsAvail.png";
import AgeModal from "./AgeModal";
import CoupanComponent from "./CoupanComponent";
import { addValidity, formatDate, getRemainingTime, parseTime } from "../assets/common";
import { updateUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { getAllCoupans } from "../store/slices/coupanSlice";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const CopsActivation = ({
  isModalOpen,
  setIsModalOpen,
  callBack,
  ageLimitaion,
  currentCoupanData,
  clientData,
  setAddlimitation,
}) => {
  const closeModal = () => setIsModalOpen(false);
  const [ageModal, setAgeModal] = useState(false);
  const [showCampaignTerms, setShowCampaignTerms] = useState(false)
  const [validDob, setValidDob] = useState(false);
  
  const dispatch = useDispatch();

  const [userDob, setUserDob] = useState(null);
  const [dobError, setDobError] = useState(null);
  const [showBirthdayPopup, setShowBirthdayPopup] = useState(false);
    const lang = localStorage.getItem("language") || "eng";


  const {user_id} = JSON?.parse(localStorage.getItem("nfc-app")) || 0;
  const client_id = localStorage.getItem("client_id");

// --------------------------------- FOR Birthday Valid or not & timeLeft CR Point--------------------------------
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    if (currentCoupanData?.activate_time_usa_zone) {
      const remainingTimeStr = getRemainingTime(currentCoupanData?.activate_time_usa_zone, "00:10:00");
      const remainingSeconds = parseTime(remainingTimeStr ?? "00:10:00");
      const targetEndTime = Date.now() + remainingSeconds * 1000;
      setEndTime(targetEndTime);
    } else {
      const validUntil = addValidity(
        currentCoupanData?.last_activation_date,
        currentCoupanData?.validity_select_number,
        currentCoupanData?.validity_select_time_unit
      );
      const remainingTimeStr = getRemainingTime(validUntil, "00:00:01");
      const remainingSeconds = parseTime(remainingTimeStr ?? "00:00:01");
      const targetEndTime = Date.now() + remainingSeconds * 1000;
      setEndTime(targetEndTime);
    }
  }, [currentCoupanData]);

  useEffect(() => {
    if (!endTime) return;

    const updateTimeLeft = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remaining);
    };

    updateTimeLeft(); // Initial check
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

    const isDobValid = (allData) => {
      const currentDate = new Date();
      const currentMonthDay = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  
      if (allData?.dob_coupon && !allData?.user_date_of_birth) {
        return true;
      }
  
      if (allData?.user_date_of_birth) {
        const userDob = new Date(allData?.user_date_of_birth);
        const validDates = new Set();
  
        for (let i = -allData?.days_before_dob; i <= allData?.days_after_dob; i++) {
          let tempDate = new Date(userDob);
          tempDate.setDate(userDob.getDate() + i);
          validDates.add(`${tempDate.getMonth() + 1}-${tempDate.getDate()}`);
        }
  
        return validDates.has(currentMonthDay);
      }
  
      return true;
    };
  
    useEffect(() => {
      const result = isDobValid(currentCoupanData);
      setValidDob(result);
    }, [currentCoupanData]);

    // ---------------------------------

  const handleDobUpdate = async () => {
    if(userDob){
      try {
        
        const response = await dispatch(updateUser({ date_of_birth: userDob, id: user_id }));
        if (response?.payload?.status == "success") {
          setShowBirthdayPopup(true);
  
          dispatch(getAllCoupans({ client_table_id: client_id, user_table_id: user_id }));
        }
      } catch (error) {
        console.error("DOB update failed", error);
      }
    } else {
      setDobError(true)
    }
  };

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

  const colorMapping = ['orange', 'blue', 'red', 'black'];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100vh",
            overflow: "auto",
            padding: "10px 0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: "10",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "30px 20px 20px 20px",
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
              <h5 style={{ color: "black", fontWeight:"bold" }}>
                {lang == "eng" ? "Congratulations, here is your coupon!" : "Onneksi olkoon, tässä on sinun etukuponki!"}
              </h5>
              <IoIosCloseCircle
                color={"#2A0181"}
                size={20}
                style={{
                  position: "absolute",
                  right: "-10px",
                  cursor: "pointer",
                  top: "-19px",
                }}
                onClick={closeModal}
              />
            </div>

            {/* <img src={FreeCops} alt="free cops" /> */}
            <div className="coupon-in">
            <div className="coupon-left">
              <div className={`coupon-left-text ${colorMapping.includes(currentCoupanData?.color_selection) || colorMapping["orange"]} ${currentCoupanData?.color_selection}-text`}>

                {/* <p>{currentCoupanData?.campaign_name || "Beverages coupon"}</p> */}
                <p> {currentCoupanData?.campaign_name?.length > 25 ? `${currentCoupanData.campaign_name.slice(0, 25)}...` : currentCoupanData?.campaign_name} </p>

                <h3> {(currentCoupanData?.coupon_type_content?.[0]?.discount_value || currentCoupanData?.coupon_type_content?.[0]?.discount_percentage) ? `${currentCoupanData?.coupon_type_content?.[0]?.discount_value || currentCoupanData?.coupon_type_content?.[0]?.discount_percentage}%` : "FREE"} </h3>
              </div>
            </div>

            <div className={`coupon-right ${colorMapping.includes(currentCoupanData?.color_selection) || colorMapping["orange"]} ${currentCoupanData?.color_selection}-bg`}>
              <div className="coupon-right-text">
                {/* <img src={OLOLogo} alt="" /> */}
                <h2>{clientData?.client_name ?? "OLO"}</h2>
                <h3> {currentCoupanData?.coupon_name} </h3>
                {/* <p>VALID UNTIL <b> {currentCoupanData?.validity_no_limit ? "No Expiration" : formatDate(currentCoupanData?.validity_expiration_date) || ""} </b></p> */}
                <p>{lang =="eng" ?  "VALID UNTIL" : "Voimassa asti"} : <b> {currentCoupanData?.validity_no_limit ? "No Expiration" : currentCoupanData?.validity_expiration_date ? formatDate(currentCoupanData?.validity_expiration_date) : "No Expiration"} </b></p>
                {/* <span>Age : 18+</span> */}
              </div>
            </div>
          </div>
            <div style={{display: "none"}}> 
              <CoupanComponent allData={currentCoupanData} clientData={clientData} occupied={currentCoupanData?.occupied} />
            </div>
            
            <div className="modal-data"> 
              <p style={{ color: "black", textAlign: "center", marginTop: 15 }}>
                {lang == "eng" ? "Activate the coupon in-store and show this at the checkout. (Coupon is valid for 15 minutes after activation) " : "Aktivoi kuponki myyjäliikkeessä ja näytä sitä kassalla. (Kuponki on käytettävissä 10 minuuttia aktivoinnin jälkeen)"}<br />
              </p>

              <p dangerouslySetInnerHTML={{ __html: currentCoupanData?.other_customization  }} />
            </div>

            {/* For Dob */}
            {(!currentCoupanData?.user_date_of_birth && currentCoupanData?.dob_coupon) ?
              <div style={{borderRadius: "10px", textAlign: "center",width: "90%", margin:"auto" }} >
                <div style={{ display: "flex", alignItems: "center",justifyContent: "center",position: "relative"}}>
                  <h3 style={{ color: "black", fontWeight: "bold", fontSize:"18px" }}>
                  { lang == "eng" ? "Confirm your age before proceeding further!!" : "Vahvista ikäsi ennen kuin jatkat!!"}
                  </h3> 
                </div>
                <h5 style={{ marginTop: 10, textAlign: "start", marginLeft: 40, color: "#000000" }}> {lang =="eng" ?"DOB" : "Syntymäaika"} </h5>
                <span style={{ color: "#9A9A9A" }}>{lang == "eng" ? "Enter your date of birth" : "Syötä syntymäaika"}</span>
                
                <input type="date" placeholder="DD/MM/YYYY" maxLength="10" 
                style={{ padding: "8px 12px", border: "1px solid #2A0181", borderRadius: "10px", fontSize: "16px",
                  width: "200px", marginBottom: "10px", borderColor: "#2A0181", }} onChange={(e) => setUserDob(e.target.value)}/>
                {dobError && <div style={{color:"red", fontSize:"14px"}}> DOB is required*</div>}
                <div style={{ marginTop: "20px" }}>
                  <button style={{ padding: "8px 12px", backgroundColor: "#2A0181", color: "white", border: "none",
                      borderRadius: "40px", cursor: "pointer", fontWeight: "bold", width: "40%" }} onClick={handleDobUpdate} 
                  > { lang == "eng" ? "Next" : "Seuraava"}
                  </button>
                </div>
              </div>
            :
            <button style={{ padding: "8px 12px", backgroundColor: ((currentCoupanData && ((timeLeft && !currentCoupanData?.activate_time_usa_zone) || currentCoupanData?.dob_coupon && !validDob)) ? "#6c757d" : "#2A0181"), color: "white", border: "none", 
                borderRadius: "4px", cursor: "pointer", fontWeight: "bold", }} disabled={currentCoupanData && ((timeLeft && !currentCoupanData?.activate_time_usa_zone) || currentCoupanData?.dob_coupon && !validDob)}
                
              onClick={() => {
                // if (ageLimitaion && currentCoupanData.campaign_age_restriction_start_age > 15) {
                if (currentCoupanData.campaign_age_restriction_start_age >= 14 && currentCoupanData?.user_age == null) {
                  setAgeModal(true);
                  setIsModalOpen(false);
                } else if(currentCoupanData.campaign_age_restriction_start_age >= currentCoupanData?.user_age && currentCoupanData?.campaign_age_restriction_start_age != 13) {
                  setAgeModal(true);
                  setIsModalOpen(false);
                } else {
                  callBack(currentCoupanData);
                }
              }} >
              {lang == "eng" ? "ACTIVATE" : "KÄYTÄ KUPONKI"} 
            </button>
            }
            <p style={{ color: "black", textAlign: "center", marginTop: 10 }}>
              {lang == "eng" ? "Read the campaign" : "Lue kampanjan"}
              <span style={{ color: "#25026E", textDecoration: "underline" }} onClick={() => setShowCampaignTerms(true)}>
                {lang == "eng" ? "terms and conditions" : "ehdot ja säännöt"} 
              </span>
              .
            </p>
          </div>
        </div>
      )}

      {showBirthdayPopup && <BirthdayPopup onClose={() => {setShowBirthdayPopup(false); setIsModalOpen(false)}} />}

      <AgeModal
        isModalOpen={ageModal}
        setIsModalOpen={setAgeModal}
        currentData = {currentCoupanData}
        callBack={callBack}
      />
      <Campaign_term_condition show={showCampaignTerms} handleClose={() => setShowCampaignTerms(false)} currentCoupanData={currentCoupanData}/>
    </div>
  );
};

export default CopsActivation;

const Campaign_term_condition = ({ show, handleClose, currentCoupanData }) => {
  return (
    <Modal className="campaign-term" show={show} onHide={handleClose} centered>
      <Modal.Body style={{ backgroundColor: "#442b99", color: "white", textAlign: "center", borderRadius: "10px", position: "relative", padding: "20px" }}>
        <IoIosCloseCircle color={"#2A0181"} size={30} style={{ position: "absolute", right: "5px", cursor: "pointer",
          top: "5px", fontSize:"30px", color:"white" }} onClick={handleClose} />
        <h5 style={{paddingTop:"20px"}}> Campaign Term's & Condition</h5>
        <p style={{ fontSize: "14px" }}> {currentCoupanData?.campaign_term_and_condition || "No term's and Condition "} </p>
      </Modal.Body>
    </Modal>
  );
};


const BirthdayPopup = ({ onClose }) => (
  <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, }} >
    <div style={{ backgroundColor: "#3F2B96", color: "white", padding: "30px 20px", borderRadius: "15px", width: "300px", textAlign: "center", position: "relative", fontSize: "14px" }} >
      <button style={{ position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", color: "white", fontSize: "20px", cursor: "pointer", }} onClick={onClose} > x </button>
      <p style={{ fontWeight: "bold" }}> Thank you for participating in the birthday campaign! </p>
      <p>Click your coupon to see detailed information, terms and conditions.</p>
    </div>
  </div>
);


// import React, { useEffect, useState } from "react";
// import { IoIosCloseCircle } from "react-icons/io";

// import FreeCops from "../assets/icons/freeCopsAvail.png";
// import AgeModal from "./AgeModal";
// import CoupanComponent from "./CoupanComponent";
// import { formatDate } from "../assets/common";

// const CopsActivation = ({
//   isModalOpen,
//   setIsModalOpen,
//   callBack,
//   ageLimitaion,
//   currentCoupanData,
//   clientData,
//   setAddlimitation,
// }) => {
//   const closeModal = () => setIsModalOpen(false);
//   const [ageModal, setAgeModal] = useState(false);

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

//   const colorMapping = ['orange', 'blue', 'red', 'black'];

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       {isModalOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100vh",
//             overflow: "auto",
//             padding: "10px 0",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "center",
//             zIndex: "10",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "#FFFFFF",
//               padding: "20px",
//               borderRadius: "25px",
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
//               }}
//             >
//               <h5 style={{ color: "black" }}>
//                 Congratulations, here is your coupon!
//               </h5>
//               <IoIosCloseCircle
//                 color={"#2A0181"}
//                 size={20}
//                 style={{
//                   position: "absolute",
//                   right: "-10px",
//                   cursor: "pointer",
//                   top: "-19px",
//                 }}
//                 onClick={closeModal}
//               />
//             </div>

//             {/* <img src={FreeCops} alt="free cops" /> */}
//             <div className="coupon-in">
//             <div className="coupon-left">
//               <div className={`coupon-left-text ${colorMapping.includes(currentCoupanData?.color_selection) || colorMapping["orange"]} ${currentCoupanData?.color_selection}-text`}>

//                 <p>{currentCoupanData?.campaign_name || "Beverages coupon"}</p>
//                 <h3> {(currentCoupanData?.coupon_type_content?.[0]?.discount_value || currentCoupanData?.coupon_type_content?.[0]?.discount_percentage) ? `${currentCoupanData?.coupon_type_content?.[0]?.discount_value || currentCoupanData?.coupon_type_content?.[0]?.discount_percentage}%` : "FREE"} </h3>
//               </div>
//             </div>

//             <div className={`coupon-right ${colorMapping.includes(currentCoupanData?.color_selection) || colorMapping["orange"]} ${currentCoupanData?.color_selection}-bg`}>
//               <div className="coupon-right-text">
//                 {/* <img src={OLOLogo} alt="" /> */}
//                 <h2>{clientData?.client_name ?? "OLO"}</h2>
//                 <h3> {currentCoupanData?.coupon_name} </h3>
//                 {/* <p>VALID UNTIL <b> {currentCoupanData?.validity_no_limit ? "No Expiration" : formatDate(currentCoupanData?.validity_expiration_date) || ""} </b></p> */}
//                 <p>VALID UNTIL : <b> {currentCoupanData?.validity_no_limit ? "No Expiration" : currentCoupanData?.validity_expiration_date ? formatDate(currentCoupanData?.validity_expiration_date) : "No Expiration"} </b></p>
//                 {/* <span>Age : 18+</span> */}
//               </div>
//             </div>
//           </div>
//             <div style={{display: "none"}}> 
//               <CoupanComponent allData={currentCoupanData} clientData={clientData} occupied={currentCoupanData?.occupied} />
//             </div>
            
//             <div> 
//               <p style={{ color: "black", textAlign: "center", marginTop: 15 }}>
//                 Activate the coupon in-store and show this at the checkout.
//                 (Coupon is valid for 15 minutes after activation) <br />
//               </p>

//               <p style={{minHeight:'250px'}} dangerouslySetInnerHTML={{ __html: currentCoupanData?.other_customization  }} />
//             </div>

//             <button style={{ padding: "8px 12px", backgroundColor: "#2A0181", color: "white", border: "none", 
//                 borderRadius: "4px", cursor: "pointer", fontWeight: "bold", }}
//               onClick={() => {
//                 if (ageLimitaion) {
//                   setAgeModal(true);
//                   setIsModalOpen(false);
//                 } else {
//                   callBack(currentCoupanData);
//                 }
//               }} >
//               ACTIVATE
//             </button>
//             <p style={{ color: "black", textAlign: "center", marginTop: 10 }}>
//               Read the campaign{" "}
//               <span style={{ color: "#25026E", textDecoration: "underline" }}>
//                 terms and conditions
//               </span>
//               .
//             </p>
//           </div>
//         </div>
//       )}
//       <AgeModal
//         isModalOpen={ageModal}
//         setIsModalOpen={setAgeModal}
//         currentData = {currentCoupanData}
//         callBack={callBack}
//       />
//     </div>
//   );
// };

// export default CopsActivation;


