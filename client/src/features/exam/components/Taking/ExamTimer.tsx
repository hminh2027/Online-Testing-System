import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { formatSecondsToHHMMSS } from '@/utils';

interface ExamTimerProps {
  total: number;
  remain: number;
  onComplete: () => void;
}
export function ExamTimer({ total, remain, onComplete }: ExamTimerProps) {
  return (
    <CountdownCircleTimer
      size={150}
      isPlaying
      duration={total * 60}
      initialRemainingTime={remain * 60}
      colors={['#008000', '#0000FF', '#FF0000', '#FF0000']}
      colorsTime={[7, 5, 2, 0]}
      onComplete={onComplete}
    >
      {({ remainingTime }) => formatSecondsToHHMMSS(remainingTime)}
    </CountdownCircleTimer>
  );
}
