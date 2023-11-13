import 'dayjs/locale/vi';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatISOFromNowTime = (time: Date) => dayjs(time).locale('vi').fromNow();
export const formatISOToTime = (time: Date) => dayjs().locale('vi').to(time);
export const formatISOToVi = (time: Date) => dayjs(time).locale('vi').format('DD/MM/YYYY - HH:mm');
export const formatISOToDatePicker = (time: Date) => dayjs(time, 'YYYY-MM-DD HH:mm');
export const formatDatePicketToISO = (time: Dayjs) => dayjs(time).toISOString();
