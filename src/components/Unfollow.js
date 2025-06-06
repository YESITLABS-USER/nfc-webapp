import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const UnFollow = ({ isModalOpen, setIsModalOpen, itemId, onUnfollow, selectedCardDetail }) => {
  const closeModal = () => setIsModalOpen(false);
  const lang = localStorage.getItem("language") || "eng";

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

  const handleUnfollow = () => {
    onUnfollow(itemId); // Pass the itemId to the parent component
    setIsModalOpen(false); // Close the modal after unfollowing
  };

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
              padding: "40px 20px 20px 20px",
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
              <h2 style={{ color: "#FFFFFF" }}>{lang =="eng" ? "Confirm Unfollowing" : "Vahvista seurannan lopettaminen"}</h2>
              <IoIosCloseCircle
                color={"white"}
                size={30}
                style={{
                  position: "absolute",
                  right: "-10px",
                  cursor: "pointer",
                  top: "-30px",
                }}
                onClick={closeModal}
              />
            </div>
            <p style={{ color: "#FFFFFF", textAlign: "center" }}>
              {lang == "eng" ? `Unfollowing a company will delete all your Coupons from this company and cancels all progress in coupons. You stop receiving all future offers from ${selectedCardDetail?.client_name} You can start following again once you tap their Tagis tag in store.` : `Yrityksen seurannan lopettaminen poistaa kaikki tämän yrityksen kuponkisi ja leimakorttisi. Et enää vastaanota tulevia tarjouksia yritykseltä ${selectedCardDetail?.client_name} Voit aloittaa seurannan uudelleen täppäämällä heidän Tagis-tagiaan liikkeessä.`}
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
              onClick={handleUnfollow}
            >
              {lang == "eng" ? "UNFOLLOW" : "LOPETA SEURAAMINEN"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnFollow;
