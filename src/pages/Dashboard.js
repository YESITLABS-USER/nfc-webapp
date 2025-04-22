import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";
import HomeImg from "../assets/icons/homeImg.png";
import { FaChevronDown } from "react-icons/fa";
import "../styles/header.css";
import GoogleReview from "../assets/icons/googleReview.svg";
import OLO from "../assets/icons/header.png";
import OpeingHrs from "../assets/icons/openingHrs.svg";
import Line22 from "../assets/icons/line222.png";
import ThickLine from "../assets/icons/thickLine.png";
import greenValueImg from "../assets/icons/img1.svg";
import experienceImg from "../assets/icons/img2.svg";
import meat from "../assets/icons/img3.svg";
import CopsActivation from "../components/CopsActivation";
import BottomSheet from "../components/BottomSheet";
import Reward from "../components/Reward";
import CoupanComponent from "../components/CoupanComponent";
import { useDispatch, useSelector } from "react-redux";
import {  getAllLoyalityCards, getClientInfo } from "../store/slices/clientSlice";
import { Button, Modal } from "react-bootstrap";
import LoyaltyCardImgComponent from "../components/LoyaltyCard";
import { formatDate, getRemainingTime } from "../assets/common";
import { useNavigate } from "react-router-dom";
import { activateCoupan, getAllActivatedCoupans, getAllCoupans } from "../store/slices/coupanSlice";
import AddShortCut from "../components/AddShortCut";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const client_id = localStorage.getItem("client_id");
  const storedData = JSON.parse(localStorage.getItem("nfc-app")) || {};
  const { user_id } = storedData;

  const { clientData, loyalityCards, loading } = useSelector((state) => state.client)
  const { coupansData, activatedCoupanData,coupanReward } = useSelector((state) => state.coupans);

  const [isExpanded, setIsExpanded] = useState(false);

  const [freeCops, setFreeCops] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [ageLimitaion, setAddlimitation] = useState(false);
  const [coupanPopup, setCoupanPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showAllLoyality, setShowAllLoyality] = useState(false);
  const [currentCoupanData, setCurrentCoupanData] = useState(null);
  const [show, setShow ] = useState(false);

  const handleToggle = () => { setIsExpanded(!isExpanded) };

  useEffect(() => {
    if (!client_id || !user_id) {
      localStorage.removeItem("nfc-app");
      navigate("/");
    } else {
      dispatch(getClientInfo({ client_table_id: client_id, user_id: user_id }));
      dispatch(getAllLoyalityCards({ client_table_id: client_id, user_id: user_id }));
      dispatch(getAllCoupans({ client_table_id: client_id, user_table_id: user_id }));
      dispatch(getAllActivatedCoupans({ client_table_id: client_id, user_table_id: user_id }));
    }
  }, [dispatch,coupanReward, client_id, user_id, navigate]);

  // Toggle function to show/hide opening hours
  const toggleOpenHours = () => { setIsOpen(!isOpen) };

  const handleBottmSheet = (val) => {
    if (val?.dob_coupon && val?.user_date_of_birth == null) {
      setIsSliderOpen(false);
      if(val?.validAge) {
        setShow(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } else {
      if(val?.campaign_age_restriction_start_age >= 18 && !val?.user_date_of_birth) {
        setIsSliderOpen(false)
      } else {
        setIsSliderOpen(val);
      }
    }
  };

  const handleActivateCoupanBtn = async (coupanData) => {
    try {
      await dispatch(activateCoupan({ client_table_id: client_id, user_table_id: user_id, coupon_table_id: currentCoupanData?.coupon_table_id }));

      await dispatch(getAllCoupans({ client_table_id: client_id, user_table_id: user_id }));

      setIsSliderOpen(false);
    } catch (error) {
      console.error("Error activating coupon:", error);
      setIsSliderOpen(false);
      setCoupanPopup(false)
    }
  }

  const visibleLoyalityCards = showAllLoyality ? loyalityCards : loyalityCards?.slice(0, 2);

  const handleSeeMore = () => {
    setShowAllLoyality(!showAllLoyality);
    if (!showAllLoyality) {
      setTimeout(() => {
        document.getElementById('see-more-button')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // For Shortcut Popup
  const isOpenPopup = localStorage.getItem('nfc-shortcut');
  const [addToShort, setToShortCut] = useState(isOpenPopup ?? false);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Detect if the user is on iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));

    // Listen for the 'beforeinstallprompt' event (for Android)
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent the mini-infobar from appearing
      setDeferredPrompt(event);
      setShowInstallButton(true); // Show the "Add to Home Screen" button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup the event listener
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

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
        setDeferredPrompt(null); // Clear the prompt after use
      });
    }
    setToShortCut(false);
    localStorage.removeItem('nfc-shortcut')
  };

  if (!clientData || clientData.length === 0) {
    return (
      <>
        <OnboardHeader disabled={true} OLODISABLE={true} />
        <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", fontWeight:"bold", fontSize:"20px", height:"70vh"}}>
          No Client information Found
        <p style={{fontWeight:"normal", fontSize:"14px"}}> Please change the language </p>
        </div>
      </>
    );
  }
  

  return (
    <>
      <OnboardHeader disabled={true} OLODISABLE={true} />

      <div style={{ display: "flex", alignItems: "center", paddingBottom: "50px", paddingTop: "10px", paddingLeft: "15px", paddingRight: "15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img src={clientData?.company_logo ? backendUrl + "/" + clientData?.company_logo : OLO} alt={clientData?.client_name || "OLO"} style={{ width: "72px", height: "72px", borderRadius:"10px" }} />
          <div style={{ display: "flex", flexDirection: "column", }}>
            <span className="restaurant-name" style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
              {clientData?.client_name || "Olo"}
            </span>
            <span className="location" style={{ fontSize: "14px", color: "#777" }}>
              {clientData?.location_name || "Helsinki, Finland"}
            </span>
          </div>
        </div>
      </div>
      
      {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "50px", paddingTop: "10px", paddingLeft: "15px", paddingRight: "15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img src={clientData?.company_logo ? backendUrl + "/" + clientData?.company_logo : OLO} alt={clientData?.client_name || "OLO"} style={{ width: "72px", height: "72px", borderRadius:"10px" }} />
          <div style={{ display: "flex", flexDirection: "column", }}>
            <span className="restaurant-name" style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
              {clientData?.client_name?.length > 10 ? `${clientData?.client_name?.slice(0, 10)}...` : clientData?.client_name || "Olo"}
            </span>
            <span className="location" style={{ fontSize: "14px", color: "#777" }}>
              {clientData?.location_name?.length > 10 ? `${clientData?.location_name?.slice(0, 10)}...` : clientData?.location_name || "Helsinki, Finland"}
            </span>
          </div>
        </div>

        <Button style={{
          backgroundColor: "white", border: "2px solid #DCCBFF", color: "black", height: "fit-content",
          padding: "6px 12px", display: "flex", justifyContent: "center", alignItems: "center",
          borderRadius: "5px", fontSize: "14px", fontWeight: "500"
        }}>
          <img src={bell} alt="follow" style={{ width: "34px", height: "29px", marginRight: "5px" }} />
          <span>Follow</span>
        </Button>
      </div> */}

      {/* For time */}
      <div style={{ backgroundColor: "#E0E0E0", width: "100%", height: "3px", padding: "0", boxSizing: "border-box", marginTop: -30, }} />

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {isOpen && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <ul style={{ listStyleType: "none", padding: "0% 5% 3% 5%", width: "100%", margin: "0", fontFamily: "Arial, sans-serif", }} >
              {
                clientData?.opening_hours.map((item, index) => (
                  <li style={{ display: "flex", width: "100%", fontSize: "14px", marginBottom: "10px" }} key={index}>
                    <span style={{ fontWeight: "bold", width: "100%", color: "black", width: "100%", textAlign: "start" }} > {item?.day}: </span>
                    {item?.isClosed ? <span style={{ width: "100%", textAlign: "end" }}> Closed </span> : <span style={{ width: "100%", textAlign: "end" }}>{item?.startTime} - {item?.endTime}</span>}
                  </li>
                ))
              }
            </ul>
          </div>
        )}

        {isOpen && (
          <div style={{
            backgroundColor: "#E0E0E0", height: "3px", padding: "0", boxSizing: "border-box",
            width: "100%",
          }} />
        )}

        <img src={OpeingHrs} style={{ objectFit: "contain", width: "200" }} onClick={toggleOpenHours} alt="open btn" />
      </div>

      {/* Client Image And slogan  */}
      <div style={{ position: "relative" }}>
        <img src={clientData?.company_photo ? backendUrl + "/" + clientData?.company_photo : HomeImg} alt="homeImg" style={{ objectFit: "contain", width: "100%", filter: "brightness(70%)" }} />
        <span style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          color: "white", fontSize: "24px", textAlign: 'center', fontWeight: "bold"
        }}> {clientData?.company_slogam} </span>
      </div>

      {/* About Client */}
      <div style={{ textAlign: "left", margin: "0 auto", width: "90%", padding: "10px 0" }}>
        <span style={{ fontSize: 20, fontWeight: "bolder" }}>About</span>

        <div>
          <p> {isExpanded ? clientData?.business_about_us : clientData?.business_about_us?.slice(0, 180)}
            {clientData?.business_about_us?.length > 180 && (
              <span onClick={handleToggle} style={{ color: "#25026E", padding: "0 5px", cursor: "pointer", fontWeight: "bold", }}>
                {isExpanded ? "Read less..." : "Read more..."}
              </span>
            )}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", }}>
        <h3 style={{ marginBottom: "20px", fontWeight: "bolder" }}>EXPLORE OUR COUPONS</h3>

        {/* <LoyaltyCard /> */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderRadius: "10px",
          width: "90%", alignItems: "center", }} >
          
          {visibleLoyalityCards?.map((item, index) => {
            return (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }} key={index} >
                <LoyaltyCardImgComponent
                  allData={item}
                  clientLogo={clientData?.company_logo ? backendUrl + "/" + clientData?.company_logo : null}
                  campaign_name={item?.campaign_name}
                  free_item={item?.free_items_name}
                  total_stamps={item?.number_of_stamps}
                  open_stamps={item?.total_open_stamps ?? "0"}
                  end_date={item?.no_expiration ? "No Expiration" : formatDate(item?.expiration_date)}
                />
              </div>
            );
          })}

          {loyalityCards?.length > 2 && (
            <button style={{ padding: "10px 20px", backgroundColor: "#25026E", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", }} onClick={handleSeeMore} >
              {showAllLoyality ? "See Less" : "See More"}
              <FaChevronDown style={{ marginLeft: "10px", rotate: `${showAllLoyality ? "180deg" : "0deg"}` }} />
            </button>
          )}
        </div>
 
        <div className={`coupon-wrap ${showAll ? "custom-scrollbar" : ""}`}  style={{ height :showAll ? "545px" : "auto"}}>
          {(coupansData.length == 0 && activatedCoupanData?.length == 0) ? (<p style={{textAlign:"center"}}>No coupon available</p>) : (
            coupansData.slice(0, showAll ? coupansData?.length : 3).map((coupan, index) => (
              <CoupanComponent
                key={index}
                allData={coupan}
                clientData={clientData}
                occupied={coupan?.occupied}
                onClick={() => {
                  // coupan?.coupon_last_activate_date_time != null ? setCoupanPopup(true) : setCoupanPopup(false)
                  setCurrentCoupanData(coupan);
                  if ((coupan?.campaign_age_restriction_start_age >= 18 && coupan?.user_age <= 18) || (coupan?.dob_coupon != 1 && !(coupan?.user_date_of_birth))) {
                    setFreeCops(true);
                    setAddlimitation(true);
                  } else {
                    setFreeCops(true);
                    setAddlimitation(false);
                  }
                }}
              />
            ))
          )}

          {activatedCoupanData.length == 0 ? "" : (
            activatedCoupanData.map((coupan, index) => (
              <>
              <CoupanComponent
                key={index}
                allData={coupan}
                clientData={clientData}
                occupied={coupan?.occupied}
                onClick={() => {
                  coupan?.activate_time_usa_zone != null ? setCoupanPopup(true) : setCoupanPopup(false)
                  setCurrentCoupanData(coupan);
                  if ((coupan?.campaign_age_restriction_start_age >= 18 && coupan?.user_age <= 18) || (coupan?.dob_coupon == 1)) {
                    setFreeCops(true);
                    setAddlimitation(true);
                  } else {
                    setFreeCops(true);
                    setAddlimitation(false);
                  }
                }}
              /></>
            ))
          )}
        </div>

        {coupansData?.length > 3 && (
          <button onClick={() => setShowAll(!showAll)} // Implement your logic here
            style={{
              marginTop: "20px", padding: "10px 20px", backgroundColor: "#25026E", color: "white",
              border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold",
            }} >
            {showAll ? "See Less" : "See More"}
            <FaChevronDown style={{ marginLeft: "10px", rotate: `${showAll ? "180deg" : "0deg"}`, }} />
          </button>
        )}
      </div>

      {/* Green value, 10 year Experience, local meat */}
      <div className="green-values">
        <div className="green-values-in">
          <img src={greenValueImg} alt="Green Value" /> Green values
        </div>
        <div className="green-values-in">
          <img src={experienceImg} alt="Experience" />  Over 10 years <br /> of experience
        </div>
        <div className="green-values-in">
          <img src={meat} alt="meat" /> We use local <br /> meat
        </div>
      </div>

      {/* Google Review Image & and Button */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <img src={GoogleReview} alt="Star Pattern" className="start-img"
          style={{ width: "auto", height: "auto" }} />
      </div>

      <a href={(() => {
        const reviewLink = clientData?.google_review_link;
        if (reviewLink) {
          // Check if the link contains 'http' or 'https', and format accordingly
          return reviewLink.startsWith('http') || reviewLink.startsWith('https')
            ? reviewLink : `https://${reviewLink}`;
        }
        return '#';
      })()}
        target="_blank"
        style={{
          backgroundColor: "rgb(42, 1, 129)", color: "white", borderRadius: "10px", width: '50%',
          height: "50px", border: "none", cursor: "pointer", boxShadow: "rgba(0, 0, 0, 0.25) 0px 10px 10px 0px",
          display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', fontSize: '16px', margin: "15px auto"
        }} > Leave a Review
      </a>

      {/* <CustomButton text="Leave a Review" onClick={} fullWidth={"50%"} borderRadus={true} /> */}

      <CopsActivation
        isModalOpen={freeCops && !currentCoupanData?.activate_time_usa_zone}
        setIsModalOpen={setFreeCops}
        callBack={handleBottmSheet}
        ageLimitaion={ageLimitaion}
        setAddlimitation={setAddlimitation}
        currentCoupanData={currentCoupanData}
        clientData={clientData}
      />

      <BottomSheet isOpen={isSliderOpen}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", }} >
          <img src={Line22} alt="line22" style={{ marginTop: 20 }} />

          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#000000", paddingTop: "20px", fontWeight: "600", }} > Coupon Confirmation </h2>

          <img src={ThickLine} alt="thick tline" style={{ marginBottom: 30 }} />
          <p style={{ textAlign: "center", marginBottom: "10px", color: "black" }}>
            I confirm that I want to activate the coupon.
          </p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", margin: 10, }} >
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#FFFFFF",
                color: "Black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow here
                transition: "box-shadow 0.3s ease", // Smooth transition for hover effect
              }}
              onClick={() => {
                setIsSliderOpen(false);
                setFreeCops(false);
              }} >
              RETURN
            </button>
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#2A0181",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow here
                transition: "box-shadow 0.3s ease",
                marginLeft: 20,
              }}
              onClick={() => {
                handleActivateCoupanBtn(isSliderOpen)
                setFreeCops(false);
                setCoupanPopup(true);
              }}>
              ACTIVATE
            </button>
          </div>
          <p style={{ margin: 10, color: "#000000", fontSize: 16, fontWeight: "500", textAlign: "center", }} >
            Note: The coupon is valid for 15 minutes after activation.
          </p>
        </div>
      </BottomSheet>

      {(coupanPopup) && (
        <Reward
          showPopup={coupanPopup} timer={currentCoupanData?.activate_time_usa_zone ? getRemainingTime(currentCoupanData?.activate_time_usa_zone, "00:15:00") :"00:00:01" } clientLogo={clientData?.company_logo ? backendUrl + "/" + clientData?.company_logo : null}
          onClose={() => {
            setCoupanPopup(false);
             dispatch(activateCoupan({ client_table_id: client_id, user_table_id: user_id, coupon_table_id: currentCoupanData?.coupon_table_id }));
             
             dispatch(getAllCoupans({ client_table_id: client_id, user_table_id: user_id }));
          }}
          countText={`Here is your ${currentCoupanData?.coupon_name || "Coupon from olo"} `}
        />
      )}
      <BirthdayCampaign show={show} handleClose={() => setShow(false)} />

      <AddShortCut isModalOpen={addToShort} setIsModalOpen={setToShortCut} handleInstallClick={handleInstallClick} showInstallButton={showInstallButton} />
    </>
  );
};

export default Dashboard;


const BirthdayCampaign = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body style={{ backgroundColor: "#442b99", color: "white", textAlign: "center", borderRadius: "10px", position: "relative", padding: "20px" }}>
        <Button variant="light" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px", borderRadius: "50%" }}>×</Button>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Thank you for participating in the birthday campaign!</p>
        <p style={{ fontSize: "14px" }}>Click your coupon to see detailed information, terms and conditions.</p>
      </Modal.Body>
    </Modal>
  );
};