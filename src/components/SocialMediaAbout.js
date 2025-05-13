import React from "react";

import { Card, Button } from "react-bootstrap";

import Insta from "../assets/icons/instagramLogo.svg";
import FaceBook from "../assets/icons/facebook.svg";
import youtube from "../assets/icons/youtube.png";
import twitter from "../assets/icons/x.png";
import tiktok from "../assets/icons/tiktok.png";
import { useLocation, useNavigate } from "react-router-dom";
import { formatUrl } from "../assets/common";

const SocialMediaAbout = ({ signup, data=null }) => {
  const navigate = useNavigate();
  const currentPage = useLocation();
  const lang = localStorage.getItem("language") || "eng";

  return (
    <div style={{ margin: "10px" }}>
      {(data?.facebook || data?.youtube || data?.instagam || data?.tiktok_link || data?.twitter_link) && <span
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#000000",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
        }} >
        {lang == "eng" ? "Social Media" : "Sosiaalinen Media"}
      </span>}
      { (data?.facebook || data?.youtube || data?.instagam || data?.tiktok_link || data?.twitter_link) && 
        <div className="dash-social" style={{ marginTop: "10px" }}>
          
          {data?.facebook && 
            <a href={formatUrl(data?.facebook)} target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }} >
            <img src={FaceBook} alt="facebbool" />
          </a>}

          {/* <a href={formatUrl("https://)www.linkedin.com"} target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
            <img src={LinkedIn} alt="linked" />
          </a> */}

          <a href={formatUrl(data?.youtube)} target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
            <img src={youtube} alt="linked" style={{maxWidth:"45px"}}/>
          </a>

          {data?.instagam && 
            <a href={formatUrl(data?.instagam)} target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }} >
            <img src={Insta} alt="insta" />
          </a>}

          {data?.tiktok_link && 
            <a href={formatUrl(data?.tiktok_link)} target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }} >
            <img src={tiktok} alt="tiktok" style={{maxWidth:"45px", height:"45px"}}/>
          </a>}

          {data?.twitter_link && 
            <a href={formatUrl(data?.twitter_link)} target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }} >
            <img src={twitter} alt="twitter" style={{maxWidth:"45px", height:"45px"}}/>
          </a>}

        </div>
      }

      {/* Card with About Us Text */}
      {currentPage?.pathname != "/dashboard" && 
        <Card
          style={{
            zIndex: "100",
            backgroundColor: "#25026E",
            color: "white",
            marginTop: "30px",
            borderRadius: "20px",
          }}
        >
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Card.Title
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {lang == "eng" ? "About Us" : "Tietoa Meistä"}
            </Card.Title>
            <Card.Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
             {lang == "eng" ? "Membership in Tagis is completely free and risk-free. You can collect coupons, participate in raffles, and can join fun events like tag hunts. In return, we ask you to review businesses you want to and where you go - helping them improve their services while you enjoy great rewards!" : "Tagis-jäsenyys on täysin ilmaista ja riskitöntä. Voit kerätä kuponkeja, osallistua arvontaan ja osallistua hauskoihin tapahtumiin, kuten tunnisteiden metsästykseen. Vastineeksi pyydämme sinua arvioimaan haluamasi yritykset ja minne olet menossa – autamme heitä parantamaan palveluitaan samalla, kun nautit upeista palkkioista!"}
            </Card.Text>

            {/* Know More Button */}
            <Button
              variant="light" // Makes the button background white with black text
              style={{
                marginTop: "15px", // Adds spacing between text and button
                padding: "10px 20px", // Adds padding inside the button
                fontSize: "16px", // Adjusts button text size
                borderColor: "black", // Makes the button border black
                alignSelf: "center",
                borderRadius: 30,
                color: "black", // Sets the font color to black
                fontWeight: "600",
              }}
              onClick={() =>
                navigate("/about-tagis", {
                  state: { message: signup ? "signup" : "login" },
                })
              } // Example onClick handler
            >
              {lang == "eng" ? "Know more" : "Lue Lisää"}
            </Button>
          </Card.Body>
        </Card>
      }
    </div>
  );
};

export default SocialMediaAbout;
