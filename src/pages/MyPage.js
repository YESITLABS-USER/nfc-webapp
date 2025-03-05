import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteLoyalityCard, getAllClients, getAllLoyalityCards, unfollowClient } from "../store/slices/clientSlice";
import LoyaltyCardImgComponent from "../components/LoyaltyCard";
import { formatDate } from "../assets/common";
import { Button, Modal } from "react-bootstrap";
// import MyPlacesModal from "../components/MyPlacesModal";

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
  const [showAllLoyality, setShowAllLoyality] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null); // State to store the card id for deletion
  
  
  const handleBottmSheet = (val) => {
    setIsSliderOpen(val);
  };
  
  const dispatch = useDispatch()
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { allClientsData, loyalityCards, loading } = useSelector((state) => state.client)

  const {user_id} = JSON.parse(localStorage.getItem("nfc-app"));
  const client_id = localStorage.getItem("client_id");

  const [activeClient, setActiveClient] = useState(client_id);
  
  useEffect(() => {
    dispatch(getAllClients({ client_table_id : activeClient, user_table_id : user_id}))
    dispatch(getAllLoyalityCards({ client_table_id : activeClient, user_id : user_id}))
    
  },[dispatch, activeClient, user_id])
  
  const [visibleCount, setVisibleCount] = useState(3); // State to manage visible items
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleVisibility = () => {
    if (isExpanded) {
      setVisibleCount(3); // Show only 3 items
    } else {
      setVisibleCount(allClientsData?.length); // Show all items
    }
    setIsExpanded(!isExpanded); // Toggle state
  };
  
  const visibleLoyalityCards = showAllLoyality ? loyalityCards : loyalityCards.slice(0, 2);
  
  const handleSeeMore = () => {
    setShowAllLoyality(!showAllLoyality);
    if (!showAllLoyality) {
      setTimeout(() => {
        document.getElementById('see-more-button')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  // For Loyality Delete
  const handleLoyalityDelete = async (id) => {
    try {
      await dispatch(deleteLoyalityCard({'loyalty_card_table_id': id, 'user_table_id': user_id}));
      // Dispatch getAllLoyalityCards after delete is successful
      dispatch(getAllLoyalityCards({ client_table_id : client_id, user_id : user_id }));
      setShowDeleted(false);
    } catch (error) {
      console.error("Error deleting loyalty card:", error);
    }
  }
  
  const handleUnfollow = async (id) => {
    try {
      await dispatch(unfollowClient({ client_table_id : id, user_table_id : user_id }))

      dispatch(getAllClients({ client_table_id : client_id, user_table_id : user_id}))
      
    } catch (error) {
      console.error("Error unfollow client:", error);

    }
  };

  return (
    <>
      <OnboardHeader disabled={true} />
      <div style={{display: "flex",flexDirection: "column",alignItems: "center",textAlign: "center", margin: 10}}>
        <h3 style={{ color: "#000000" }}>Welcome to Tagis!</h3>
        <p style={{ width: "90%", fontSize: 17, color: "#000000" }}>
          Your go-to app for restaurant coupons from a variety of dining spots.
          Save big on your next meal!
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", }} >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", width: "80%" }} >
          <h3 style={{ marginLeft: "20px" }}>Coopons</h3>
          <FaInfoCircle size={24} color="#25026E" 
            onClick={() => {
              setIsModalOpen(true);
              setCoops(true);
            }} 
          />
        </div>
        <div style={{ display: "flex",flexDirection: "column",gap: "10px", padding: "10px", borderRadius: "10px", 
            width: "80%", alignItems: "center" }}>
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
                    url={"/mypage"}
                  />
                <MdDelete style={{ fontSize: "35px", color: "red" }} onClick={() => { 
                  setSelectedCardId(item?.loyalty_card_table_id); // Store the selected card ID 
                  setShowDeleted(true); // Open the delete modal 
                }}/>
                </div>
              );
            })}

            { loyalityCards?.length > 2 && (
                <button style={{ padding: "10px 20px", backgroundColor: "#25026E", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", }} onClick={handleSeeMore} >
                  {showAllLoyality ? "See Less" : "See More"}
                  <FaChevronDown style={{ marginLeft: "10px", rotate: `${showAllLoyality ? "180deg" : "0deg"}` }} />
                </button>
            )}
          </div>

        {/* All Coupans*/}
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
          {
            allClientsData?.length <= 0 && <p style={{ display:"flex", justifyContent:'center', padding:"20px 0"}}> No Clients Available </p>
          }

        {allClientsData?.slice(0, visibleCount).map((item, index) => (
          <div style={styles.listItem} key={index}>
            <img src={ item?.company_logo ? (backendUrl+"/"+ item?.company_logo) : Restro} alt={item?.client_name} style={styles.itemImage} />

            <div style={styles.itemContent}>
              <h3 style={styles.itemTitle}>{item?.client_name}</h3>
              <p style={styles.itemDescription}> 
                {item?.location_name?.length > 20 ? `${item?.location_name.slice(0, 20)}...` : item?.location_name}
              </p>
            </div>

            <div style={styles.itemButtons}>
              <button style={{
                  padding: 10, border: "none", borderRadius: "8px", cursor: "pointer", backgroundColor: "#25026E",
                  color: "#fff", textAlign: "center", fontSize: 12, fontWeight: "600", }} onClick={() => setActiveClient(item?.client_table_id)}>
                VIEW COUPONS
              </button>
              <button style={styles.button} onClick={() => {
                setSelectedCardId(item?.client_table_id); 
                setIsUnfollow(true);
              }}>
                {item?.follow_status ? "UNFOLLOW" : "FOLLOW"}
              </button>
            </div>
          </div>
        ))}
        {(allClientsData?.length > 3) && <button style={styles.showMore} onClick={toggleVisibility}>
          {isExpanded ? "Show Less" : "See More"}
          <FaChevronDown style={{ marginLeft: "10px" }} />
        </button>}
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
      <UnFollow
        isModalOpen={UnFollows}
        setIsModalOpen={setIsUnfollow}
        itemId={selectedCardId}
        onUnfollow={handleUnfollow}
      />
      <DeletePopup isModalOpen={showDeleted} setIsModalOpen={setShowDeleted} handleDelete={handleLoyalityDelete} 
        cardId={selectedCardId} 
/>    </>
  );
};

