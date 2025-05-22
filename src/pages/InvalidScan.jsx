import React from 'react';

const InvalidScan = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.text}>OOPS! <br /> Invalid Tap</h1>
        <p style={styles.subtext}>Please scan a valid NFC Tag</p>
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
  }
};

export default InvalidScan;
