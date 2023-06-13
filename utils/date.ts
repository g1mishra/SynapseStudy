export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formattedDate;
}


export function formatTime(dateString: string) {
  const date = new Date(dateString);

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
}
