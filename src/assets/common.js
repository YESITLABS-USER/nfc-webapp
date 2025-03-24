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

// Parse a time string (HH:MM:SS) into total seconds
const parseTime = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); 
};

export { getRemainingTime, getMySQLFormattedTimestamp, formatTime, parseTime, formatDate };
