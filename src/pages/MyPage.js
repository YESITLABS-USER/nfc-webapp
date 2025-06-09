import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";

import Line22 from "../assets/icons/line222.png";
import Restro from "../assets/icons/restro.png";
import ThickLine from "../assets/icons/thickLine.png";
import { FaChevronDown, FaInfoCircle } from "react-icons/fa";
import MyPageInfo from "../components/MyPageInfo";
import UnFollow from "../components/Unfollow";
import BottomSheet from "../components/BottomSheet";
import CopsActivation from "../components/CopsActivation";
import Reward from "../components/Reward";
import CoupanComponent from "../components/CoupanComponent";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteLoyalityCard, getAllActivatedLoyalityCards, getAllClients, getAllLoyalityCards, getClientInfo, unfollowClient } from "../store/slices/clientSlice";
import LoyaltyCardImgComponent from "../components/LoyaltyCard";
import { formatDate, getRemainingTime } from "../assets/common";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { activateCoupan, getAllActivatedCoupans, getAllCoupans, removeCoupan } from "../store/slices/coupanSlice";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UnFollows, setIsUnfollow] = useState(false);
  const [coopn, setCoops] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [freeCops, setFreeCops] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [ageLimitaion, setAddlimitation] = useState(false);
  const [coupanPopup, setCoupanPopup] = useState(false);
  const [showAllLoyality, setShowAllLoyality] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showCoupanDeletepopup, setShowCoupanDeletepopup] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null); // State to store the card id for deletion
  const [selectedCardDetail, setSelectedCardDetail] = useState(null); // State to store the card id for deletion
  const navigate = useNavigate()

  const handleBottmSheet = (val) => {
    if (val?.dob_coupon && val?.user_date_of_birth == null) {
      setIsSliderOpen(false);
      if (val?.validAge) {
        setShow(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } else {
      if (val?.campaign_age_restriction_start_age >= 18 && !val?.user_date_of_birth) {
        setIsSliderOpen(false)
      } else {
        setIsSliderOpen(val);
      }
    }
  };

  const dispatch = useDispatch()
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { allClientsData, clientData, loyalityCards, activatedLoyalityCard, loading } = useSelector((state) => state.client)
  const { coupansData, activatedCoupanData, coupanReward } = useSelector((state) => state.coupans);

  const storedData = JSON.parse(localStorage.getItem("nfc-app")) || {};
  const { user_id } = storedData;
  const client_id = localStorage.getItem("client_id");
  const lang = localStorage.getItem("language") || "eng";

  const [activeClient, setActiveClient] = useState(client_id);
  const [currentCoupanData, setCurrentCoupanData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!client_id || !user_id) {
      localStorage.removeItem("nfc-app");
      navigate("/"); // Navigate to home if user_id or client_id is not found
    } else {
      // dispatch(getClientInfo({ client_table_id: client_id, user_id: user_id }));
      dispatch(getClientInfo({ client_table_id: activeClient, user_id: user_id }));
      dispatch(getAllClients({ client_table_id: activeClient, user_table_id: user_id }));
      dispatch(getAllLoyalityCards({ client_table_id: activeClient, user_id: user_id }));
      dispatch(getAllActivatedLoyalityCards({ client_table_id: activeClient, user_id: user_id }));
      dispatch(getAllCoupans({ client_table_id: activeClient ?? client_id, user_table_id: user_id }));
      dispatch(getAllActivatedCoupans({ client_table_id: activeClient ?? client_id, user_table_id: user_id }));

    }
  }, [dispatch, coupanReward, activeClient, user_id, client_id, navigate]); // Ensure client_id is also in the dependency array

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
      const cardFromLoyalty = loyalityCards.find(card => card.loyalty_card_table_id == id) || activatedLoyalityCard.find(card => card.loyalty_card_table_id == id);
      // Fallback to 0 if either object or total_open_stamps is not found
      const totalOpenStamps = cardFromLoyalty?.total_open_stamps;
      const totalStamps = cardFromLoyalty?.number_of_stamps;
      const minStamps = Math.min(totalOpenStamps, totalStamps);
      
      await dispatch(deleteLoyalityCard({ 'loyalty_card_table_id': id, client_table_id: client_id, 'user_table_id': user_id, opned_stamp : minStamps }));
      // Dispatch getAllLoyalityCards after delete is successful
      dispatch(getAllLoyalityCards({ client_table_id: client_id, user_id: user_id }));
      dispatch(getAllActivatedLoyalityCards({ client_table_id: client_id, user_id: user_id }));
      setShowDeleted(false);
    } catch (error) {
      console.error("Error deleting loyalty card:", error);
    }
  }

  // const handleUnfollow = async (id) => {
  //   try {
  //     await dispatch(unfollowClient({ client_table_id : id, user_table_id : user_id }))

  //     dispatch(getAllClients({ client_table_id : client_id, user_table_id : user_id}))

  //   } catch (error) {
  //     console.error("Error unfollow client:", error);

  //   }
  // };

  const handleUnfollow = async (id) => {
    try {
      if (id == client_id) {
        localStorage.setItem("client_id", "abcdefghjklmnopqrs")
      }
      // Unfollow the client
      await dispatch(unfollowClient({ client_table_id: id, user_table_id: user_id }));

      // Fetch updated clients data
      await dispatch(getAllClients({ client_table_id: client_id, user_table_id: user_id }));

      // Set the new active client from the updated clients data (index 1 in allClientsData)
      if (allClientsData && allClientsData.length > 1) {
        const newActiveClient = allClientsData[1]?.client_table_id; // Get client_table_id from the second client
        setActiveClient(newActiveClient);

        // Fetch the updated loyalty cards and coupons for the newly active client
        dispatch(getAllLoyalityCards({ client_table_id: newActiveClient, user_id: user_id }));
        dispatch(getAllActivatedLoyalityCards({ client_table_id: newActiveClient, user_id: user_id }));
        dispatch(getAllCoupans({ client_table_id: newActiveClient, user_table_id: user_id }));
        dispatch(getAllActivatedCoupans({ client_table_id: newActiveClient, user_table_id: user_id }));
      }

    } catch (error) {
      console.error("Error unfollowing client:", error);
    }
  };

  const handleActivateCoupanBtn = async (coupanData) => {
    try {
      await dispatch(activateCoupan({ client_table_id: client_id, user_table_id: user_id, coupon_table_id: coupanData?.coupon_table_id }));

      await dispatch(getAllCoupans({ client_table_id: client_id, user_table_id: user_id }));

      setIsSliderOpen(false);
    } catch (error) {
      console.error("Error activating coupon:", error);
      setIsSliderOpen(false);
      setCoupanPopup(false)
    }
  }

  const handleCoupanDelete = async (id) => {
    try {
      await dispatch(removeCoupan({ coupon_table_id: id, client_table_id: client_id, user_table_id: user_id }));
      dispatch(getAllCoupans({ client_table_id: client_id, user_table_id: user_id }));
      setShowCoupanDeletepopup(false);
    } catch (error) {
      console.error("Error deleting coupon:", error);
      setShowCoupanDeletepopup(false);
    }
  }

  return (
    <>
      <OnboardHeader disabled={true} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: 10 }}>
        <h3 style={{ color: "#000000" }}>{lang == "eng" ? "Welcome to Tagis!" : "Tervetuloa Tagikseen!"}</h3>
        <p style={{ width: "90%", fontSize: 17, color: "#000000" }}>
          {lang == "eng" ? "Your go-to app for restaurant coupons from a variety of dining spots. Save big on your next meal!" : "Tagis on luotettava sovelluksesi ravintolakupongille monista eri ruokapaikoista. Säästä isosti seuraavalla ateriallassasi!"}
        </p>
      </div>

      {/* For My Places */}
      <>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 15,
          zIndex: 100,
        }} >
          <h3 style={{ marginLeft: "30px", fontWeight: "600" }}>{lang == "eng" ? "My Places" : "Omat Paikat"}</h3>
          <FaInfoCircle size={24} color="#25026E" style={{ marginRight: "30px" }}
            onClick={() => {
              setIsModalOpen(true);
              setCoops(false);
            }} />
        </div>
        <div style={styles.verticalList}>
          {
            allClientsData?.length <= 0 && <p style={{ display: "flex", justifyContent: 'center', padding: "20px 0" }}> {lang == "eng" ? "No Clients Available" : "Ei asiakkaita saatavilla"} </p>
          }

          {allClientsData?.slice(0, visibleCount).map((item, index) => (
            <div style={styles.listItem} key={index}>
              <img src={item?.company_logo ? (backendUrl + "/" + item?.company_logo) : Restro} alt={item?.client_name} style={styles.itemImage} />

              <div style={styles.itemContent}>
                {/* <h3 style={styles.itemTitle}>{item?.client_name}</h3> */}
                <h3 style={{...styles.itemTitle, maxWidth:"300px"}}>
                  {item?.client_name} 
                </h3>
                {/* <h3 style={styles.itemTitle}>
                  {item?.client_name?.length > 12 ? (
                    <> {item?.client_name?.slice(0, 12)}-<br /> {item?.client_name?.slice(12)} </>
                  ) : (item?.client_name)}
                </h3> */}
                <p style={styles.itemDescription}>
                  {item?.city}
                </p>
                {/* <p style={styles.itemDescription}> 
                  {item?.location_name?.length > 12 ? `${item?.location_name.slice(0, 12)}-` : item?.location_name}
                  <br />
                  {item?.location_name?.length > 12 ? item?.location_name.slice(12) : ''}
                </p> */}
              </div>

              <div style={styles.itemButtons}>
                <button style={{
                  padding: 10, border: "none", borderRadius: "8px", cursor: "pointer", backgroundColor: "#25026E",
                  color: "#fff", textAlign: "center", fontSize: 12, fontWeight: "600",
                }} onClick={() => setActiveClient(item?.client_table_id)}>
                  {lang == "eng" ? "VIEW COUPONS" : "NÄYTÄ KUPONGIT"}
                </button>
                <button style={styles.button} onClick={() => {
                  setSelectedCardId(item?.client_table_id);
                  setSelectedCardDetail(item)
                  setIsUnfollow(true);
                }}>
                  {item?.follow_status ? lang == "eng" ?  "UNFOLLOW" : "Lopeta Seuraaminen" : lang == "eng" ?  "FOLLOW" : "Seuraaminen"}
                </button>
              </div>
            </div>
          ))}
          {(allClientsData?.length > 3) && <button style={styles.showMore} onClick={toggleVisibility}>
            {isExpanded ? "Show Less" : lang == "eng" ? "See More" : "Näytä lisää"}
            <FaChevronDown style={{ marginLeft: "10px", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>}
        </div>
      </>

      {/* For Coupons */}
      {loading ?
        <Spinner animation="border" variant="primary" style={{ display: 'flex', margin: "auto" }} /> :
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", }} >

          <h1 style={{ display: "flex", justifyContent: 'center', alignItems: "center", textAlign: "center", fontWeight: "700", padding: "12px 10px", marginTop: "30px", borderBottom: "1px solid black", width: "90%", fontSize: "20px" }}> {clientData?.client_name} </h1>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "85%", margin: "0 15px" }} >
            <h3 style={{ fontWeight: "600" }}> {lang == "eng" ? "Coupon" : "Kuponki"} </h3>
            <FaInfoCircle size={24} color="#25026E"
              onClick={() => {
                setIsModalOpen(true);
                setCoops(true);
              }} />
          </div>

          <div style={{
            display: "flex", flexDirection: "column", gap: "10px", padding: "10px", borderRadius: "10px",
            width: "100%", alignItems: "center"
          }}>
            {/* <LoyaltyCard /> */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "10px", borderRadius: "10px",
              width: "98%", alignItems: "center"
            }} >
              {allClientsData?.length > 0 && visibleLoyalityCards?.map((item, index) => {
                return (
                  <div style={{ display: "flex", gap: "5px", alignItems: "center", width: "100%" }} key={index} >
                    <LoyaltyCardImgComponent
                      allData={item}
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
                    }} />
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

            <div style={{
              display: "flex", flexDirection: "column", gap: "10px", borderRadius: "10px",
              width: "98%", alignItems: "center"
            }} >
              {allClientsData?.length > 0 && activatedLoyalityCard?.map((item, index) => {
                return (
                  <div style={{ display: "flex", gap: "5px", alignItems: "center", width: "100%" }} key={index} >
                    <LoyaltyCardImgComponent
                      allData={item}
                      completed_status = {1}
                      campaign_name={item?.campaign_name}
                      free_item={item?.free_items_name}
                      total_stamps={null}
                      open_stamps={null}
                      end_date={item?.no_expiration ? "No Expiration" : formatDate(item?.expiration_date)}
                      url={"/mypage"}
                    />
                    {/* <MdDelete style={{ fontSize: "35px", color: "red" }} onClick={() => {
                      setSelectedCardId(item?.loyalty_card_table_id); // Store the selected card ID 
                      setShowDeleted(true); // Open the delete modal 
                    }} /> */}
                  </div>
                );
              })}

              {activatedLoyalityCard?.length > 2 && (
                <button style={{ padding: "10px 20px", backgroundColor: "#25026E", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", }} onClick={handleSeeMore} >
                  {showAllLoyality ? "See Less" : "See More"}
                  <FaChevronDown style={{ marginLeft: "10px", rotate: `${showAllLoyality ? "180deg" : "0deg"}` }} />
                </button>
              )}
            </div>

            

            {/* All Coupans*/}

          </div>
          <div className={`coupon-wrap-2 ${showAll ? "custom-scrollbar" : ""}`} style={{ height: showAll ? "545px" : "auto", overflowX:"hidden" }}>
          {(coupansData.length === 0 && activatedCoupanData?.length === 0) ? (
            <p style={{ textAlign: "center" }}>{lang == "eng" ? "No coupon available" : "Kuponkeja ei ole saatavilla"}</p> ) : 
            (
              allClientsData?.length > 0 && [
                ...coupansData.filter(c => !(c.show_blur_dob === 1 || c.show_blur_validity === 1)),
                ...coupansData.filter(c => c.show_blur_dob === 1 || c.show_blur_validity === 1)].slice(0, showAll ? coupansData.length : 3).map((coupan, index) => (
                  <div style={{ width: "94%", position: "relative", display: "flex", alignItems: "center", marginBottom: "20px"}} key={index} >
                    <CoupanComponent allData={coupan} clientData={clientData} occupied={coupan?.occupied}
                      onClick={() => { 
                        setCurrentCoupanData(coupan);
                        if ((coupan?.campaign_age_restriction_start_age >= 18 && coupan?.user_age <= 18) || (coupan?.dob_coupon !== 1 && !coupan?.user_date_of_birth) ) {
                          setFreeCops(true);
                          setAddlimitation(true);
                          } else {
                            setFreeCops(true);
                            setAddlimitation(false);
                            }
                    }} />
                    <MdDelete style={{ fontSize: "25px", color: "red", float: 'inline-end', position: 'absolute', right: "-25px" }} onClick={() => { 
                      setShowCoupanDeletepopup(true);
                      setCurrentCoupanData(coupan);
                      }}/>
                  </div>
                ))
            )}

{/* <div style={{ width: "95%", position: "relative", display: "flex", alignItems: "center", marginBottom: "20px"}} key={index} >
                  <CoupanComponent
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
                  <MdDelete style={{ fontSize: "25px", color: "red", float: 'inline-end', position: 'absolute', bottom: "auto", right: "-25px" }} onClick={() => {
                    setShowCoupanDeletepopup(true);
                    setCurrentCoupanData(coupan);
                  }} />
                </div> */}
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
                      if (coupan?.campaign_age_restriction_start_age >= 18 && coupan?.user_age <= 18) {
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

      }

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

          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#000000", paddingTop: "20px", fontWeight: "600", }} >
            {lang == "eng" ? "Coupon Confirmation" : "Vahvista etusetelin käyttö"}
          </h2>

          <img src={ThickLine} alt="thick tline" style={{ marginBottom: 30 }} />
          <p style={{ textAlign: "center", marginBottom: "10px", color: "black" }}>
            {lang == "eng" ? "I confirm that I want to activate the coupon." : "Haluan aktivoida etusetelin käytettäväksi"}
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
              {lang == "eng" ? "RETURN" : "Takaisin"}
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
              }}
            >
             {lang == "eng" ? "ACTIVATE" : " KÄYTÄ KUPONKI"} 
            </button>
          </div>
          <p style={{ margin: 10, color: "#000000", fontSize: 16, fontWeight: "500", textAlign: "center", }}>
            {lang == "eng" ? "Note: The coupon is valid for 10 minutes after activation." : " Huom: Etuseteli on käytettävissä 10 minuuttia aktivoinnin jälkeen"} </p>
        </div>
      </BottomSheet>

      {/* {coupanPopup && (
        <Reward showPopup={coupanPopup} countText={voucerDes}
          onClose={() => {
            setCoupanPopup(false);
            setVoucherDes(null);
          }}
        />
      )} */}
      {coupanPopup && (
        <Reward
          showPopup={coupanPopup} timer={currentCoupanData?.activate_time_usa_zone ? getRemainingTime(currentCoupanData?.activate_time_usa_zone, "00:10:00") : "00:10:00"} clientLogo={clientData?.company_logo ? backendUrl + "/" + clientData?.company_logo : null} couponData={currentCoupanData}
          onClose={() => setCoupanPopup(false)}
          countText={`Here is your ${
            currentCoupanData?.coupon_type_content?.[0]?.free_item
              || (currentCoupanData?.coupon_type_content?.[0]?.discount_percentage && `${currentCoupanData.coupon_type_content[0].discount_percentage}% off Coupon`)
              || (currentCoupanData?.coupon_type_content?.[0]?.discount_value && `${currentCoupanData.coupon_type_content[0].discount_value} off Coupon`)
              || (currentCoupanData?.coupon_type_content?.[0]?.fixedAmount_value && `${currentCoupanData.coupon_type_content[0].fixedAmount_value} off Coupon`)
              || currentCoupanData?.coupon_name
              || "Coupon from olo"
          }`}

          countText2={currentCoupanData?.coupon_type_content?.[0]?.product_restrictions && `DOES NOT INCLUDE ${currentCoupanData?.coupon_type_content?.[0]?.product_restrictions}`}
        />
      )}

      <MyPageInfo isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} coops={coopn} />

      <UnFollow
        isModalOpen={UnFollows}
        setIsModalOpen={setIsUnfollow}
        itemId={selectedCardId}
        onUnfollow={handleUnfollow}
        selectedCardDetail ={selectedCardDetail}
      />
      <DeletePopup isModalOpen={showDeleted} setIsModalOpen={setShowDeleted} handleDelete={handleLoyalityDelete}
        cardId={selectedCardId} name="loyalty card" />

      <DeletePopup isModalOpen={showCoupanDeletepopup} setIsModalOpen={setShowCoupanDeletepopup} handleDelete={handleCoupanDelete} cardId={currentCoupanData?.coupon_table_id} name="coupon" />

      <BirthdayCampaign show={show} handleClose={() => setShow(false)} />

    </>
  );
};

