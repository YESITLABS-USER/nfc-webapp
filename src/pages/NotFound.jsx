import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.text}>Page Not Found</h1>
        <p
          style={{
            ...styles.subtext,
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : '#2c0187',
            color: isHovered ? 'black' : 'white',
          }}
          onClick={() => navigate("/mypage")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Go Back
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#2c0187',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: '28px',
    marginBottom: '10px',
  },
  subtext: {
    color: '#ffffff',
    fontSize: '18px',
    margin: 0,
    padding: '10px 20px',
    width: 'fit-content',
    margin: '0 auto',
    borderRadius: '20px',
    border: '1px solid white',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  }
};

export default NotFound;
