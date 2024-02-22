export function convertDate(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);
  
    // Get the year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  
    // Format the date in the desired format
    return `${year}-${month}-${day}`;
  }