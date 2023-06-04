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

const inputDate = "2021-07-22T00:00:00Z";
const formattedDate = formatDate(inputDate);
console.log(formattedDate);
