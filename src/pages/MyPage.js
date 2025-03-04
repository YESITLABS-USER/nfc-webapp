import React, { useState } from "react";
import OnboardHeader from "../components/OnboardHeader";

import LoyaltyCard from "../assets/icons/loyaltyCard.png";
import Line22 from "../assets/icons/line222.png";
import Restro from "../assets/icons/restro.png";
import ThickLine from "../assets/icons/thickLine.png";
// import FreeBeer from "../assets/icons/freeBeer.png";
// import Food from "../assets/icons/food30.png";
import { FaChevronDown, FaInfoCircle } from "react-icons/fa";
import MyPageInfo from "../components/MyPageInfo";
import UnFollow from "../components/Unfollow";
import BottomSheet from "../components/BottomSheet";
import CopsActivation from "../components/CopsActivation";
import Reward from "../components/Reward";
import CoupanComponent from "../components/CoupanComponent";
import { MdDelete } from "react-icons/md";
// import MyPlacesModal from "../components/MyPlacesModal";

const items = [
  {
    id: 1,
    image: "https://via.placeholder.com/100",
    title: "BASBAS",
    description: "Counter & dining",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/100",
    title: "var",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/100",
    title: "KASKIS",
    description: "Dining",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/100",
    title: "GRON",
    description: "Dining",
  },
];