export default MyPage;

function DeletePopup({ isModalOpen, setIsModalOpen, handleDelete, cardId }) {
  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  }

  const handleConfirmDelete = () => {
    handleDelete(cardId); // Call handleDelete with the correct card ID
  }

  return (
      <Modal show={isModalOpen} size="sm" centered>
        <Modal.Body style={{ display:'flex', flexDirection:"column", justifyContent:'center', alignItems:"center", textAlign:"center"}}>
          <h5> Are you sure you want to delete this Loyalty card? </h5>
          <div style={{width:"100%", display:'flex', justifyContent:"center", gap:"30px", paddingTop:"20px"}}>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={handleConfirmDelete}> Delete </Button>
          </div>
        </Modal.Body>
      </Modal>
  );
}


const styles = {
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    margin: "0 0 10px 0",
    fontSize: "18px",
    color: "#000",
  },
  itemDescription: {
    margin: "0",
    color: "#000",
  },

  buttonHover: {
    backgroundColor: "#0056b3", // Hover state for buttons
  },

  verticalList: {
    maxHeight: "300px", // Fixed height for the list container
    overflowY: "auto", // Enable scrolling
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
    width: "80px",
    height: "80px",
    flexShrink: 0,
    borderRadius: "50%", // Make the image circular
  },

  itemButtons: {
    display: "flex",
    flexDirection: "column", // Stack buttons vertically
    gap: "10px",
  },

  button: {
    padding: "10px 15px", // Adjust padding for better button size
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#25026E",
    color: "#fff",
    fontSize: "14px", // Consistent font size
    fontWeight: "600",
    textAlign: "center",
    transition: "background-color 0.3s ease", // Add transition for hover effect
  },

  // Button hover state
  buttonHover: {
    backgroundColor: "#0056b3",
  },

  showMore: {
    marginTop: "15px",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#25026E",
    color: "#fff",
    display: "block", // Center the button
    marginLeft: "auto",
    marginRight: "auto",
    transition: "background-color 0.3s ease", // Add transition for hover effect
  },

  // Hover effect for the "View Coupons" button
  buttonViewCoupons: {
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#25026E",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
    transition: "background-color 0.3s ease", // Add transition for hover effect
  },
};