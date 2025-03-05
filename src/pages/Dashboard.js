import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";
import HomeImg from "../assets/icons/homeImg.png";
import { FaChevronDown } from "react-icons/fa";
import "../styles/header.css";
import GoogleReview from "../assets/icons/googleReview.svg";
// import LoyaltyCard from "../assets/icons/loyaltyCard.png";
// import { MdDelete } from "react-icons/md"; 
import OLO from "../assets/icons/header.png";
import bell from "../assets/icons/bell.png";

import OpeingHrs from "../assets/icons/openingHrs.svg";

import Line22 from "../assets/icons/line222.png";

import ThickLine from "../assets/icons/thickLine.png";

import Img1 from "../assets/icons/img1.svg";
import Img2 from "../assets/icons/img2.svg";
import Img3 from "../assets/icons/img3.svg";

import CopsActivation from "../components/CopsActivation";
import BottomSheet from "../components/BottomSheet";
import Reward from "../components/Reward";
import CoupanComponent from "../components/CoupanComponent";
import { useDispatch, useSelector } from "react-redux";
import { addClientInUser, getAllLoyalityCards, getClientInfo } from "../store/slices/clientSlice";
import { Button } from "react-bootstrap";
import LoyaltyCardImgComponent from "../components/LoyaltyCard";
import { formatDate } from "../assets/common";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { clientData,loyalityCards, loading } = useSelector((state) => state.client)
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate()

  const [freeCops, setFreeCops] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [ageLimitaion, setAddlimitation] = useState(false);
  const [coupanPopup, setCoupanPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showAllLoyality, setShowAllLoyality] = useState(false);

  const {user_id} = JSON.parse(localStorage.getItem("nfc-app"));
  const client_id = localStorage.getItem("client_id");

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if(client_id || user_id) {
      dispatch(getClientInfo({ client_table_id : client_id, user_id : user_id}))
      dispatch(getAllLoyalityCards({ client_table_id : client_id, user_id : user_id}))
      dispatch(addClientInUser({ client_table_id : client_id, user_table_id : user_id}))
    } else {
      localStorage.removeItem("nfc-app");
      navigate("/")
    }
  },[dispatch])

  const coupans = [
    {
      coupan_type: "Beverages coupon",
      coupan_discount: "FREE",
      coupan_title: "FREE COFFEE",
      coupan_validity: "31 DECEMBER 2025",
      coupan_color: "orange",
    },

    {
      coupan_type: "Beverages coupon",
      coupan_discount: "FREE",
      coupan_title: "FREE MOJITO ",
      coupan_validity: "DECEMBER 2025",
      coupan_color: "blue",
      occupied: true,
    },

    {
      coupan_type: "Liquors coupon",
      coupan_discount: "25%",
      coupan_title: "25% OFF ON LIQUORS",
      coupan_validity: "25 DECEMBER 2025",
      coupan_color: "blue",
      coupan_age: true,
    },

    {
      coupan_type: "Beverages coupon",
      coupan_discount: "FREE",
      coupan_title: "FREE COFFEE",
      coupan_validity: "31 DECEMBER 2025",
      coupan_color: "red",
    },

    {
      coupan_type: "Beverages coupon",
      coupan_discount: "FREE",
      coupan_title: "FREE MOJITO",
      coupan_validity: "DECEMBER 2025",
      coupan_color: "black",
    },

    {
      coupan_type: "Liquors coupon",
      coupan_discount: "25%",
      coupan_title: "25% OFF ON LIQUORS",
      coupan_validity: "DECEMBER 2025",
      coupan_color: "blue",
      coupan_age: true,
    },

    {
      coupan_type: "Beverages coupon",
      coupan_discount: "FREE",
      coupan_title: "FREE COFFEE",
      coupan_validity: "31 DECEMBER 2025",
      coupan_color: "orange",
    },
  ];

  // Toggle function to show/hide opening hours
  const toggleOpenHours = () => {
    setIsOpen(!isOpen);
  };

  const handleBottmSheet = (val) => {
    setIsSliderOpen(val);
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { day: '2-digit', month: 'long', year: 'numeric' };
  //   return date.toLocaleDateString('en-GB', options); 
  // };

  const visibleLoyalityCards = showAllLoyality ? loyalityCards : loyalityCards.slice(0, 2);

  const handleSeeMore = () => {
    setShowAllLoyality(!showAllLoyality);
    if (!showAllLoyality) {
      setTimeout(() => {
        document.getElementById('see-more-button')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <OnboardHeader disabled={true} OLODISABLE={true} />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "50px", paddingTop: "10px", paddingLeft: "15px", paddingRight: "15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img src={clientData?.company_logo ? backendUrl+"/"+clientData?.company_logo : OLO} alt="OLO" style={{ width: "72px", height: "72px" }} />
          <div style={{ display: "flex", flexDirection: "column", }}>
            <span className="restaurant-name" style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
              {clientData?.client_name.length > 10 ? `${clientData?.client_name.slice(0, 10)}...` : clientData?.client_name || "Olo"}
            </span>
            <span className="location" style={{ fontSize: "14px", color: "#777" }}>
              {clientData?.location_name.length > 10 ? `${clientData?.location_name.slice(0, 10)}...` : clientData?.location_name || "Helsinki, Finland"}
            </span>
          </div>
        </div>

        <Button style={{
          backgroundColor: "white", border: "2px solid #DCCBFF",  color: "black", height: "fit-content", 
          padding: "6px 12px", display: "flex", justifyContent: "center", alignItems: "center", 
          borderRadius: "5px", fontSize: "14px", fontWeight: "500"}}>
          <img src={bell} alt="follow" style={{ width: "34px", height: "29px", marginRight: "5px" }} />
          <span>Follow</span>
        </Button>
      </div>

      {/* For time */}
      <div style={{ backgroundColor: "#E0E0E0", width: "100%", height: "3px", padding: "0", boxSizing: "border-box", marginTop: -30, }} />

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {isOpen && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <ul style={{ listStyleType: "none", padding: "3% 5%", width: "100%",  margin: "0", fontFamily: "Arial, sans-serif", }} >
              {
                clientData?.opening_hours.map((item, index) => (
                  <li style={{ display: "flex", width:"100%" }} key={index}>
                  <span style={{ fontWeight: "bold", width:"100%", color: "black", width: "100%", textAlign: "start", }} > {item?.day}: </span>
                  {item?.isClosed ? <span style={{ width:"100%"}}> Closed </span> : <span style={{ width:"100%"}}>{item?.startTime} - {item?.endTime}</span>}
                </li>
                ))
              }
            </ul>
          </div>
        )}

        {isOpen && (
          <div style={{ backgroundColor: "#E0E0E0", height: "3px", padding: "0", boxSizing: "border-box", 
              width: "100%", }} />
        )}

        <img src={OpeingHrs} style={{ objectFit: "contain", width: 200 }} onClick={toggleOpenHours} alt="open btn"/>
      </div>
    
    {/* Client Image And slogan  */}
      <div style={{ position: "relative" }}>
        <img src={clientData?.company_photo ? backendUrl+"/"+clientData?.company_photo : HomeImg} alt="homeImg" style={{ objectFit: "contain", width: "100%", filter: "brightness(70%)" }} />
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
          color: "white", fontSize: "24px",textAlign:'center', fontWeight: "bold" }}> {clientData?.company_slogam} </span>
      </div>

    {/* About Client */}
      <div style={{ textAlign: "left", margin: "0 auto", width: "90%", padding:"10px 0" }}>
        <span style={{ fontSize: 20, fontWeight: "bold" }}>About</span>

        <div>
          <p> {isExpanded ? clientData?.business_about_us : clientData?.business_about_us?.slice(0, 180)}
            {clientData?.business_about_us?.length > 180 && ( 
              <span onClick={handleToggle} style={{ color: "#25026E",padding:"0 5px", cursor: "pointer", fontWeight: "bold", }}>
                {isExpanded ? "Read less..." : "Read more..."}
              </span>
            )}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", }}>
        <h3 style={{ marginBottom: "20px" }}>EXPLORE OUR COUPONS</h3>
        
        {/* <LoyaltyCard /> */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderRadius: "10px",
          width: "80%", alignItems: "center", }} >
          {visibleLoyalityCards?.map((item, index) => {
            return (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} key={index} >
                <LoyaltyCardImgComponent 
                  allData = {item}
                  campaign_name={item?.campaign_name}
                  free_item={item?.free_items_name}
                  total_stamps={item?.number_of_stamps}
                  open_stamps={item?.total_open_stamps ?? "0"}
                  end_date={item?.no_expiration ? "No Expiration" : formatDate(item?.expiration_date)}
                />
              </div>
            );
          })}

        { loyalityCards?.length > 2 && (
            <button style={{ padding: "10px 20px", backgroundColor: "#25026E", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", }} onClick={handleSeeMore} >
              {showAllLoyality ? "See Less" : "See More"}
              <FaChevronDown style={{ marginLeft: "10px", rotate: `${showAllLoyality ? "180deg" : "0deg"}` }} />
            </button>
        )}
        {/* <MdDelete style={{ fontSize: "25px", color: "red" }} /> */}
      </div>

        {/* Coupan Section */}
        
        <div style={{ maxHeight: "545px", display: "flex", flexDirection: "column", gap: "10px", paddingTop:"25px",
          overflowX: "hidden", alignItems: "center", width: "80%" }} className={showAll ? "custom-scrollbar" : ""} >
            {coupans
              .slice(0, showAll ? coupans.length : 3)
              .map((coupan, index) => (
                <CoupanComponent
                  key={index}
                  coupan_type={coupan?.coupan_type}
                  coupan_discount={coupan?.coupan_discount}
                  coupan_title={coupan?.coupan_title}
                  coupan_validity={coupan?.coupan_validity}
                  coupan_age={coupan?.coupan_age}
                  coupan_color={coupan?.coupan_color}
                  occupied={coupan?.occupied}
                  onClick={() => {
                    if (coupan?.coupan_age) {
                      setFreeCops(true);
                      setAddlimitation(true);
                    } else {
                      setFreeCops(true);
                      setAddlimitation(false);
                    }
                  }}
                />
              ))}
          </div>

          {/* <img src={Coops1} alt="Coupon 2" style={{ objectFit: "contain" }}
            onClick={() => { setFreeCops(true); setAddlimitation(false); }} />
          <img src={Coops2} alt="Coupon 3" style={{ objectFit: "contain" }} />
          <img src={Coops3} alt="Coupon 4" style={{ objectFit: "contain" }} onClick={() => {
              setFreeCops(true); setAddlimitation(true); }} /> */}
        
        <button
          onClick={() => setShowAll(!showAll)} // Implement your logic here
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#25026E",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {showAll ? "See Less" : "See More"}
          <FaChevronDown
            style={{
              marginLeft: "10px",
              rotate: `${showAll ? "180deg" : "0deg"}`,
            }}
          />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <img
          src={Img1}
          alt="Coupon 3"
          style={{ objectFit: "contain", margin: 10, marginBottom: 25 }}
        />
        <img
          src={Img2}
          alt="Coupon 2"
          style={{ objectFit: "contain", margin: 10 }}
        />
        <img
          src={Img3}
          alt="Coupon 4"
          style={{ objectFit: "contain", margin: 10 }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={GoogleReview}
          alt="Star Pattern"
          className="start-img"
          style={{ width: "auto", height: "auto" }} // Adjust width and height as needed
        />
      </div>

      <a href={(() => {
        const reviewLink = clientData?.google_review_link;
        if (reviewLink) {
          // Check if the link contains 'http' or 'https', and format accordingly
          return reviewLink.startsWith('http') || reviewLink.startsWith('https')
            ? reviewLink : `https://${reviewLink}`;
        }
        return '#'; })()} 
      target="_blank"
      style={{ backgroundColor: "rgb(42, 1, 129)", color: "white", borderRadius: "10px", width: '50%',
        height: "50px", border: "none", cursor: "pointer", boxShadow: "rgba(0, 0, 0, 0.25) 0px 10px 10px 0px",
        display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', fontSize: '16px', margin:"15px auto" }} > Leave a Review 
      </a>


      {/* <CustomButton text="Leave a Review" onClick={} fullWidth={"50%"} borderRadus={true} /> */}

      <CopsActivation
        isModalOpen={freeCops}
        setIsModalOpen={setFreeCops}
        callBack={handleBottmSheet}
        ageLimitaion={ageLimitaion}
        setAddlimitation={setAddlimitation}
      />
      <BottomSheet isOpen={isSliderOpen} onClose={() => {}}>
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
              fontWeight: "600",
            }}
          >
            Coupon Confirmation
          </h2>

          <img src={ThickLine} alt="thick tline" style={{ marginBottom: 30 }} />
          <p
            style={{
              textAlign: "center",
              marginBottom: "10px",
              color: "black",
              // fontWeight: "400",
            }}
          >
            I confirm that I want to activate the coupon.
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <button
              style={{
                marginRight: 40,
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
              }}
            >
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
                setIsSliderOpen(false);
                setFreeCops(false);
                setCoupanPopup(true);
              }}
            >
              ACTIVATE
            </button>
          </div>
          <p
            style={{
              margin: 10,
              color: "#000000",
              fontSize: 16,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Note: The coupon is valid for 15 minutes after activation.
          </p>
        </div>
      </BottomSheet>

      {coupanPopup && (
        <Reward
          showPopup={coupanPopup}
          onClose={() => setCoupanPopup(false)}
          countText={"Here is your FREE COFFEE Coupon from olo"}
        />
      )}
    </>
  );
};

export default Dashboard;
