export const dateFormatter = (dateStr: string): string => {
  const date = new Date(dateStr);

  // Extract components
  const time = date.toLocaleTimeString();
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }); // "Oct"
  const year = date.getFullYear();

  // Format as "04:05 AM Oct 29, 2024"
  return `${time} ${month} ${day}, ${year}`;
}