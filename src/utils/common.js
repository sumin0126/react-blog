export const getDate = () => {
  const today = new Date();
  const customToday = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

  // console.log(customToday);
  return customToday;
};
