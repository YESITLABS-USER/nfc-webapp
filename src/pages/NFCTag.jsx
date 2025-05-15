import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NFCTag = () => {
  const { xuid } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getNFC = async () => {
      try {
        if (xuid) {
          const { data } = await axios.get(`https://api.ixkio.com/v1/t?x=${xuid}`);

          // Extract pathname from full URL (if needed)
          const responseUrl = data?.response;

          if (responseUrl) {
            const parsedUrl = new URL(responseUrl);
            navigate(parsedUrl.pathname); // Navigates to "/dashboard/eng/164"
          } else {
            setMessage("Please Tap Again");
          }
        }
      } catch (error) {
        console.error("Error fetching NFC data:", error);
        setMessage("Please Tap Again");
      }
    };

    getNFC();
  }, [xuid, navigate]);

  return <div>{message || "Loading..."}</div>;
};

export default NFCTag;
