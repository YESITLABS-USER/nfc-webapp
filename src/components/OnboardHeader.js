import React, { useEffect, useRef, useState } from "react";
import Hambgr from "../assets/icons/hamburger.png";
import { FaChevronDown } from "react-icons/fa";

import HeadBg from "../assets/icons/headbg.png";
import Man from "../assets/icons/mandefalut.png";
import Girl from "../assets/icons/girldefault.png";
import Other from "../assets/icons/otherDefault.png";
import { IoArrowBackSharp } from "react-icons/io5";
// import Group from "../assets/icons/Group.png";
import Group from "../assets/targetLogo.svg";
import { Button } from "react-bootstrap";
import { TbWorld } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";
import SlidingPage from "./SlidingPage";
import OnboaringInfo from "./OnboadingInfo";
import { useNavigate } from "react-router-dom";
import { getUser, locationChange } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

// function OnboardHeader({ disabled, OLODISABLE, selectAvatar, bgrIcon = false, message, }) {
function OnboardHeader({ disabled, OLODISABLE, selectAvatar, message, }) {
  const { coupansData,activatedCoupanData } = useSelector((state) => state.coupans);
  const lang = localStorage.getItem("language") || "eng";
  
  const [showPage, setShowPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const activeUser = localStorage.getItem('nfc-app');
  const { user_id } = JSON?.parse(activeUser) || 0;

  const client_id = localStorage.getItem('client_id')

  useEffect(() => {
    if (user_id) {
      dispatch(getUser({ "id": user_id }));
    }
  }, [dispatch, user_id])

  const navigate = useNavigate();
  const profileMapping = { 0: Man, 1: Girl, 2: Other, };

  // For Language selection
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage ? storedLanguage : 'eng';
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // const selectLanguage = async (language) => { 
  //   setSelectedLanguage(language);
  //   setIsDropdownOpen(false);
  //   localStorage.setItem('language', language);
  //   window.location.reload(false);
  // };

  const selectLanguage = async (language) => {
    try {
      if(selectedLanguage == language) {
        return;
      }
      // Dispatch the locationChange action to update the language in the backend
      const response = await dispatch(locationChange({ client_table_id: client_id }));
      
      if (response && response.payload) {
        setSelectedLanguage(language);
        localStorage.setItem('language', language);
        window.location.reload(false);
      } else {
        console.error('Failed to update language.');
      }
    } catch (error) {
      console.error('Error during language selection:', error);
    }
  }
  

  return (
    <div>
      <div style={style.headtop}>
        {!activeUser ? (
          <IoArrowBackSharp
            size={30}
            style={{ marginLeft: "20px" }}
            onClick={() => {
              navigate(message === "signup" ? "/" : "/login");
            }}
          />
        ) : (
          <img
            src={Hambgr}
            style={style.hambgrimg}
            alt="Hambgr"
            onClick={() => setShowPage(true)}
          />
        )}
        <div style={{
          display: "flex",
          alignItems: "center",
          // border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "5px",
          position: "relative",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          backgroundColor: "#f9f9f9",
          width: "130px",
          height: "40px",
          marginRight: "10px",
        }} >
          <div style={{ marginRight: "10px" }}>
            <TbWorld size={22} />
          </div>
          <div style={{ flex: 1, color: "black", fontWeight: "500", fontSize: 16 }}>
            {selectedLanguage == "eng" ? "English" : "Finnish"}
          </div>
          <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} ref={dropdownRef} onClick={toggleDropdown} >
            <FaChevronDown />
          </div>

          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "45px",
                zIndex: 100,
                width: "100%",
              }} >
              <div style={{ padding: "5px 10px", cursor: "pointer", color: "black", }}
                onClick={() => selectLanguage("eng")} >
                English
              </div>
              <div style={{ padding: "5px 10px", cursor: "pointer", color: "black", }}
                onClick={() => selectLanguage("fin")} >
                Finnish
              </div>
            </div>
          )}
        </div>
      </div>
      {/* second bottom */}
      {disabled === true && (
        <>
          <div className="profile-header"
            style={{
              backgroundColor: "#25026E",
              display: "flex",
              justifyContent: "space-between",
              // height: "80px",
              padding: "30px 10px 15px 10px",
              alignItems: "center",
            }}
          >
            <FaInfoCircle
              size={18}
              color="white"
              style={{
                position: "absolute",
                right: 5,
                top: 5,
              }}
              onClick={() => setIsModalOpen(true)}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0px",
                gap: "10px", maxWidth:"45%"
              }} onClick={()=> navigate("/mypage")}
            >
              {/* <img src={Profile} alt="OLO" style={style.oloimg} /> */}
              <img className="profile-image"
                src={profileMapping[userData?.profile_pic || selectAvatar] || Man}
                alt="OLO"
                style={style.oloimg}
              />
              <div style={{ fontSize: "16px", fontFamily: "Montserrat", fontWeight: "500" }}>
                <span style={{ color: "white", display: "block" }}>
                  {userData?.first_name ?? userData?.user_name ?? "user"}
                  <br />
                  {userData?.last_name?.slice(0, 7) ?? ""}
                </span>
                {/* <span style={{ color: "white", display: "block" }}>James</span> */}
              </div>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <Button style={style.btnCopn}>
                <img
                  src={Group}
                  style={{ objectFit: "contain", marginRight: 5 }}
                  alt="Group"
                />
                <span
                  style={{
                    borderLeft: "1px dashed black",
                    paddingLeft: "5px",
                  }}
                >
                  0
                </span>
              </Button>

              <Button
                style={{
                  marginRight: 0,
                  color: "black",
                  borderColor: "black",
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundImage: `url(${HeadBg})`, // Using the imported background image directly here
                  backgroundSize: "cover", // Ensures the image covers the entire button
                  backgroundPosition: "center", // Centers the image
                  backgroundRepeat: "no-repeat", // Prevents tiling
                }}
              >
                <span style={{ paddingRight: "20px" }}>{lang == "eng" ? "Coupons" : "Kupongit"}</span>
                <span> {coupansData && (coupansData?.length + activatedCoupanData?.length) || "0"}</span>
              </Button>
            </div>
          </div>
        </>
      )}
      <SlidingPage showPage={showPage} setShowPage={setShowPage} />
      <OnboaringInfo isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default React.memo(OnboardHeader);

const style = {
  headtop: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1%",
  },
  imgTrnstor: {
    height: 30,
    width: "30%",
    objectFit: "contain",
    marginRight: 20,
  },
  headMidd: {},
  headBottm: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    alignItems: "center",
  },
  oloimg: {
    objectFit: "contain",
    backgroundColor: "white",
    borderRadius: "100%",
    // justifyContent: "start",
    // marginLeft: 15,
  },
  finlenTxt: {
    display: "flex",
    flexDirection: "column",
    marginRight: "100px",
  },
  hambgrimg: {
    objectFit: "contain",
    marginLeft: 20,
    cursor: "pointer",
  },
  btnCopn: {
    borderRadius: "10px",
    backgroundColor: "white",
    color: "black",
    // padding: "10px 20px",
    height: 30,
    // margin: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: 25,
    paddingLeft: "5px",
  },
};