export default MyPage;

function DeletePopup({ isModalOpen, setIsModalOpen, handleDelete, cardId, name }) {
  const lang = localStorage.getItem("language") || "eng";

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  }

  const handleConfirmDelete = () => {
    handleDelete(cardId); // Call handleDelete with the correct card ID
  }

  return (
    <Modal show={isModalOpen} size="sm" centered>
      <Modal.Body style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center", textAlign: "center" }}>
        <h5> {lang == "eng" ? "Are you sure you want to delete this" : "Haluatko varmasti poistaa tämän?"} {name || "Loyalty card"}? </h5>
        <div style={{ width: "100%", display: 'flex', justifyContent: "center", gap: "30px", paddingTop: "20px" }}>
          <Button variant="secondary" onClick={handleClose}> {lang == "eng" ? "Close" : "Sulje"} </Button>
          <Button variant="primary" onClick={handleConfirmDelete}> {lang == "eng" ? "Delete" : "Poista"} </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}


const BirthdayCampaign = ({ show, handleClose }) => {
  const lang = localStorage.getItem("language") || "eng";

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body style={{ backgroundColor: "#442b99", color: "white", textAlign: "center", borderRadius: "10px", position: "relative", padding: "20px" }}>
        <Button variant="light" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px", borderRadius: "50%" }}>×</Button>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{lang == "eng" ? "Thank you for participating in the birthday campaign!" : "Kiitos osallistumisestasi syntymäpäiväkampanjaan!"}</p>
        <p style={{ fontSize: "14px" }}>{lang == "eng" ? "Click your coupon to see detailed information, terms and conditions." : "Klikkaa kuponkiasi nähdäksesi tarkemmat tiedot, ehdot ja säännöt."}</p>
      </Modal.Body>
    </Modal>
  );
};

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
    maxHeight: "400px", // Fixed height for the list container
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
    fontSize: "12px", // Consistent font size
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