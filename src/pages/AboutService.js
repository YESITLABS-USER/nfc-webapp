import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";
import Logo from "../assets/icons/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { getAboutServices } from "../store/slices/aboutTagisAndServicesSlice";

function AboutService() {
  const storedTab = localStorage.getItem("activeTab");
  const validTabs = ["coupons", "giveaways", "events"];
  const initialTab = validTabs.includes(storedTab) ? storedTab : "coupons";
  const [activeTab, setActiveTab] = useState(initialTab);
  // Default to 'coupons'
  const dispatch = useDispatch();
  const { servicesData, loading } = useSelector((state) => state.aboutTagisAndServices)
  useEffect(() => {
    dispatch(getAboutServices())
  }, [dispatch])
  
  // Function to handle button clicks
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab); 
  };
  return (
    <div>
      <div style={{ marginTop: 10 }}> <OnboardHeader /> </div>
      <div style={{
          backgroundColor: "#E0E0E0",
          width: "100vw",
          height: "3px",
          padding: "0",
          boxSizing: "border-box",
          marginTop: -30,
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
          <span style={{ color: "#2D008C", fontSize: 16, fontWeight: "bold" }}> Tap Connect Experience </span>
        </div>
      </div>

      <div style={{ margin: 20 }}>
        <div>
          <button onClick={() => handleTabChange("coupons")}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: activeTab === "coupons" ? "#E7DCFF" : "white",
              color: activeTab === "coupons" ? "#2D008C" : "#000000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              fontWeight: "500",
            }} >
            COUPONS
          </button>
          <button onClick={() => handleTabChange("giveaways")}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: activeTab === "giveaways" ? "#E7DCFF" : "white",
              color: activeTab === "giveaways" ? "#2D008C" : "#000000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              fontWeight: "600",
            }} >
            GIVE AWAYS
          </button>
          <button onClick={() => handleTabChange("events")}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: activeTab === "events" ? "#E7DCFF" : "white",
              color: activeTab === "events" ? "#2D008C" : "#000000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
            }} >
            EVENTS
          </button>
        </div>

        {/* Display Content Based on Active Tab */}
        <div style={{ marginLeft: 10 }}>
          {activeTab === "coupons" ? (
            <div style={{paddingTop:"25px"}}>
              <>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
                    height: "60vh", fontSize: "20px", fontWeight: "bold", color: "gray", }} >
                    Loading...
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ 
                      __html:servicesData?.coupons_text }}
                  />
                )}
              </>   

            </div>
          ) : activeTab === "giveaways" ? (
            <div style={{paddingTop:"25px"}}>
              <>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
                    height: "60vh", fontSize: "20px", fontWeight: "bold", color: "gray", }} >
                    Loading...
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ 
                      __html:servicesData?.giveway_text }}
                  />
                )}
              </> 
            </div>
          ) : (
            <div style={{paddingTop:"25px"}}>
              <>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
                    height: "60vh", fontSize: "20px", fontWeight: "bold", color: "gray", }} >
                    Loading...
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ 
                      __html:servicesData?.events_text }}
                  />
                )}
              </> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutService;