// const allCoupans = [
//   { name: "Coupans 2", img: FreeBeer, age: true, description: "30% off Food COUPAN from olo"},
//   { name: "Coupans 3", img: Food, age: false, description: " FREE BEER COUPAN from olo"},
//   { name: "Coupans 2", img: FreeBeer, age: true, description: "FREE BEER COUPAN from olo"},
//   { name: "Coupans 3", img: Food, age: false, description: " 30% off Food from olo"}
// ]
const allCoupans = [
  {
    coupan_type: "Beverages coupon",
    coupan_discount: "FREE",
    coupan_title: "FREE BEER",
    coupan_validity: "DECEMBER 2025",
    coupan_color: "red",
    coupan_age: true,
  },

  {
    coupan_type: "Food coupon",
    coupan_discount: "30%",
    coupan_title: "30% OFF ON FOOD",
    coupan_validity: "DECEMBER 2025",
    coupan_color: "black",
  },

  {
    coupan_type: "Beverages coupon",
    coupan_discount: "FREE",
    coupan_title: "FREE BEER",
    coupan_validity: "DECEMBER 2025",
    coupan_color: "red",
    coupan_age: true,
  },

  {
    coupan_type: "Food coupon",
    coupan_discount: "30%",
    coupan_title: "30% OFF ON FOOD",
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
];

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UnFollows, setIsUnfollow] = useState(false);
  const [coopn, setCoops] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [freeCops, setFreeCops] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [ageLimitaion, setAddlimitation] = useState(false);
  const [coupanPopup, setCoupanPopup] = useState(false);
  const [voucerDes, setVoucherDes] = useState(null);
  const handleBottmSheet = (val) => {
    setIsSliderOpen(val);
  };

  const [visibleCount, setVisibleCount] = useState(3); // State to manage visible items
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleVisibility = () => {
    if (isExpanded) {
      setVisibleCount(3); // Show only 3 items
    } else {
      setVisibleCount(items.length); // Show all items
    }
    setIsExpanded(!isExpanded); // Toggle state
  };
  return (
    <>
      <OnboardHeader disabled={true} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          margin: 10,
        }}
      >
        <h3 style={{ color: "#000000" }}>Welcome to Tagis!</h3>
        <p style={{ width: "90%", fontSize: 17, color: "#000000" }}>
          Your go-to app for restaurant coupons from a variety of dining spots.
          Save big on your next meal!
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            width: "80%",
          }}
        >
          <h3 style={{ marginLeft: "20px" }}>Coopons</h3>
          <FaInfoCircle
            size={24}
            color="#25026E"
            onClick={() => {
              setIsModalOpen(true);
              setCoops(true);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px", // Optional: Add padding to the container
            borderRadius: "10px", // Optional: Round corners of the container
            width: "80%", // Optional: Control the width of the image container
            alignItems: "center", // Center images horizontally
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={LoyaltyCard}
              alt="Coupon 1"
              style={{ objectFit: "contain" }}
            />
            <MdDelete style={{ fontSize: "25px", color: "red" }} />
          </div>

          <div
            style={{
              maxHeight: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              overflowX: "hidden",
            }}
            className={showAll ? "custom-scrollbar" : ""}
          >
            {allCoupans
              .slice(0, showAll ? allCoupans.length : 2)
              .map((coupan, index) => (
                // <img key={index} src={coupan.img} alt={coupan.anme} style={{ objectFit: "contain" }} onClick={() => {
                //   if (coupan?.age) {
                //     setFreeCops(true);
                //     setAddlimitation(true);
                //     setVoucherDes(coupan.description);
                //   } else {
                //     setFreeCops(true);
                //     setAddlimitation(false);
                //     setVoucherDes(coupan.description);
                //   }
                // }} />
                <CoupanComponent
                  key={index}
                  coupan_type={coupan.coupan_type}
                  coupan_discount={coupan.coupan_discount}
                  coupan_title={coupan.coupan_title}
                  coupan_validity={coupan.coupan_validity}
                  coupan_age={coupan.coupan_age}
                  coupan_color={coupan.coupan_color}
                  occupied={coupan.occupied}
                  onClick={() => {
                    if (coupan.coupan_age) {
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
          {/* <img src={FreeBeer} alt="Coupon 2" style={{ objectFit: "contain" }} />
          <img src={Food} alt="Coupon 3" style={{ objectFit: "contain" }} /> */}
        </div>
        <button
          onClick={() => setShowAll(!showAll)} // Implement your logic here
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#25026E",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
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
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 15,
          zIndex: 100,
        }}
      >
        <h3 style={{ marginLeft: "30px", fontWeight: "600" }}>My Places</h3>
        <FaInfoCircle
          size={24}
          color="#25026E"
          style={{ marginRight: "30px" }}
          onClick={() => {
            setIsModalOpen(true);
            setCoops(false);
          }}
        />
      </div>
      <div style={styles.verticalList}>
        {items.slice(0, visibleCount).map((item) => (
          <div style={styles.listItem} key={item.id}>
            <img src={Restro} alt={item.title} style={styles.itemImage} />
            <div style={styles.itemContent}>
              <h3 style={styles.itemTitle}>{item.title}</h3>
              <p style={styles.itemDescription}>{item.description}</p>
            </div>
            <div style={styles.itemButtons}>
              <button
                style={{
                  padding: 10,
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#25026E",
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                VIEW COUPONS
              </button>
              <button style={styles.button} onClick={() => setIsUnfollow(true)}>
                UNFOLLOW
              </button>
            </div>
          </div>
        ))}
        <button style={styles.showMore} onClick={toggleVisibility}>
          {isExpanded ? "Show Less" : "See More"}
          <FaChevronDown style={{ marginLeft: "10px" }} />
        </button>
      </div>

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
              color: "#000000",
            }}
          >
            I confirm that I want to activate the coupon.
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#FFFFFF",
                color: "Black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                marginRight: 40,
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
          onClose={() => {
            setCoupanPopup(false);
            setVoucherDes(null);
          }}
          countText={voucerDes}
        />
      )}

      <MyPageInfo
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        coops={coopn}
      />
      {/* <MyPlacesModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)} // Close modal
      /> */}
      <UnFollow isModalOpen={UnFollows} setIsModalOpen={setIsUnfollow} />
    </>
  );
};

export default MyPage;
const styles = {
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    margin: "0 0 10px 0",
    fontSize: "18px",
    color: "#000000",
  },
  itemDescription: {
    margin: "0",

    color: "#000000",
  },

  buttonHover: {
    backgroundColor: "#0056b3",
  },

  verticalList: {
    maxHeight: "300px", // Set a fixed height
    overflowY: "auto", // Enable vertical scrolling when content exceeds height
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "15px",
    gap: "15px",
  },
  itemImage: {
    width: "100px",
    height: "100px",
    flexShrink: 0,
  },

  itemButtons: {
    display: "flex",
    flexDirection: "column", // Stack buttons vertically
    gap: "10px",
  },
  button: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#25026E",
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  showMore: {
    marginTop: "15px",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#25026E",
    color: "#fff",
    display: "block", // Center-align the button
    marginLeft: "auto",
    marginRight: "auto",
  },
};
