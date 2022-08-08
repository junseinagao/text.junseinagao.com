import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
dayjs.locale(ja);

export const sortByDayjs = (a: Dayjs, b: Dayjs) => a.isBefore(b);

export const parseToDayjs = (date: string) => dayjs(date);

export const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const isDate = (date: string) => {
  return dayjs(date).isValid();
};
