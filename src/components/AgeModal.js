import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import CancelModal from "./CancelModal";

const AgeModal = ({ isModalOpen, setIsModalOpen, callBack }) => {
  const closeModal = () => setIsModalOpen(false);

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [cancelModal, setCancelModal] = useState(false);

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

  //

  // const handleDateChange = (e) => {
  //   let input = e.target.value;

  //   // Save the cursor position
  //   // const cursorPosition = e.target.selectionStart;
  //   const isDeleting = input.length < value.length;

  //   // Remove all non-numeric characters
  //   input = input.replace(/\D/g, "");

  //   if (isDeleting) {
  //     // Format progressively while deleting
  //     if (input.length >= 6) {
  //       input =
  //         input.slice(0, 2) + "/" + input.slice(2, 4) + "/" + input.slice(4);
  //     } else if (input.length >= 4) {
  //       input = input.slice(0, 2) + "/" + input.slice(2, 4);
  //     } else if (input.length >= 2) {
  //       input = input.slice(0, 2) + "/";
  //     }
  //   } else {
  //     if (input.length > 2) {
  //       input = input.slice(0, 2) + "/" + input.slice(2);
  //     }
  //     if (input.length > 5) {
  //       input = input.slice(0, 5) + "/" + input.slice(5, 10);
  //     }

  //     // Restrict the length to 10 characters
  //     if (input.length > 10) {
  //       input = input.slice(0, 10);
  //     }

  //     // Update the value and set the cursor position correctly
  //     setValue(input);
  //   }

  //   // Restrict the length to 10 characters

  //   // Update state
  //   setValue(input);

  //   // Restore cursor position

  //   // Validate format
  //   if (input.length === 10) {
  //     const [day, month, year] = input.split("/");
  //     if (
  //       isNaN(day) ||
  //       isNaN(month) ||
  //       isNaN(year) ||
  //       day < 1 ||
  //       day > 31 ||
  //       month < 1 ||
  //       month > 12 ||
  //       year < 1900 ||
  //       year > new Date().getFullYear()
  //     ) {
  //       setError(
  //         "Invalid date. Please enter a valid date in DD/MM/YYYY format."
  //       );
  //     } else {
  //       setError("");
  //     }
  //   } else {
  //     setError("");
  //   }
  // };

  //

  //

  const handleDateChange = (e) => {
    let input = e.target.value;

    // Detect whether the user is deleting or adding characters
    const isDeleting = input.length < value.length;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters

    // Format input progressively based on whether deleting or adding
    if (isDeleting) {
      if (input.length >= 6) {
        input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
      } else if (input.length >= 4) {
        input = input.slice(0, 2) + "/" + input.slice(2, 4);
      } else if (input.length >= 2) {
        input = `${input.slice(0, 2)}`;
      }
    } else {
      if (input.length > 2) input = `${input.slice(0, 2)}/${input.slice(2)}`;
      if (input.length > 5)
        input = `${input.slice(0, 5)}/${input.slice(5, 10)}`;
    }

    // Restrict the length to 10 characters
    input = input.slice(0, 10);

    // Update the value in state
    setValue(input);

    // Ensure the cursor position is correctly restored after deletion
    setTimeout(() => {
      const cursorPosition = e.target.selectionStart;
      e.target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);

    // Validate the date format if it's fully entered
    if (input.length === 10) {
      const [day, month, year] = input.split("/").map(Number);
      const currentYear = new Date().getFullYear();
      const isValidDate =
        day >= 1 &&
        day <= 31 &&
        month >= 1 &&
        month <= 12 &&
        year >= 1900 &&
        year <= currentYear;

      setError(
        isValidDate
          ? ""
          : "Invalid date. Please enter a valid date in DD/MM/YYYY format."
      );
    } else {
      setError("");
    }
  };

  // const handleDateChange = (e) => {
  //   let input = e.target.value;

  //   // Save cursor position and determine if deleting
  //   const cursorPosition = e.target.selectionStart;
  //   const isDeleting = input.length < value.length;

  //   // Remove all non-numeric characters
  //   input = input.replace(/\D/g, "");

  //   // Format the input if not deleting
  //   if (!isDeleting) {
  //     if (input.length > 2) input = `${input.slice(0, 2)}/${input.slice(2)}`;
  //     if (input.length > 5)
  //       input = `${input.slice(0, 5)}/${input.slice(5, 10)}`;
  //   }

  //   // Limit input length to 10 characters
  //   input = input.slice(0, 10);

  //   // Update state
  //   setValue(input);

  //   // Restore cursor position after deletion
  //   if (isDeleting) {
  //     setTimeout(
  //       () => e.target.setSelectionRange(cursorPosition, cursorPosition),
  //       0
  //     );
  //   }

  //   // Validate date format
  //   if (input.length === 10) {
  //     const [day, month, year] = input.split("/").map(Number);
  //     const currentYear = new Date().getFullYear();
  //     const isValidDate =
  //       day >= 1 &&
  //       day <= 31 &&
  //       month >= 1 &&
  //       month <= 12 &&
  //       year >= 1900 &&
  //       year <= currentYear;

  //     setError(
  //       isValidDate
  //         ? ""
  //         : "Invalid date. Please enter a valid date in DD/MM/YYYY format."
  //     );
  //   } else {
  //     setError("");
  //   }
  // };

  // const handleDateChange = (e) => {
  //   let input = e.target.value;

  //   // Remove all non-numeric characters
  //   input = input.replace(/\D/g, "");

  //   // Automatically format as DD/MM/YYYY
  //   if (input.length > 2) {
  //     input = input.slice(0, 2) + "/" + input.slice(2);
  //   }
  //   if (input.length > 4) {
  //     input = input.slice(0, 5) + "/" + input.slice(5, 10);
  //   }

  //   // Restrict the length to 10 characters
  //   if (input.length > 10) {
  //     input = input.slice(0, 10);
  //   }

  //   // Update state
  //   setValue(input);

  //   // Validate format
  //   if (input.length === 10) {
  //     const [day, month, year] = input.split("/");
  //     if (
  //       isNaN(day) ||
  //       isNaN(month) ||
  //       isNaN(year) ||
  //       day < 1 ||
  //       day > 31 ||
  //       month < 1 ||
  //       month > 12 ||
  //       year < 1900 ||
  //       year > new Date().getFullYear()
  //     ) {
  //       setError(
  //         "Invalid date. Please enter a valid date in DD/MM/YYYY format."
  //       );
  //     } else {
  //       setError("");
  //     }
  //   } else {
  //     setError("");
  //   }
  // };

  const handleSubmit = () => {
    if (!error && value) {
      const [day, month, year] = value.split("/");

      // Validate if the input date is a valid date
      const birthDate = new Date(`${year}-${month}-${day}`);
      if (isNaN(birthDate.getTime())) {
        alert("Invalid date. Please enter a valid date in DD/MM/YYYY format.");
        return;
      }

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      // Adjust age if the birthday hasn't occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      // Show age result
      if (age >= 18) {
        setIsModalOpen(false);
        callBack(true);
      } else {
        setCancelModal(true);
        setIsModalOpen(false);
        callBack(false);
      }
    }
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
            zIndex: "10",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "90%",
              maxWidth: "400px", // Ensures the modal doesn't get too wide
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
              <h3 style={{ color: "black", fontWeight: "bold" }}>
                Confirm your age before proceeding further!!
              </h3>
              <IoIosCloseCircle
                color={"#2A0181"}
                size={30}
                style={{
                  position: "absolute",
                  right: "-15px",
                  cursor: "pointer",
                  top: "-20px",
                }}
                onClick={closeModal}
              />
            </div>
            <h5
              style={{
                marginTop: 20,
                textAlign: "start",
                marginLeft: 60,
                color: "#000000",
              }}
            >
              DOB{" "}
            </h5>
            <span style={{ color: "#9A9A9A" }}>Enter your date of birth</span>
            <input
              type="text"
              value={value}
              onChange={handleDateChange}
              placeholder="DD/MM/YYYY"
              maxLength="10"
              style={{
                padding: "8px 12px",
                border: "1px solid #2A0181",
                borderRadius: "10px",
                fontSize: "16px",
                width: "200px",
                marginBottom: "10px",
                borderColor: "#2A0181",
              }}
            />
            {error && (
              <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
            )}
            <div style={{ marginTop: "20px" }}>
              <button
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#2A0181",
                  color: "white",
                  border: "none",
                  borderRadius: "40px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "40%",
                }}
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <CancelModal isModalOpen={cancelModal} setIsModalOpen={setCancelModal} />
    </div>
  );
};

export default AgeModal;
