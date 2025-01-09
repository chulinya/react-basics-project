export const fetchData = async () => {
  const response = await fetch("/data.json");
  const rawData = await response.json();
  return rawData;
};
