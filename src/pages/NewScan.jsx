import React, { useEffect } from 'react';
import SplashImg from "../assets/images/splashScreen.png";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addClientInUser } from '../store/slices/clientSlice';

const NewScan = () => {
    const { id, lang, xuid } = useParams(); 
    const navigate = useNavigate();

    const storedData = JSON.parse(localStorage.getItem("nfc-app")) || {};
    const url = localStorage.getItem("url")
    const { user_id } = storedData;
 

    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (id&&xuid) { // Ensure the id exists
    //         localStorage.setItem('client_id', id);
    //         localStorage.setItem('language', lang)
    //         localStorage.setItem('xuid', xuid)

    //         if(!user_id){
    //             localStorage.setItem("scan-count", true)
    //         }
    //         navigate(url);
    //         dispatch(addClientInUser({ client_table_id: id, user_table_id: user_id }));
    //     }
    // }, [id, navigate, xuid]); 

    useEffect(() => {
    if (!id || !xuid) return;

    // Always fresh values
    localStorage.setItem("client_id", id);
    localStorage.setItem("language", lang || "en");
    localStorage.setItem("xuid", xuid);

    if (!user_id) {
        localStorage.setItem("scan-count", "true");
    }

    dispatch(addClientInUser({ client_table_id: id, user_table_id: user_id }));

    if (url) {
        navigate(url, { replace: true });
    }
}, [id, lang, xuid]); // 🚀 include xuid here

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
