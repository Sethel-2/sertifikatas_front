export const formatStartDate = (initialDate) => {
  const date = new Date(initialDate);
  date.setHours(0);
  return date.getTime();
};

export const formatEndDate = (initialDate) => {
  const date = new Date(initialDate);
  date.setDate(date.getDate() + 1);
  date.setHours(0);
  return date.getTime();
};
