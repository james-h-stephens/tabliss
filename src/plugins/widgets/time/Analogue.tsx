import * as React from 'react';
import './Analogue.sass';

interface Props {
  time: Date;
}

const Analogue: React.StatelessComponent<Props> = (props) => {
  const hourAngle = (props.time.getHours() * 30) + (props.time.getMinutes() * 0.5);
  const minuteAngle = props.time.getMinutes() * 6;

  return (
    <div className="Time Analogue">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" />
        <line x1="50" y1="53" x2="50" y2="30" className="hours" style={{ transform: `rotate(${hourAngle}deg)`}} />
        <line x1="50" y1="53" x2="50" y2="15" className="minutes" style={{ transform: `rotate(${minuteAngle}deg)`}} />
      </svg>
    </div>
  );
};

export default Analogue;
