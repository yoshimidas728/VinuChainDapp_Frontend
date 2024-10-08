export const convertZuluToGMT = (dateTimeValue) => {
  const dateTimeString = dateTimeValue;
  const dateTime = new Date(dateTimeString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = dateTime.toLocaleDateString("en-US", options);

  const timeOptions = { hour: "numeric", minute: "numeric" };
  const time = dateTime.toLocaleTimeString("en-US", timeOptions);

  const formattedDateTime = `${date} ${time}`;
  return formattedDateTime;
};
