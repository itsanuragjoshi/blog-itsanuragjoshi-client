// FUNCTION TO FORMAT A DATE STRING INTO A READABLE DATE AND TIME

// Define formatDate function
const formatDate = (dateString) => {
  // Options for formatting date and time
  const dateOption = { year: "numeric", month: "short", day: "numeric" };
  const timeOption = { hour: "2-digit", minute: "2-digit" };

  // Check if input date string is undefined or empty
  if (!dateString) {
    // Return an object with formatted strings for invalid date
    return { formattedDate: "Invalid Date", formattedTime: "Invalid Date" };
  }

  // Split date and time parts from input date string
  const parts = dateString.split("T");

  // Check if date string has both date and time parts
  if (parts.length !== 2) {
    // Return an object with formatted strings for invalid date
    return { formattedDate: "Invalid Date", formattedTime: "Invalid Date" };
  }

  // Extract date and time parts
  const datePart = parts[0];
  const timePart = parts[1];

  // Format date part using provided date options
  const formattedDate = new Date(datePart).toLocaleDateString(
    undefined,
    dateOption
  );

  // Format time part using provided time options
  const formattedTime = new Date(`2000-01-01T${timePart}`).toLocaleTimeString(
    undefined,
    timeOption
  );

  // Return an object with formatted date and time strings
  return { formattedDate, formattedTime };
};

// Export formatDate function
export default formatDate;
