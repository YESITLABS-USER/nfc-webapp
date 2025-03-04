// import React from "react";

// const CustomButton = ({ text, onClick }) => {
//   const [isHovered, setIsHovered] = React.useState(false);

//   return (
//     <div style={style.containerStyle}>
//       <button
//         style={
//           isHovered
//             ? {
//                 ...style.buttonStyle,
//                 ...style.hoverStyle,
//               }
//             : style.buttonStyle
//         }
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={onClick}
//       >
//         {text}
//       </button>
//     </div>
//   );
// };

// export default CustomButton;

// const style = {
//   containerStyle: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: "20px",
//   },
//   buttonStyle: {
//     backgroundColor: "#2A0181",
//     color: "white",
//     borderRadius: "30px",
//     width: "95%",
//     height: "50px",
//     border: "none",
//     cursor: "pointer",
//   },
//   hoverStyle: {
//     backgroundColor: "#4b1ead",
//   },
// };
//

//

import React from "react";

const CustomButton = ({ text, onClick, fullWidth, borderRadus }) => {
  return (
    <div style={style.containerStyle}>
      <button 
        style={{
          backgroundColor: "#2A0181",

          color: "white",
          borderRadius: borderRadus ? "10px" : "30px",
          width: fullWidth,
          height: "50px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0px 10px 10px 0px #00000040",
          // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomButton;

const style = {
  containerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  buttonStyle: {
    backgroundColor: "#2A0181",
    color: "white",
    borderRadius: "30px",
    width: "95%",
    height: "50px",
    border: "none",
    cursor: "pointer",
  },
  hoverStyle: {
    backgroundColor: "#4b1ead",
  },
};
