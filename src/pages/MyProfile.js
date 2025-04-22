import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";

import Man from "../assets/icons/mandefalut.png";
import Girl from "../assets/icons/girldefault.png";
import Other from "../assets/icons/otherDefault.png";
import CustomButton from "../components/custom/CustomButton";
import { Button } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import LogoutModalImg from "../assets/icons/logoutModal.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser, updateUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import AddShortCut from "../components/AddShortCut";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [selectedProfile, setSelectedProfile] = useState(userData?.profile_pic || null);
  const [birthdayInput, setBirthdayInput] = useState(userData?.date_of_birth ? true : false);
  const [firstNameInput, setFirstNameInput] = useState(userData?.first_name ? true : false);
  const [surNameInput, setSurNameInput] = useState(userData?.last_name ? true : false);
  const [emailInput, setEmailInput] = useState(userData?.email ? true : false);
  const [selectAvatar, setSelectAvator] = useState(userData?.profile_pic || 0);
  const [informationPopup, setInformationPopup] = useState(false);
  const [showdeletePopup, setShowDeletePopup] = useState(false);
  const [showShortcut, setShowShortcut] = useState(false)
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [updateData, setUpdateData] = useState({
    date_of_birth: null,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    email: userData?.email,
    gender: userData?.gender
  });
  const { user_id } = JSON?.parse(localStorage.getItem("nfc-app")) || 0;

  useEffect(() => {
    if (user_id) {
      dispatch(getUser({ "id": user_id }));
    } else {
      navigate("/");
    }
  }, [user_id, dispatch])

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const handleDeleteConfirm = () => {
    setShowDeletePopup(false);
    dispatch(deleteUser({ user_id: user_id }));
  };

  const handleSubmit = () => {
    dispatch(updateUser({ ...updateData, id: user_id }));
    console.log(updateData)
  }

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
                dispatch(updateUser({ profile_pic: profile.id, id: user_id }));
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

          {birthdayInput ? (
            <input
              type="date"
              placeholder={userData?.date_of_birth ? userData.date_of_birth : "Add"}
              disabled={!!userData?.date_of_birth}
              value={userData?.date_of_birth || updateData?.date_of_birth || ""}
              onChange={(e) => setUpdateData({ ...updateData, date_of_birth: e.target.value })}
              style={{
                display: "block",
                marginTop: "10px",
                padding: "5px",
                border: "none",
                borderBottom: "2px solid #D1D1D1",
                width: "100%",
                outline: "none",
              }}
            />

          ) : (
            <button onClick={() => setBirthdayInput(true)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "#2A0181",
                color: "white",
                borderRadius: 30,
                width: "30%",
                height: 40,
              }} >
              ADD
            </button>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ width: "40%", color: "#000000", fontWeight: "500" }}>
            First Name
          </label>
          {firstNameInput ? (
            <input type="text" placeholder={userData?.first_name ?? "Add"} onChange={(e) => setUpdateData({ ...updateData, first_name: e.target.value })}
              style={{
                display: "block",
                marginTop: "10px",
                padding: "5px",
                border: "none", // Removes the default border
                borderBottom: "2px solid #D1D1D1",
                width: "100%", // Adds only the bottom border
                outline: "none", // Removes the focus outline
              }} />
          ) : (
            <button onClick={() => setFirstNameInput(true)}
              style={{
                border: "none",
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "#2A0181",
                color: "white",
                borderRadius: 30,
                width: "30%",
                height: 40,
              }} >
              ADD
            </button>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ width: "40%", color: "#000000", fontWeight: "500" }}>
            Surname
          </label>
          {surNameInput ? (
            <input type="text" placeholder={userData?.last_name ?? "Add"} onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}
              style={{
                display: "block",
                marginTop: "10px",
                padding: "5px",
                border: "none", // Removes the default border
                borderBottom: "2px solid #D1D1D1",
                width: "100%", // Adds only the bottom border
                outline: "none", // Removes the focus outline
              }} />
          ) : (
            <button onClick={() => setSurNameInput(true)}
              style={{
                border: "none",
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "#2A0181",
                color: "white",
                borderRadius: 30,
                width: "30%",
                height: 40,
              }} >
              ADD
            </button>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ width: "40%", color: "#000000", fontWeight: "500" }}>
            Email
          </label>
          {emailInput ? (
            <input type="email" placeholder={userData?.email ?? "Add"} onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
              style={{
                display: "block",
                marginTop: "10px",
                padding: "5px",
                border: "none", // Removes the default border
                borderBottom: "2px solid #D1D1D1",
                width: "100%", // Adds only the bottom border
                outline: "none", // Removes the focus outline
              }}
            />
          ) : (
            <button onClick={() => setEmailInput(true)} style={{
              border: "none",
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#2A0181",
              color: "white",
              borderRadius: 30,
              width: "30%",
              height: 40,
            }} >
              Add
            </button>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#000000", fontWeight: "500" }}>Sex</label>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <label style={{ color: "#000000", fontWeight: "500" }}>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setUpdateData({ ...updateData, gender: 0 })}
                checked={updateData.gender === 0 || updateData.gender === "0"}
              /> Male
            </label>
            <label style={{ color: "#000000", fontWeight: "500" }}>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setUpdateData({ ...updateData, gender: 1 })}
                checked={updateData.gender === 1 || updateData.gender === "1"}
              /> Female
            </label>
            <label style={{ color: "#000000", fontWeight: "500" }}>
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={(e) => setUpdateData({ ...updateData, gender: 2 })}
                checked={updateData.gender === 2 || updateData.gender === "2"}
              /> Other
            </label>
          </div>
        </div>

        {/* <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#000000", fontWeight: "500" }}>Sex</label>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <label style={{ color: "#000000", fontWeight: "500" }}>
              <input 
                type="radio" 
                name="sex" 
                value="male" 
                checked={updateData.gender === "male"} 
                onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
              /> Male
            </label>
            <label style={{ color: "#000000", fontWeight: "500" }}>
              <input 
                type="radio" 
                name="sex" 
                value="female" 
                checked={updateData.gender === "female"} 
                onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
              /> Female
            </label>
            <label style={{ color: "#000000", fontWeight: "500" }}>
              <input 
                type="radio" 
                name="sex" 
                value="other" 
                checked={updateData.gender === "other"} 
                onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
              /> Other
            </label>
          </div>
        </div> */}

        <CustomButton text="SAVE" style={{ width: "140px" }} onClick={handleSubmit} fullWidth={"40%"} />

        <div style={{ marginTop: 30 }}> <hr /> </div>

        <div style={{ position: "relative", display: "flex", justifyContent: "center", gap: "15px", alignItems: "center", fontWeight: "700", marginTop: 30, }}> Delete account: <Button style={{ backgroundColor: "#2A0181", border: "rgb(42, 1, 129)" }} onClick={() => {
          setShowDeletePopup(!showdeletePopup);
        }}> DELETE </Button>

          <FaInfoCircle size={18} style={{ position: "absolute", right: "0", top: "-10px" }}
            onClick={() => setInformationPopup(!informationPopup)} color="#2A0181" />
        </div>

        <div style={{ position: "relative", display: "flex", justifyContent: "center", gap: "15px", alignItems: "center", fontWeight: "700", marginTop: 30, }}> <Button style={{ backgroundColor: "#2A0181", border: "rgb(42, 1, 129)" }} onClick={() => {
          setShowShortcut(!showShortcut);
        }}> Add to Shortcut </Button>

        </div>


        <InformationPopup show={informationPopup} onHide={() => setInformationPopup(false)} />

        <DeletePopup show={showdeletePopup} onHide={() => setShowDeletePopup(false)} onDeleteConfirm={handleDeleteConfirm} />

        <LogoutPopup show={showLogout} onHide={() => setShowLogout(false)} />
          <AddShortCut isModalOpen={showShortcut} setIsModalOpen={setShowShortcut} />
      </div>
    </>
  );
};

