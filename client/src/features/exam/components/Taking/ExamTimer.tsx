import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { formatSecondsToHHMMSS } from '@/utils';

interface ExamTimerProps {
  duration: number;
}
export function ExamTimer({ duration }: ExamTimerProps) {
  return (
    <CountdownCircleTimer
      size={150}
      isPlaying
      duration={duration * 60}
      colors={['#008000', '#0000FF', '#FF0000', '#FF0000']}
      colorsTime={[7, 5, 2, 0]}
    >
      {({ remainingTime }) => formatSecondsToHHMMSS(remainingTime)}
    </CountdownCircleTimer>
  );
}
