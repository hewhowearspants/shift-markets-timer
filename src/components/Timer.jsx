import React from 'react';
import moment from 'moment';

const Timer = ({ elapsed, timer, split, startTimer, pauseTimer, resetTimer, timeUnits, setTimeUnits}) => {
  if (timeUnits === 's') {
    elapsed = moment.duration(elapsed).asSeconds().toFixed(1)
  }

  return (
    <div className='timer'>
      <button className={`s-button ${timeUnits === 's' && 'selected'}`} onClick={() => setTimeUnits('s')}>S</button>
      <button className={`ms-button ${timeUnits === 'ms' && 'selected'}`} onClick={() => setTimeUnits('ms')}>MS</button>
      <div className='elapsed-time' onClick={!timer? startTimer : split}>
        <span>{elapsed} {timeUnits}</span>
      </div>
      {timer && <button className='pause-button' onClick={pauseTimer}><i className="fas fa-pause"></i></button>}
      {!timer && <button className='resume-button' onClick={startTimer}><i className="fas fa-play"></i></button>}
      <button className='reset-button' onClick={resetTimer}><i className="fas fa-redo"></i></button>
    </div>
  )
}

export default Timer;