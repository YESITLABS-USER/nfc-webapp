import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";

import Man from "../assets/icons/mandefalut.png";
import Girl from "../assets/icons/girldefault.png";
import Other from "../assets/icons/otherDefault.png";
import Modal from "react-bootstrap/Modal";
import { getUser } from "../store/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import AddShortCut from "../components/AddShortCut";
import { useDispatch, useSelector } from "react-redux";

const ProfileById = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  
  const { userData } = useSelector((state) => state.user);

  const [selectedProfile, setSelectedProfile] = useState(userData?.profile_pic || null);
  const [selectAvatar, setSelectAvator] = useState(userData?.profile_pic || 0);
  const [informationPopup, setInformationPopup] = useState(false);
  const [showShortcut, setShowShortcut] = useState(false)
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    date_of_birth: null,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    email: userData?.email,
    gender: userData?.gender
  });

  useEffect(() => {
    if (id) {
      dispatch(getUser({ "id": id }));
    } else {
      navigate("/");
    }
  }, [id, dispatch])

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <>
      <OnboardHeader disabled={true} selectAvatar={selectAvatar} />

      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <label
          style={{
            display: "block",

            color: "#000000",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          Profile Picture
        </label>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {[
            { id: "0", label: "Male", image: Man, },
            { id: "1", label: "Female", image: Girl, },
            { id: "2", label: "Transgender", image: Other, },
          ].map((profile) => (
            <div key={profile.id} style={{ textAlign: "center", width: "100%" }} >
              <img src={profile.image} alt={profile.label}
                style={{
                  border: selectedProfile == profile.id ? "3px solid green" : "1px solid #ccc",
                  borderRadius: "50px",
                  width: "75px",
                  height: "75px",
                  objectFit: "cover",
                }} />
              <button onClick={() => {
                handleProfileSelect(profile.id);
                setSelectAvator(profile.id);
              }}
                style={{
                  fontSize: "14px",
                  marginTop: "10px",
                  padding: "4px 10px",
                  backgroundColor: profile.id == "3" ? "#000000" : selectedProfile == profile.id
                    ? "#2A0181" // Purple for selected profile
                    : "#DB00FF", // Default color for other profiles
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  width: "100%",
                }} >
                {selectedProfile == profile.id ? "Selected" : "Select"}
              </button>
            </div>
          ))}
        </div>
        <label style={{ display: "block", marginBottom: "10px", color: "#000000", fontWeight: "bold", fontSize: 20 }} >
          Personal Information:
        </label>

        <div style={{ marginBottom: "20px" }}>
          <p>
            <span style={{ color: "#000000", fontWeight: "500" }}> Personal ID </span>
            <span style={{ display: "inline-block", marginLeft: "60px" }}> {userData?.user_id ?? "Not Available"} </span>
          </p>

          <p>
            <span style={{ color: "#000000", fontWeight: "500" }}> NickName </span>
            <span style={{ display: "inline-block", marginLeft: "70px" }}> {userData?.user_name ?? "Not Available"} </span>
          </p>

          <p>
            <span style={{ color: "#000000", fontWeight: "500" }}> Phone No </span>
            <span style={{ display: "inline-block", marginLeft: "70px" }}> {userData?.phone_number ?? "Not Available"} </span>
          </p>

        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ width: "40%", color: "#000000", fontWeight: "500" }} >
            Birthday
          </label>
          <span style={{ display: "inline-block", marginLeft: "20px" }}> {userData?.date_of_birth ?? "Not Available"} </span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ width: "40%", color: "#000000", fontWeight: "500" }}>
            First Name
          </label>
          <span style={{ display: "inline-block", marginLeft: "20px" }}> {userData?.first_name ?? "Not Available"} </span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ width: "40%", color: "#000000", fontWeight: "500" }}>
            Surname
          </label>
          <span style={{ display: "inline-block", marginLeft: "20px" }}> {userData?.last_name ?? "Not Available"} </span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ width: "40%", color: "#000000", fontWeight: "500" }}>
            Email
          </label>
          <span style={{ display: "inline-block", marginLeft: "20px" }}> {userData?.email ?? "Not Available"} </span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{width: "40%", color: "#000000", fontWeight: "500" }}>Sex</label>
          <span style={{ display: "inline-block", marginLeft: "20px" }}>
            { updateData.gender === 0 ? "Male" : updateData.gender === 1 ? "Female" : updateData.gender === 2 ? "Other" : "Not Available" }
          </span>

          
        </div>

        <div style={{ marginTop: 30 }}> <hr /> </div>

        <InformationPopup show={informationPopup} onHide={() => setInformationPopup(false)} />
          <AddShortCut isModalOpen={showShortcut} setIsModalOpen={setShowShortcut} />
      </div>
    </>
  );
};

export default ProfileById;

function InformationPopup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: "#2A0181",
          color: "white",
          fontSize: "14px",
          borderRadius: "8px",
        }}
      >
        <span
          style={{
            backgroundColor: "white",
            color: "#2A0181",
            fontSize: "14px",
            position: "absolute",
            right: "8px",
            borderRadius: "100%",
            top: "10px",
            width: "20px",
            height: "20px",
            textAlign: "center",
            fontWeight: "bolder",
            cursor: "pointer",
          }}
          onClick={props.onHide}
        >

          x
        </span>

        <h6 style={{ textAlign: "center", fontWeight: "600" }}>Information</h6>
        <p style={{ fontWeight: "600" }}>
          Deleting your account is a permanent action and cannot be undone. By
          proceeding, you will lose access to all your data, including:
        </p>
        <ul style={{ fontWeight: "500" }}>
          <li>Coupons, rewards, and saved offers</li>
          <li>Raffle tickets</li>
          <li>Personalized settings and preferences</li>
        </ul>
        <p style={{ fontWeight: "600" }}>Please note:</p>
        <ul style={{ fontWeight: "600" }}>
          <li>Once deleted, we cannot recover your data.</li>
          <li>Any pending rewards or promotions will be forfeited.</li>
          <li>
            You will no longer receive updates or notifications from Tagis.
          </li>
          <li>Your account will be deleted within 1 month.</li>
        </ul>
      </Modal.Body>
    </Modal>
  );
}