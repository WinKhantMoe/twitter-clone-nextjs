export const postedTimeCalc = (createdAt) => {
  const date = new Date(createdAt);

  const formattedTime = date.toLocaleString("en-US",{
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = date.toLocaleString("en-US", {
     month: "short",
    day: "numeric",
    year: "numeric",
  })
  return formattedTime+ " · " + formattedDate;
};
