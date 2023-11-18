import 'dayjs/locale/vi';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const formatISOFromNowTime = (time: Date) => dayjs(time).locale('vi').fromNow();
export const formatISOToTime = (time: Date) => dayjs().locale('vi').to(time);
export const formatISOToVi = (time: Date) => dayjs(time).locale('vi').format('DD/MM/YYYY - HH:mm');
export const formatISOToDatePicker = (time: Date) => dayjs(time, 'YYYY-MM-DD HH:mm');
export const formatDatePicketToISO = (time: Dayjs) => dayjs(time).toISOString();
export const isAfterNow = (time: Date) => dayjs(time).isAfter(dayjs());
export const isBeforeNow = (time: Date) => dayjs(time).isBefore(dayjs());
export const isAfterTime = (time: Date, time2: Date) => dayjs(time).isAfter(time2);
export const formatSecondsToHHMMSS = (seconds: number): string => {
  const durationTime = dayjs.duration(seconds, 'seconds');
  const hours = durationTime.hours().toString().padStart(2, '0');
  const minutes = durationTime.minutes().toString().padStart(2, '0');
  const secondsPart = durationTime.seconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${secondsPart}`;
};
