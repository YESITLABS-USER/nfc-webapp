// // import React, { useState } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation } from "swiper/modules"; // Only Navigation module
// // import { FaTrash } from "react-icons/fa"; // Delete icon
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import BackgroundImg from "../assets/images/loyalityCard.png"; // Correct path to the image

// // const LoyaltyCard = () => {
// //   const [slides, setSlides] = useState([
// //     "Text 1",
// //     "Text 2",
// //     "Text 3",
// //     "Text 4",
// //     "Text 5",
// //     "Text 6",
// //     "Text 7",
// //     "Text 8",
// //     "Text 9",
// //   ]);

// //   const handleDelete = (index) => {
// //     if (window.confirm("Are you sure you want to delete this slide?")) {
// //       const updatedSlides = slides.filter((_, i) => i !== index);
// //       setSlides(updatedSlides);
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         width: "100%",
// //         height: "180px",
// //         overflow: "hidden",
// //       }}
// //     >
// //       <Swiper
// //         modules={[Navigation]} // Only Navigation module
// //         navigation={true} // Enable navigation
// //         loop={false}
// //         spaceBetween={0} // No space between slides
// //         slidesPerView={1} // Show 1 slide at a time
// //         pagination={false} // Disable pagination
// //         style={{ height: "100%" }}
// //       >
// //         {slides.map((text, index) => (
// //           <SwiperSlide key={index}>
// //             <div
// //               style={{
// //                 position: "relative",
// //                 width: "100%",
// //                 height: "100%", // Take full height
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 backgroundImage: `url(${BackgroundImg})`,
// //                 backgroundPosition: "center",
// //                 backgroundRepeat: "no-repeat",
// //                 textAlign: "center",
// //                 color: "white",
// //                 fontSize: "24px",
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               <p style={{ color: "blue" }}>{text}</p>

// //               {/* Delete Icon */}

// //               <FaTrash
// //                 onClick={() => handleDelete(index)}
// //                 style={{
// //                   position: "absolute",
// //                   marginLeft: 400,
// //                 }}
// //                 size={40}
// //                 color="red"
// //               />
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </div>
// //   );
// // };

// // export default LoyaltyCard;
// ///

// ///
// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FaTrash } from "react-icons/fa"; // Delete icon
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination"; // Import pagination styles
// import BackgroundImg from "../assets/images/loyalityCard.png"; // Correct path to the image

// const LoyaltyCard = () => {
//   const [slides, setSlides] = useState([
//     "Text 1",
//     "Text 2",
//     "Text 3",
//     "Text 4",
//     "Text 5",
//     "Text 6",
//     "Text 7",
//     "Text 8",
//     "Text 9",
//   ]);

//   const swiperRef = React.useRef(null); // Reference to the swiper instance

//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this slide?")) {
//       const updatedSlides = slides.filter((_, i) => i !== index);
//       setSlides(updatedSlides);
//     }
//   };

//   const goToNext = () => {
//     if (swiperRef.current) {
//       swiperRef.current.swiper.slideNext(); // Trigger swiper to move to the next slide
//     }
//   };

//   const goToPrev = () => {
//     if (swiperRef.current) {
//       swiperRef.current.swiper.slidePrev(); // Trigger swiper to move to the previous slide
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "250px", // Increased height to accommodate pagination and buttons
//         overflow: "hidden",
//         textAlign: "center",
//       }}
//     >
//       <Swiper
//         ref={swiperRef} // Assign the ref to the swiper
//         loop={false}
//         spaceBetween={0}
//         slidesPerView={1}
//         pagination={{ clickable: true }} // Enable clickable pagination
//         // style={{ height: "100%" }}
//       >
//         {slides.map((text, index) => (
//           <SwiperSlide key={index}>
//             <div
//               style={{
//                 position: "relative",
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundImage: `url(${BackgroundImg})`,
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 textAlign: "center",
//                 color: "white",
//                 fontSize: "24px",
//                 fontWeight: "bold",
//               }}
//             >
//               <p style={{ color: "blue" }}>{text}</p>

//               {/* Delete Icon */}
//               <FaTrash
//                 onClick={() => handleDelete(index)}
//                 style={{
//                   position: "absolute",
//                   marginLeft: 400,
//                 }}
//                 size={40}
//                 color="red"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Custom Navigation Buttons */}
//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <button
//           onClick={goToPrev}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             marginRight: "20px",
//           }}
//         >
//           Previous
//         </button>
//         <button
//           onClick={goToNext}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoyaltyCard;
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
  allData = null
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
        navigate("/loyality", { state: { data: allData } });
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
