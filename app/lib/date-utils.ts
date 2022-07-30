import dayjs from "dayjs";

export const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const isDate = (date: string) => {
  return dayjs(date).isValid();
};
