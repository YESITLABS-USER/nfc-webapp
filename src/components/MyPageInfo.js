import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const MyPageInfo = ({ isModalOpen, setIsModalOpen, coops }) => {
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#2E0090",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "90%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                position: "relative",
              }}
            >
              <h2 style={{ color: "#FFFFFF" }}>Information</h2>
              <IoIosCloseCircle
                color={"white"}
                size={30}
                style={{
                  position: "absolute",
                  right: "5px",
                  cursor: "pointer",
                  top: "-10px",
                }}
                onClick={closeModal}
              />
            </div>
            {coops === true ? (
              <p style={{ color: "#FFFFFF", textAlign: "center" }}>
                All the coupons you have collected are here. Activate the coupon
                and show it at the checkout to take advantage of the offer! Your
                company-specific coupons are also available on the company's
                page, which you can access by tapping in the store.
              </p>
            ) : (
              <p style={{ color: "#FFFFFF", textAlign: "center" }}>
                You can manage which businesses send you coupons and offers.
                Choose between receiving all messages, only receiving coupons
                when tapping, or stop following. You can always change your mind
                and follow a business again by tapping in-store!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageInfo;
