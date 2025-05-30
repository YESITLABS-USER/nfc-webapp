import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";
// import starIcon from "../assets/icons/startPattern.png";
import logo from "../assets/logo_black.png"
import loyality_background from "../assets/images/loyality_bg.png";
import "../styles/loyality.css";
import { Button } from "react-bootstrap";
import BottomSheet from "../components/BottomSheet";
import Reward from "../components/Reward";
import { useLocation, useNavigate } from "react-router-dom";
import Line22 from "../assets/icons/line222.png";
import { useDispatch } from "react-redux";
import { getAllActivatedLoyalityCards, getAllLoyalityCards, reedemLoyalityCard } from "../store/slices/clientSlice";
import { getMySQLFormattedTimestamp, getRemainingTime } from "../assets/common";

const Loyality = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { data } = location.state || {};
  const lang = localStorage.getItem("language") || "eng";

  useEffect(() => {
    if (!data) {
      navigate("/dashboard");
    }
  }, [data, navigate]);

  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [coupanPopup, setCoupanPopup] = useState(false);
  const [confirmCompleted, setConfirmCompleted] = useState(false);

  const [user, setUser] = useState(data);

  const handleFlip = (index) => {
    setIsSliderOpen(true);
  };

  const handleConfirm = ({completed_status = 0}) => {
    // setUser((prev) => ({ ...prev,
    //   total_open_stamps: (prev?.total_open_stamps ?? 0) + 1,
    //   }));
    setConfirmCompleted(completed_status);

    setIsSliderOpen(false);
    setCoupanPopup(true);
    const payload = {
      "client_table_id" : localStorage.getItem("client_id"),
      "loyalty_card_table_id":data?.loyalty_card_table_id,
      "user_id": JSON.parse(localStorage.getItem("nfc-app"))?.user_id,
      "last_stamp_click_time": getMySQLFormattedTimestamp(),
      "total_open_stamps": (Number(data?.total_open_stamps) == Number(data?.number_of_stamps)) ? Number(data?.number_of_stamps) : (Number(data?.total_open_stamps) == null || isNaN(Number(data?.total_open_stamps))) ? 1 
        : Number(data?.total_open_stamps) + 1,
      // "completed_status": completed_status,
      "completed_status": 1,
    }
    const res = dispatch(reedemLoyalityCard(payload))

    if(res) {
      const client_id = localStorage.getItem("client_id");

      dispatch(getAllLoyalityCards({client_table_id: client_id, "user_id": JSON.parse(localStorage.getItem("nfc-app"))?.user_id}))
      dispatch(getAllActivatedLoyalityCards({client_table_id: client_id, "user_id": JSON.parse(localStorage.getItem("nfc-app"))?.user_id}))
    }
  }

  return (
    <div className="loyality-container">
      <OnboardHeader disabled={true} />
      <div
        className="loyality-section"
        style={{ backgroundImage: `url(${loyality_background})` }}
      >
        <div className="loyality-content">
          <p style={{ fontSize: 22, color: "black", fontWeight: "700" }}>
            {lang == "eng" ? "Thanks for your Loyalty" : "Kiitos asiakkuudestasi"}
          </p>
          <div className="loyality-grid">
            {[...Array(Number(data?.number_of_stamps || 9))].map((_, index) => {
              const totalStamps = Number(user?.total_open_stamps) ?? 0;
              const isRedeemed = index < totalStamps;
              // const isClickable = index == totalStamps;
              
              // if condition is no of stamp + free item then add 1 [...Array(Number(data?.number_of_stamps || 9)+1)] and
              // const isLastStamp = index === Number(data?.number_of_stamps); 

              return (
                <div
                  key={index}
                  className={`loyality-item ${isRedeemed ? "redeemed" : ""}`}
                  // onClick={() => isClickable && handleFlip(index)}
                >
                  <div className="loyality-item-inner">
                    <div className="loyality-item-front">
                      {isRedeemed ? (
                        <img src={logo} alt="Redeemed" style={{backgroundColor:"white"}}/>
                      ) : index + 1 == Number(data?.number_of_stamps) ? (
                        <span
                          style={{
                            fontSize: "12px",
                            border: "3px solid white",
                            width: "90%",
                            height: "90%",
                            margin: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {data?.free_items_name}
                        </span>
                      ) : (
                        <>
                          {index + 1 == Number(data?.number_of_stamps) ? <span style={{
                            fontSize:"12px",
                            border: "3px solid white",
                            width:"90%",
                            height:"90%",
                            margin:"5px",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                          }}>{data?.free_items_name}</span> : index+1}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reward-info">
            <h5>After {data?.number_of_stamps || 9} Sessions You Can Get</h5>
            <p>{data?.free_items_name || "Free Ice Cream"}</p>
          </div>
          <Button style={{ backgroundColor: "#2A0181", border: "#4F4F4F", marginRight:"5px" }} onClick={() => navigate((-1) || "/dashboard")}>
            {lang == "eng" ? "Back" : "Takaisin"} 
          </Button>
          <Button style={{ backgroundColor: (Number(data?.number_of_stamps) <= Number(user?.total_open_stamps)) ? "#2A0181" : "#4F4F4F", border: "#4F4F4F" }} disabled={!(Number(data?.number_of_stamps) <= Number(user?.total_open_stamps))} onClick={() => setIsSliderOpen(true)}>
            {lang == "eng" ? "ACTIVATE" : "KÄYTÄ KUPONKI"} 
          </Button>

          <BottomSheet isOpen={isSliderOpen}>
          <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <img src={Line22} alt="line22" style={{ marginTop: 20 }} />
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "#000000",
                  paddingTop: "20px",
                }}
              >
                {lang == "eng" ? "Coupon Confirmation" : "Vahvista etusetelin käyttö"}              </h2>
              <div
                style={{
                  backgroundColor: "#E0E0E0",
                  width: "100%",
                  height: "3px",
                  padding: "0",
                  boxSizing: "border-box",
                  marginBottom: "20px",
                  borderTop: "2px solid #E1E1E1",
                }}
              />
              <p>{lang == "eng" ? "I confirm that I want to activate the coupon." : "Haluan aktivoida etusetelin käytettäväksi"}</p>
              <div className="button-group">
                <button
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#FFFFFF",
                    color: "Black",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s ease",
                  }}

                onClick={() => setIsSliderOpen(false)}>{lang == "eng" ? "RETURN" : "Takaisin"}</button>
                <button
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#2A0181",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s ease",
                    marginLeft: 20,
                  }}

                  onClick={handleConfirm}>
                  ACTIVATE
                </button>
              </div>
              <p style={{color:"black", paddingTop:"10px"}}>{lang == "eng" ? "Note: The coupon is valid for 10 minutes after activation." : " Huom: Etuseteli on käytettävissä 10 minuuttia aktivoinnin jälkeen"}</p>
            </div>
          </BottomSheet>
          {coupanPopup && (
            <Reward
              showPopup={coupanPopup}
              clientLogo={data?.clientLogo}
              onClose={() => {
                setCoupanPopup(false);
                const client_id = localStorage.getItem("client_id");
                const res = dispatch(getAllLoyalityCards({client_table_id: client_id, "user_id": JSON.parse(localStorage.getItem("nfc-app"))?.user_id}))
                if(res) {
                  navigate(data?.url);
                }
              }}

              timer = {data?.last_stamp_click_time ? getRemainingTime(data?.last_stamp_click_time, "00:10:00") :"00:10:00" }
              // timer = {data?.expiration_time}
              countText={lang == "eng" ? `Here IS YOUR ${data?.free_items_name} COUPON` : `Tässä on SINUN ${data?.free_items_name} -KUPONKISI` || "Task Completed"
                // confirmCompleted
                //   ? (data?.free_items_name || "Task Completed")
                //   // : `${Number(user?.total_open_stamps) + 1 ?? 1} / ${data?.number_of_stamps}`
                //   : `${Number(user?.total_open_stamps) > Number(data?.number_of_stamps) ? Number(data?.number_of_stamps) : Number(user?.total_open_stamps)}/${Number(data?.number_of_stamps)}`
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Loyality;