export default MyProfile;

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

function DeletePopup(props) {
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
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
          textAlign: "center",
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
          onClick={props.onHide} > x </span>

        <h5 style={{ fontSize: "18px", paddingTop: "25px", fontWeight: "600" }}>
          Are you sure you want to delete your account?</h5>
        <p style={{ fontSize: "16px", fontWeight: "500" }}>
          Deleting your account deletes all your coupons and tickets.</p>
        <Button
          style={{
            backgroundColor: "white",
            color: "#2A0181",
            fontWeight: "bold",
            border: "white",
            borderRadius: 20,
            width: 120,
          }}
          onClick={props.onDeleteConfirm}
        >
          Delete</Button>
      </Modal.Body>
    </Modal>
  );
}

function LogoutPopup(props) {
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
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
          textAlign: "center",
          padding: "30px 0",
        }}
      >
        <span
          style={{
            backgroundColor: "white",
            color: "#2A0181",
            fontSize: "20px",
            position: "absolute",
            right: "8px",
            borderRadius: "100%",
            top: "10px",
            width: "30px",
            textAlign: "center",
            fontWeight: "bolder",
            cursor: "pointer",
          }}
          onClick={props.onHide}
        >

          x
        </span>

        <img src={LogoutModalImg} alt="logout" />
        <h5 style={{ fontSize: "16px", paddingTop: "25px" }}>

          Are you sure you want to Logout ?
        </h5>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button
            style={{
              backgroundColor: "white",
              color: "#2A0181",
              fontWeight: "bold",
              border: "white",
            }}
            onClick={props.onHide}
          >

            No
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              color: "#2A0181",
              fontWeight: "bold",
              border: "white",
            }}
            onClick={props.onHide}
          >

            Yes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
