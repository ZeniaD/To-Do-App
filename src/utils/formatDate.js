export const formatDate = (date) => {
  const dateArr = date.split("-");
  const d = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);
  return d.toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"long"});
}