import React, { useEffect } from "react";
import OnboardHeader from "../components/OnboardHeader";
import Logo from "../assets/icons/logo1.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAboutTagis } from "../store/slices/aboutTagisAndServicesSlice";

function AboutScreen() {
  const location = useLocation();
  const { message } = location.state || {};
  const dispatch = useDispatch();
  const { tagisData, loading } = useSelector((state) => state.aboutTagisAndServices)
  const lang = localStorage.getItem("language") || "eng";
 

  useEffect(() => {
    dispatch(getAboutTagis())
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <div>
      <div style={{ margin: "8px 0" }}>
        {/* <OnboardHeader bgrIcon={true} message={message} /> */}
        <OnboardHeader message={message} />
      </div>
      <div style={{
          backgroundColor: "#E0E0E0",
          width: "100vw",
          height: "3px",
          padding: "0",
          boxSizing: "border-box",
        }} />

      <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }} >
        <img src={Logo} alt="logo" />
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }} >
          <span style={{ color: "#000000", fontSize: 20, fontWeight: "600" }}> TAGIS </span>
          <span style={{ color: "#2D008C", fontSize: 16, fontWeight: "bold" }}> {lang == "eng" ? "Tap Connect Experience" : "Ei sovellusta, napauta vain!"} </span>
        </div>
      </div>
      <h3 style={{
          fontWeight: "bold",
          width: "92%",
          display:"flex",
          margin:"15px auto",
          marginTop: "30px",
        }} >
        {lang == "eng" ? "About Tagis" : "Tietoa Tagiksesta"}
      </h3>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", fontSize: "20px", fontWeight: "bold", color: "gray", }} > {lang == "eng" ? "Loading" : "Ladataan"}... </div>
        ) : (
      <div style={{ width: "90%", margin: "0 auto" }} dangerouslySetInnerHTML={{ __html : tagisData?.text }}/> )}
    </div>
  );
}

export default AboutScreen;
