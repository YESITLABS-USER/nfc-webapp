import React, { useEffect, useState } from "react";
import Start from "../assets/icons/startPattern.png";
import "../styles/login.css";
import CustomInput from "../components/custom/CustomInput";
import CustomButton from "../components/custom/CustomButton";
import * as Yup from "yup"; // For form validation schema

import GoogleReview from "../assets/icons/googleReview.svg";
import SocialMediaAbout from "../components/SocialMediaAbout";
import Coopons from "../components/Coopons";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Verification from "../components/VerificationModal";
import { signIn } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(false);
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user) 

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name should be at least 3 characters long'),
    phone_number: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  });

    useEffect(() => {
      const loggedInUser = JSON.parse(localStorage.getItem("nfc-app"))?.token
      if(loggedInUser){
        navigate('/dashboard')
      }
    }, [])
    
  const handleSubmit = async(values) => {
    try {
      const result = await dispatch(signIn(values));
      if (result.meta?.requestStatus === 'fulfilled') {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <>
      <div style={{ marginTop: 10 }}>
        <Header chgName={true} />
      </div>
      <div className="login-container">
        <img src={Start} alt="Start Pattern" className="start-img" />
        <div className="text-container">
          <span style={{ color: "#000000", fontSize: "16px", fontWeight: "600" }}> TAGIS </span>
          <span style={{ color: "#2D008C", fontWeight: "bold" }}> Tap Connect Experience </span>
        </div>
      </div>

      <div className="text-container">
        <span style={{
            color: "#000000",
            fontSize: "20px",
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: 20,
          }} > 
          Welcome to Tagis!
        </span>
        <span style={{
            fontSize: "16px",
            textAlign: "center",
            alignSelf: "center",
          }} >
          Review easily, enjoy benefits - It all <br /> happens with just{" "}
          <span style={{ color: "#2C0089", fontWeight: "bold" }}>one tap!</span>
        </span>
      </div>

      <Formik initialValues={{ name: "", phone_number: "" }}  validationSchema={validationSchema} 
        onSubmit={handleSubmit}
      >
        {({ values, handleBlur,setFieldValue, errors, touched, handleSubmit }) => (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginTop: "20px", width: "80%", margin: "20px auto" }}>
              <CustomInput
                value={values.name}
                onChange={(e) => setFieldValue("name",e.target.value)}
                onBlur={handleBlur}
                name="name"
                label="Name"
                style={{ width: "80%" }}
              />
              {errors.name && touched.name && (
                <p style={{ color: "red", width: "80%", marginLeft: "10px", marginTop: "5px", fontWeight: "500" }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div style={{ marginTop: "20px", width: "80%", margin: "20px auto" }}>
              <CustomInput value={values.phone_number}
                onChange={(e) => {
                  setFieldValue("phone_number",(e.target.value));
                  setSelectedPhoneNumber(Number(e.target.value))
                }}
                onBlur={handleBlur}
                name="phone_number"
                label="Phone Number"
                num={true}
              />
              {errors.phone_number && touched.phone_number && (
                <p style={{ color: "red", marginLeft: "10px", marginTop: "5px", fontWeight: "500" }}>
                  {errors.phone_number}
                </p>
              )}
            </div>

            <CustomButton text={loading ? "Loading..." : "Log In"}  onClick={handleSubmit}  fullWidth={"40%"} />
          </div>
        )}
      </Formik>

      <div style={{
          backgroundColor: "#E0E0E0",
          width: "100vw",
          height: "3px",
          padding: "0",
          boxSizing: "border-box",
          marginTop: "20px",
        }} />

      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }} >
        <img src={GoogleReview} alt="Star Pattern" className="start-img" style={{ width: "auto", height: "auto" }}/>
      </div>

      <CustomButton text="Leave a review" onClick={() => {}} fullWidth={"50%"} />

      {/* for coopons */}
      <Coopons setCallback={() => {}} value={false} />

      <div style={{
          backgroundColor: "#E0E0E0",
          width: "100vw",
          height: "3px",
          padding: "0",
          boxSizing: "border-box",
          marginTop: "20px",
        }} />

      {/* social medias */}
      <SocialMediaAbout signup={false} />
      <Verification isModalOpen={isModalOpen} data={{phone_number: selectedPhoneNumber}} setIsModalOpen={setIsModalOpen} />

    </>
  );
};

export default LoginPage;
