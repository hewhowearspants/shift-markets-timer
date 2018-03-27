import React from 'react';
import moment from 'moment';

const Split = ({ split, index, highlight, resetSplit, timeUnits }) => {
  let duration = split.length;
  if (timeUnits === 's') {
    duration = moment.duration(split.length).asSeconds().toFixed(1)
  } 

  return (
    <li  
      className={highlight === index ? 'highlight' : null}
      onClick={() => resetSplit(index)}
    >
      <span>{duration} {timeUnits}</span>
    </li>
  )
}

export default Split;