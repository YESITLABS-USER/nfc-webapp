import React, { useEffect, useState } from "react";
import orange from "../assets/coupans/orange-coupon.png";
import blue from "../assets/coupans/blue-coupon.svg";
import red from "../assets/coupans/red-coupon.svg";
import black from "../assets/coupans/black-coupon.svg";
import "../styles/coupan.css";
import { MdDelete } from "react-icons/md";
import {
  addValidity,
  formatDate,
  formatTime,
  getRemainingTime,
  parseTime,
} from "../assets/common";

const CoupanComponent = ({ allData, clientData, onClick }) => {
  const colorMapping = {
    orange: orange,
    blue: blue,
    red: red,
    black: black,
  };

    const lang = localStorage.getItem("language") || "eng";

  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [validDob, setValidDob] = useState(false);

  useEffect(() => {
    if (allData?.activate_time_usa_zone) {
      const remainingTimeStr = getRemainingTime(allData?.activate_time_usa_zone, "00:10:00");
      const remainingSeconds = parseTime(remainingTimeStr ?? "00:10:00");
      const targetEndTime = Date.now() + remainingSeconds * 1000;
      setEndTime(targetEndTime);
    } else {
      const validUntil = addValidity(
        allData?.last_activation_date,
        allData?.validity_select_number,
        allData?.validity_select_time_unit
      );
      const remainingTimeStr = getRemainingTime(validUntil, "00:00:01");
      const remainingSeconds = parseTime(remainingTimeStr ?? "00:00:01");
      const targetEndTime = Date.now() + remainingSeconds * 1000;
      setEndTime(targetEndTime);
    }
  }, [allData]);

  useEffect(() => {
    if (!endTime) return;

    const updateTimeLeft = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remaining);
    };

    updateTimeLeft(); // Initial check
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const isDobValid = (allData) => {
    const currentDate = new Date();
    const currentMonthDay = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    if (allData.dob_coupon && !allData.user_date_of_birth) {
      return true;
    }

    if (allData.user_date_of_birth) {
      const userDob = new Date(allData.user_date_of_birth);
      const validDates = new Set();

      for (let i = -allData.days_before_dob; i <= allData.days_after_dob; i++) {
        let tempDate = new Date(userDob);
        tempDate.setDate(userDob.getDate() + i);
        validDates.add(`${tempDate.getMonth() + 1}-${tempDate.getDate()}`);
      }

      return validDates.has(currentMonthDay);
    }

    return true;
  };

  useEffect(() => {
    const result = isDobValid(allData);
    setValidDob(result);
  }, [allData]);

  return (
    <div style={{position: 'relative', marginBottom: "20px", width: "100%", display: "flex", alignItems: "center"}}>
      {/* <div style={{ position: "relative" }}> */}
      {timeLeft > 0 && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              backgroundColor: "#4338CA",
              color: "#FFFFFF",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              zIndex: 5,
            }}
          >
            {formatTime(timeLeft)}
          </div>
        )}
      {/* </div> */}
      <div
        className="coupon-in"
        style={{
          cursor: "pointer",
          filter:
            !allData?.activate_time_usa_zone &&
            (timeLeft || (allData?.dob_coupon && !validDob))
              ? "brightness(0.5)"
              : "",
        }}
        // onClick={ (timeLeft && !allData?.activate_time_usa_zone) || (allData?.dob_coupon && !validDob) ? null : onClick
        onClick={ (timeLeft && !allData?.activate_time_usa_zone) ? onClick : onClick
        }
      >
        <div className="coupon-left">
          <div
            className={`coupon-left-text ${
              colorMapping[allData?.color_selection] || colorMapping["orange"]
            } ${allData?.color_selection}-text`}
          >
            {/* <p>{allData?.campaign_name}</p> */}
            <p> {allData?.campaign_name?.length > 25 ? `${allData.campaign_name.slice(0, 25)}...` : allData?.campaign_name} </p>

            <h3>
              {allData?.coupon_type_content?.[0]?.discount_value ||
              allData?.coupon_type_content?.[0]?.discount_percentage
                ? `${allData?.coupon_type_content?.[0]?.discount_value || allData?.coupon_type_content?.[0]?.discount_percentage}% off`
                : "FREE"}
            </h3>
          </div>
        </div>

        <div
          className={`coupon-right ${
            colorMapping[allData?.color_selection] || colorMapping["orange"]
          } ${allData?.color_selection}-bg`}
        >
          <div className="coupon-right-text">
            <h2>{clientData?.client_name ?? "OLO"}</h2>
            <h3>{allData?.coupon_name}</h3>
            <p>
              {lang =="eng" ?  "VALID UNTIL" : "Voimassa asti"}
              <b>
                {allData?.validity_no_limit
                  ? "No Expiration"
                  : allData?.validity_expiration_date
                  ? formatDate(allData?.validity_expiration_date)
                  : "No Expiration"}
              </b>
            </p>
            {allData?.campaign_age_restriction_start_age >= 18 && (
              <span>Age : 18+</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoupanComponent;