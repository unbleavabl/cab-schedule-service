export const transformTimeStringToMinutes = (timeString: string) => {
  const [hrs, min] = timeString.split(":");
  return parseInt(hrs) * 60 + parseInt(min);
};

export const transformMinutesToTimeString = (minutes: number) => {
  const hrs = Math.floor(minutes / 60).toString().padStart(2, '0');
  const remainingMins = (minutes % 60).toString().padStart(2, '0');
  return `${hrs}:${remainingMins}`;
};
