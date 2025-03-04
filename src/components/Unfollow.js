import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const UnFollow = ({ isModalOpen, setIsModalOpen }) => {
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
              <h2 style={{ color: "#FFFFFF" }}>Confirm Unfollowing</h2>
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
            <p style={{ color: "#FFFFFF", textAlign: "center" }}>
              Unfollowing a company will delete all your Coupons from this
              company and cancels all progress in coupons. You stop receiving
              all future offers from BASBAS You can start following again once
              you tap their Tagis tag in store.
            </p>
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#fff",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => setIsModalOpen(false)}
            >
              UNFOLLOW
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnFollow;
