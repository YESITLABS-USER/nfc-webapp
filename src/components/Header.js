import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/header.css";
// import ImgBurger from "../assets/icons/hamburger.png";
import OIO from "../assets/icons/header.png";
import { Link } from "react-router-dom";
import SlidingPage from "./SlidingPage";

const Header = ({ chgName = false, data = null }) => {
  const [showPage, setShowPage] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  return (
    <div>
      <div className="header-container">
        <div className="header-left"></div>
        <div className="header-buttons">
          <Button variant="primary" style={{ backgroundColor: "#2D008D", borderRadius: "10px" }} >
            {chgName === true ? (
              <Link to="/signup" style={{ textDecoration: "none", color: "white" }} >
                Sign Up
              </Link>
            ) : (
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Log In
              </Link>
            )}
          </Button>
          <Button variant="secondary" className="coupons-button" style={{ borderRadius: "10px" }} >
            <span>Coupons</span>
            {/* <img
              src={Line}
              alt="line"
              style={{ marginLeft: 10, marginRight: 10 }}
            /> */}
            <span>0</span>
          </Button>
        </div>
      </div>
      <div className="header-extra">
        <img
          src={data?.company_logo ? (backendUrl + "/" + data?.company_logo) : OIO}
          alt="restaurent logo"
          style={{
            width: "auto",
            height: "70px",
            objectFit: "contain",
            justifyContent: "start",
          }}
        />
        <div className="text-container">
          <span className="restaurant-name">{data?.client_name || "OLO"}</span>
          <span className="location">{data?.location_name || "Helsinki, Finland"}</span>
        </div>
      </div>
      <SlidingPage showPage={showPage} setShowPage={setShowPage} />
    </div>
  );
};

export default React.memo(Header);
