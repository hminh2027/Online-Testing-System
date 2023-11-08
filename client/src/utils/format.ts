import 'dayjs/locale/vi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatFromNowTime = (time: Date) => dayjs(time).locale('vi').fromNow();
export const formatTime = (time: Date) => dayjs(time).locale('vi').format('DD/MM/YYYY');
export const formatTimeToDateTime = (time: Date) => {
  console.log(time);

  return dayjs(time).format('YYYY-MM-DD');
};
