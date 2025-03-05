import React, { useEffect, useState } from 'react';
import BGImage from "../assets/icons/loyality-bg.png";
import { formatTime, getRemainingTime, parseTime } from '../assets/common';
import { useNavigate } from 'react-router-dom';

const LoyaltyCardImgComponent = ({
  campaign_name = "Tagis ice cream",
  free_item = "FREE ICE CREAM",
  total_stamps = "9",
  open_stamps = "2",
  end_date = "31st DECEMBER 2024",
  backgroundImage = BGImage,
  allData = null,
  url = "/dashboard",
  clientLogo
}) => {

  const remainingTime = getRemainingTime(allData?.last_stamp_click_time, allData?.expiration_time);

  const [timeLeft, setTimeLeft] = useState(() => parseTime(String(remainingTime ? remainingTime : allData?.expiration_time))); 
  const navigate = useNavigate();
  // Effect to update the countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      
      return () => clearInterval(intervalId); // Cleanup interval on component unmount or when timeLeft changes
    }
  }, [timeLeft]);
    
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        minWidth: '21rem', 
        margin: '1rem auto', 
        overflow: 'hidden', 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        transition: 'background-color 0.2s ease-in-out'
      }} onClick={() => {
        // If remainingTime is false, prevent navigation
        if (remainingTime || allData?.completed_status == "1") return;
        navigate("/loyality", { state: { data: {...allData, url, clientLogo} } });
      }} 
    >
      {/* Dark overlay for disabled state */}
      {(remainingTime || allData?.completed_status == "1") && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
            zIndex: 1,
          }}
        />
      )}

      {/* Main card container */}
      <div 
        style={{ 
          position: 'relative', 
          borderRadius: '0.5rem', 
          padding: '0 2.2rem 2.8rem 2.2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
        }}
      >
        <p style={{ textAlign: 'center', color: '#4B5563', marginBottom: '0.5rem' }}>{campaign_name}</p>
        <h1 style={{ textAlign: 'center', color: '#4338CA', fontSize: "1.8rem", fontWeight: 'bold' }}>
            GET {free_item?.split(' ')?.[0]} <br />
            {free_item?.split(' ')?.slice(1)?.join(' ')}
        </h1>
        <p style={{ textAlign: 'center', color: '#4B5563', fontSize: '0.65rem', padding:"0 0.75rem", fontWeight:"bold", textTransform: "capitalize" }}> {`Collect ${total_stamps} stamps and get ${free_item}.`}</p>
      </div>

      {/* Card footer */}
      <div style={{ 
          position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', 
          justifyContent: 'space-between', padding: '0 0.5rem', }}>

        <p style={{ color: '#FFFFFF', fontSize: '0.75rem', margin:'0 0 5px 0' }}>Loyalty Card</p>
        <p style={{ color: '#FFFFFF', fontSize: '0.60rem', margin:'0 0 5px 0' }}>VALID UNTIL: {end_date}</p>
      </div>

      {/* Stamp counter indicator */}
      
      {remainingTime && <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: '#4338CA', color: '#FFFFFF', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500'}} >
        {formatTime(timeLeft)}
      </div>}
      <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: '#4338CA', color: '#FFFFFF', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500'}} >
        {`${open_stamps} / ${total_stamps}`}
      </div>
    </div>
  );
};

export default LoyaltyCardImgComponent;
