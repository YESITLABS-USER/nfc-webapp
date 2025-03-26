import React, { useEffect } from 'react';
import SplashImg from "../assets/images/splashScreen.png";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addClientInUser } from '../store/slices/clientSlice';

const NewScan = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const storedData = JSON.parse(localStorage.getItem("nfc-app")) || {};
    const { user_id } = storedData;

    const dispatch = useDispatch();
    useEffect(() => {
        if (id) { // Ensure the id exists
            localStorage.setItem('client_id', id);
            navigate('/dashboard');
            dispatch(addClientInUser({ client_table_id: id, user_table_id: user_id }));
        }
    }, [id, navigate]); 

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${SplashImg})`, // Add the background image
                backgroundSize: "cover", // Cover the entire div
                backgroundPosition: "center", // Center the image
                backgroundRepeat: "no-repeat", // Prevent repetition
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
                zIndex: 1000,
            }}
        ></div>
    );
};

export default NewScan;
