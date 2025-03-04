import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";
import Logo from "../assets/icons/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { getPrivacyPolicy, getTermsCondition } from "../store/slices/TermsAndPrivacySlice";
import { useLocation, useNavigate } from "react-router-dom";

function TermCondn() {
  const [activeTab, setActiveTab] = useState("privacy");
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/privacy-policy') {
      setActiveTab('privacy');
    } else if (location.pathname === '/terms-condition') {
      setActiveTab('terms');
    }
  }, [location.pathname]); 

  const dispatch = useDispatch();
  const { termsData, privacyData, loading } = useSelector(
    (state) => state.termsPrivacy
  );

  useEffect(() => {
    dispatch(getTermsCondition());
    dispatch(getPrivacyPolicy());
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if(tab == "privacy") {
      navigate('/privacy-policy')
    } else{
      navigate('/terms-condition')
    }
  };

  return (
    <>
      <div style={{ marginTop: 10 }}>
        <OnboardHeader />
      </div>

      <div style={{ backgroundColor: "#E0E0E0", width: "100vw", height: "3px", padding: "0", boxSizing: "border-box", marginTop: -30, }} />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
          <img src={Logo} alt="logo" />

          <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", }} >
            <span style={{ color: "#000000", fontSize: 20, fontWeight: "600" }}> TAGIS </span>
            <span style={{ color: "#2D008C", fontSize: 16, fontWeight: "bold" }}> Tap Connect Experience </span>
          </div>
        </div>
        <div style={{ margin: 20 }}>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <button onClick={() => handleTabChange("privacy")} 
              style={{ padding: "10px 20px", fontSize: "14px",  border: "none", borderRadius: "5px", 
                cursor: "pointer", marginRight: "10px", fontWeight: "600",
                backgroundColor: activeTab === "privacy" ? "#E7DCFF" : "white",
                color: activeTab === "privacy" ? "#2D008C" : "#000000",               
              }} >
              Privacy Policy
            </button>
            <button onClick={() => handleTabChange("terms")}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                backgroundColor: activeTab === "terms" ? "#E7DCFF" : "white",
                color: activeTab === "terms" ? "#2D008C" : "#000000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "600",
              }} >
              Terms & Conditions
            </button>
          </div>

        {/* Display Content Based on Active Tab */}
          <div>
            {activeTab === "privacy" || activeTab === "terms" ? (
              <>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
                    height: "60vh", fontSize: "20px", fontWeight: "bold", color: "gray", }} >
                    Loading...
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ 
                      __html: activeTab === "privacy" ? privacyData?.content : termsData?.content, }}
                  />
                )}
              </>
            ) : null}
          </div>
      </div>
    </>
  );
}

export default TermCondn;
