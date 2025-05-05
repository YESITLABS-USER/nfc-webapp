import React, { useEffect, useState } from 'react';
import BGImage from "../assets/icons/loyality-bg.png";
import { formatTime, getRemainingTime, parseTime } from '../assets/common';
import { useNavigate } from 'react-router-dom';
import Reward from './Reward';

const LoyaltyCardImgComponent = ({
  campaign_name = "Tagis ice cream",
  free_item = "FREE ICE CREAM",
  total_stamps = null,
  open_stamps = null,
  end_date = "31st DECEMBER 2024",
  backgroundImage = BGImage,
  completed_status = 0,
  allData = null,
  url = "/dashboard",
  clientLogo
}) => {
  const [coupanPopup, setCoupanPopup] = useState(false);

  const modifiedFreeItem = free_item.toLowerCase().startsWith("free ") 
    ? free_item.replace(/^free /i, '')  // Remove 'free' while preserving case
    : free_item;

    
  const remainingTime = getRemainingTime(allData?.last_stamp_click_time, "00:10:00");

  // const [timeLeft, setTimeLeft] = useState(() => parseTime(String(remainingTime ? remainingTime : allData?.expiration_time))); 
  const navigate = useNavigate();
  // // Effect to update the countdown timer
  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     const intervalId = setInterval(() => {
  //       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  //     }, 1000);
      
  //     return () => clearInterval(intervalId); // Cleanup interval on component unmount or when timeLeft changes
  //   }
  // }, [timeLeft,remainingTime]);

  const [timeLeft, setTimeLeft] = useState(() => {
    const remaining = getRemainingTime(allData?.last_stamp_click_time, "00:10:00");
    const endTime = Date.now() + (parseTime(String(remaining || allData?.expiration_time)) * 1000);
    return endTime;
  });
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = Math.max(0, Math.floor((timeLeft - Date.now()) / 1000));
      setCurrentTimeLeft(remaining);
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  
  const [currentTimeLeft, setCurrentTimeLeft] = useState(() => {
    const remaining = getRemainingTime(allData?.last_stamp_click_time, "00:10:00");
    return parseTime(String(remaining || allData?.expiration_time));
  });
  

    
  return (
      <div className="get-free-coupon-wrap"  style={{ 
        filter: remainingTime <= 0 && allData?.completed_status == "1" ? 'brightness(0.5)' : 'none' 
      }}
      onClick={() => {
        // Check if remainingTime is greater than 0 and if the completed_status is "1"
        if (remainingTime > "00:00:00" && allData?.completed_status == "1" || completed_status == 1) {
          setCoupanPopup(!coupanPopup); // Toggle the coupon popup
        } 
        // If remaining time is 0 or completed_status is not "1", just navigate to the loyalty page
        else if (remainingTime <= 0 && allData?.completed_status != "1" || completed_status == 1) {
          navigate("/loyality", { state: { data: { ...allData, url, clientLogo } } });
        } else {
          return null;
        }
      }}
        >
        <div className="get-free-coupon-content">
          <div className="inner-wrap-free-coupon">
            <span>{campaign_name}</span>
            <h2>GET FREE <br /> { modifiedFreeItem.length > 15 ? modifiedFreeItem.substring(0, 12) + "..." : modifiedFreeItem}</h2>
            <span>Collect {total_stamps} stamps and get {free_item}.</span>
          </div>
        </div>
        {(open_stamps && total_stamps) &&<div className="get-free-coupon-count">
          {Number(open_stamps) > Number(total_stamps) ? Number(total_stamps) : Number(open_stamps)}/{Number(total_stamps)}
        </div>}
        <div className="get-free-coupon-bottom">
          <p>Loyalty Card <span>VALID UNTIL <b>{end_date}</b></span></p>
        </div>

        {/* Stamp counter indicator */}
       {/* {remainingTime && <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: '#4338CA', color: '#FFFFFF', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500'}} >
         {formatTime(timeLeft)}
       </div>} */}
       {remainingTime && (
  <div style={{
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    backgroundColor: '#4338CA',
    color: '#FFFFFF',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500'
  }}>
    {formatTime(currentTimeLeft)}
  </div>
)}


      {coupanPopup && (
        <Reward
          showPopup={coupanPopup} 
          clientLogo={allData?.clientLogo}
          onClose={() => {
            setCoupanPopup(!coupanPopup); 
          }}
          // timer={allData?.last_stamp_click_time + "00:10:00"}
          timer={getRemainingTime(allData?.last_stamp_click_time, "00:10:00")}
          countText={`Here is your free ${allData?.free_items_name}` || "Task Completed"}
          countText2={""}
        />
      )}

      </div>
  );
};

export default LoyaltyCardImgComponent;

// --------------------------------------------- Previous Code --------------------------------

// <div 
    //   style={{ 
    //     position: 'relative', 
    //     width: '100%', 
    //     minWidth: '0', 
    //     margin: '1rem auto', 
    //     overflow: 'hidden', 
    //     backgroundImage: `url(${backgroundImage})`, 
    //     backgroundRepeat: 'no-repeat', 
    //     backgroundSize: 'cover', 
    //     backgroundPosition: 'center', 
    //     transition: 'background-color 0.2s ease-in-out'
    //   }} onClick={() => {
    //     // If remainingTime is false, prevent navigation
    //     if (remainingTime || allData?.completed_status == "1") return;
    //     navigate("/loyality", { state: { data: {...allData, url, clientLogo} } });
    //   }} 
    // >
    //   {/* Dark overlay for disabled state */}
    //   {/* {(remainingTime || allData?.completed_status == "1") && (
    //     <div
    //       style={{
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
    //         zIndex: 1,
    //       }}
    //     />
    //   )} */}

    //   {/* Main card container */}
    //   <div 
    //     style={{ 
    //       position: 'relative', 
    //       borderRadius: '0.5rem', 
    //       padding: '0 2.2rem 2.8rem 2.2rem', 
    //       display: 'flex', 
    //       flexDirection: 'column', 
    //       alignItems: 'center',
    //     }}
    //   >
    //     <p style={{ textAlign: 'center', color: '#4B5563', marginBottom: '0.5rem' }}>{campaign_name}</p>
    //     <h1 style={{ textAlign: 'center', color: '#4338CA', fontSize: "1.8rem", fontWeight: 'bold' }}>
    //         GET {free_item?.split(' ')?.[0]} <br />
    //         {free_item?.split(' ')?.slice(1)?.join(' ')}
    //     </h1>
    //     <p style={{ textAlign: 'center', color: '#4B5563', fontSize: '0.65rem', padding:"0 0.75rem", fontWeight:"bold", textTransform: "capitalize" }}> {`Collect ${total_stamps} stamps and get ${free_item}.`}</p>
    //   </div>

    //   {/* Card footer */}
    //   <div style={{ 
    //       position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', 
    //       justifyContent: 'space-between', padding: '0 0.5rem', }}>

    //     <p style={{ color: '#FFFFFF', fontSize: '0.75rem', margin:'0 0 5px 0' }}>Loyalty Card</p>
    //     <p style={{ color: '#FFFFFF', fontSize: '0.60rem', margin:'0 0 5px 0' }}>VALID UNTIL: {end_date}</p>
    //   </div>

    //   {/* Stamp counter indicator */}
      
    //   {remainingTime && <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: '#4338CA', color: '#FFFFFF', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500'}} >
    //     {formatTime(timeLeft)}
    //   </div>}
    //   <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: '#4338CA', color: '#FFFFFF', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500'}} >
    //     {`${open_stamps} / ${total_stamps}`}
    //   </div>
    // </div>