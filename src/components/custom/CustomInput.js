import React from "react";

const CustomInput = ({ value, onChange, label, num, required = false }) => {
  return (
    <div style={styles.container}>
      <input
        type={!num ? "text" : "tel"}
        value={value}
        onChange={onChange} // Pass the onChange directly from Formik
        className="text-input"
        placeholder={label}
        style={styles.input}
        inputMode={num ? "numeric" : "text"} // Use numeric inputMode for phone numbers
        required={required}
      />
    </div>
  );
};

export default CustomInput;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "300px",
    padding: "8px",
    fontSize: "16px",
    border: "none",
    borderBottom: "2px solid #333",
    outline: "none",
  },
};
