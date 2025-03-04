import React from "react";

import { Card, Button } from "react-bootstrap";

import Insta from "../assets/icons/instagramLogo.svg";
import FaceBook from "../assets/icons/facebook.svg";
import LinkedIn from "../assets/icons/linkedIn.svg";
import { useNavigate } from "react-router-dom";

const SocialMediaAbout = ({ signup }) => {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "10px" }}>
      <span
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#000000",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        Social Media
      </span>
      <div style={{ marginTop: "10px" }}>
        {/* Facebook Icon */}
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px" }}
        >
          <img src={FaceBook} alt="facebbool" />
        </a>

        {/* LinkedIn Icon */}
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px" }}
        >
          <img src={LinkedIn} alt="linked" />
        </a>

        {/* Instagram Icon */}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px" }}
        >
          {/* <FaInstagram size={40} />
           */}
          <img src={Insta} alt="insta" />
        </a>
      </div>

      {/* Card with About Us Text */}
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
            About Us
          </Card.Title>
          <Card.Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
            Membership in Tagis is completely free and risk-free. You can
            collect coupons, participate in raffles, and can join fun events
            like tag hunts. In return, we ask you to review businesses you want
            to and where you go – helping them improve their services while you
            enjoy great rewards!
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
            Know more
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SocialMediaAbout;
