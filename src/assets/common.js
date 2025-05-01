function getMySQLFormattedTimestamp() {
  const now = new Date();

  // Convert to US Eastern Time (or adjust to another US timezone)
  const options = { timeZone: "America/New_York", hour12: false };
  const usTime = now.toLocaleString("en-US", options);

  // Format the timestamp to MySQL format 'YYYY-MM-DD HH:MM:SS'
  const [date, time] = usTime.split(", ");
  const [month, day, year] = date.split("/");
  const mysqlFormattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )} ${time}`;

  return mysqlFormattedDate;
}

function getRemainingTime(lastStampClickTime, expirationTime) {
  // Parse the last stamp click time and expiration time
  if(expirationTime == null) {
    return false;
  }

  const lastTime = new Date(lastStampClickTime); // Convert string to Date object

  // Convert expiration time to milliseconds
  const expirationParts = expirationTime?.split(":"); // Split expirationTime to hours, minutes, seconds
  const expirationMillis =
    parseInt(expirationParts[0]) * 60 * 60 * 1000 + // hours to milliseconds
    parseInt(expirationParts[1]) * 60 * 1000 + // minutes to milliseconds
    parseInt(expirationParts[2]) * 1000; // seconds to milliseconds

  // Get the current time in the US format (MM/DD/YYYY HH:MM:SS)
  const currentDate = new Date();
  const currentTime = new Date(
    currentDate.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  // Calculate the time difference between current time and last stamp click time
  const timeDifference = currentTime.getTime() - lastTime.getTime();
  // If the time difference is greater than the expiration time, return true (expired)
  if (timeDifference >= expirationMillis) {
    return false; // Expired
  } else {
    // Time remaining
    const remainingMillis = expirationMillis - timeDifference;

    // Convert remaining milliseconds to HH:MM:SS format
    const hours = Math.floor(remainingMillis / (60 * 60 * 1000));
    const minutes = Math.floor(
      (remainingMillis % (60 * 60 * 1000)) / (60 * 1000)
    );
    const seconds = Math.floor((remainingMillis % (60 * 1000)) / 1000);

    // Format time as HH:MM:SS
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const rewardFormatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};


// Parse a time string (HH:MM:SS) into total seconds
// const parseTime = (timeStr) => {
//   const [hours, minutes, seconds] = timeStr.split(":").map(Number);
//   return hours * 3600 + minutes * 60 + seconds;
// };
const parseTime = (timeStr) => {
  // Ensure timeStr is a valid string
  if (typeof timeStr !== "string") return 0;

  // Split string by ":" and map to numbers
  const parts = timeStr.split(":").map(Number);

  // If there are not exactly 3 parts or if any part is NaN, return 0
  if (parts.length !== 3 || parts.some(isNaN)) return 0;

  const [hours, minutes, seconds] = parts;

  return hours * 3600 + minutes * 60 + seconds;
};


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); 
};

  const addValidity = (lastActivationDate, validitySelectNumber, validitySelectTimeUnit) => {
    // Convert last_activation_date to a JavaScript Date object
    const lastActivationDateObj = new Date(lastActivationDate?.replace(" ", "T"));

    // Adjust the date based on the time unit
    switch (validitySelectTimeUnit) {
      case "day":
        lastActivationDateObj.setDate(lastActivationDateObj.getDate() + Number(validitySelectNumber));
        break;
      case "week":
        lastActivationDateObj.setDate(lastActivationDateObj.getDate() + (Number(validitySelectNumber) * 7));
        break;
      case "month":
        lastActivationDateObj.setMonth(lastActivationDateObj.getMonth() + Number(validitySelectNumber));
        break;
      case "hour":
        lastActivationDateObj.setHours(lastActivationDateObj.getHours() + Number(validitySelectNumber));
        break;
      case "minute":
        lastActivationDateObj.setMinutes(lastActivationDateObj.getMinutes() + Number(validitySelectNumber));
        break;
      default:
        break;
    }

    // Format the new date as "YYYY-MM-DD HH:mm:ss"
    const newDate = lastActivationDateObj.toISOString().replace('T', ' ').substring(0, 19);
    
    return newDate;
  };


  const formatUrl = (url) => {
    if (url?.startsWith('http://') || url?.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

export { getRemainingTime, getMySQLFormattedTimestamp, formatTime, parseTime, formatDate, addValidity, rewardFormatTime, formatUrl };
