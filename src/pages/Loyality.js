import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";
import starIcon from "../assets/icons/startPattern.png";
import loyality_background from "../assets/images/loyality_bg.png";
import "../styles/loyality.css";
import { Button } from "react-bootstrap";
import BottomSheet from "../components/BottomSheet";
import Reward from "../components/Reward";
import { useLocation, useNavigate } from "react-router-dom";
import Line22 from "../assets/icons/line222.png";
import { useDispatch } from "react-redux";
import { reedemLoyalityCard } from "../store/slices/clientSlice";
import { getMySQLFormattedTimestamp, getRemainingTime } from "../assets/common";

const Loyality = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { data } = location.state || {};

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
      "loyalty_card_table_id":data?.loyalty_card_table_id,
      "user_id": JSON.parse(localStorage.getItem("nfc-app"))?.user_id,
      "last_stamp_click_time": getMySQLFormattedTimestamp(),
      "total_open_stamps": (Number(data?.total_open_stamps) === Number(data?.number_of_stamps)) ? Number(data?.number_of_stamps) : (Number(data?.total_open_stamps) === null || isNaN(Number(data?.total_open_stamps))) ? 1 
        : Number(data?.total_open_stamps) + 1,
      "completed_status": completed_status,
    }
    dispatch(reedemLoyalityCard(payload))
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
            Thanks for your Loyalty
          </p>
          <div className="loyality-grid">
            {[...Array(Number(data?.number_of_stamps || 9))].map((_, index) => {
              const totalStamps = Number(user?.total_open_stamps) ?? 0;
              const isRedeemed = index < totalStamps;
              const isClickable = index === totalStamps;

              return (
                <div
                  key={index}
                  className={`loyality-item ${isRedeemed ? "redeemed" : ""}`}
                  onClick={() => isClickable && handleFlip(index)}
                >
                  <div className="loyality-item-inner">
                    <div className="loyality-item-front">
                      {isRedeemed ? (
                        <img src={starIcon} alt="Redeemed" />
                      ) : index + 1 == Number(data?.number_of_stamps) ? (
                        <span
                          style={{
                            fontSize: "14px",
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
                            fontSize:"14px",
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
          <Button style={{ backgroundColor: (Number(data?.number_of_stamps) === Number(user?.total_open_stamps)) ? "#2A0181" : "#4F4F4F", border: "#4F4F4F" }} disabled={!(Number(data?.number_of_stamps) === Number(user?.total_open_stamps))} onClick={() => handleConfirm({completed_status : 1})}>
            ACTIVATE
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
                Coupon Confirmation
              </h2>
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
              <p>I confirm that I want to activate the coupon.</p>
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

                onClick={() => setIsSliderOpen(false)}>RETURN</button>
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
              <p style={{color:"black", paddingTop:"10px"}}>Note: The coupon is valid for 15 minutes after activation.</p>
            </div>
          </BottomSheet>
          {coupanPopup && (
            <Reward
              showPopup={coupanPopup}
              onClose={() => {
                setCoupanPopup(false);
                navigate(data?.url);
              }}
              timer = {data?.expiration_time}
              countText={ 
                confirmCompleted
                  ? (data?.free_items_name || "Task Completed")
                  : `${Number(user?.total_open_stamps) + 1 ?? 1} / ${data?.number_of_stamps}`
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Loyality;
