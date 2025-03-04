import React from "react";

const BottomSheet = ({ isOpen, onClose, children }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: isOpen ? "0" : "-40%",
        left: "0",
        width: "100%",
        height: "40%",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
        transition: "bottom 0.3s ease",
        padding: "20px",
        zIndex: 1000,
        borderTopRightRadius: "30px",
        borderTopLeftRadius: "30px",
      }}
    >
      {children}
    </div>
  );
};

export default BottomSheet;
