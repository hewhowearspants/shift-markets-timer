import React, { Component } from 'react';
import Timer from './components/Timer';
import Split from './components/Split';
import './App.css';

class App extends Component {
  state = {
    startTime: null,
    splitTime: null,
    pauseTime: null,
    elapsed: 0,
    splits: [],
    highlight: null,
    timer: null,
    timeUnits: 'ms'
  }

  startTimer = () => {
    const { elapsed, pauseTime } = this.state;
    let { splitTime } = this.state;
    if (pauseTime) {
      splitTime = Date.now() - (pauseTime - splitTime);
    } else {
      splitTime = Date.now()
    }
    this.setState({
      startTime: Date.now() - elapsed,
      splitTime,
      timer: setInterval(this.tick, 50),
    })
  }

  pauseTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      pauseTime: Date.now(),
    })
  }

  resetTimer = () => {
    this.state.timer && clearInterval(this.state.timer);
    this.setState({
      startTime: 0,
      splitTime: 0,
      pauseTime: null,
      elapsed: 0,
      splits: [],
      highlight: null,
      timer: null
    })
  }

  tick = () => {
    this.setState(prevState => {
      return {
        elapsed: new Date() - prevState.startTime
      }
    })
  }

  split = () => {
    const { splits, splitTime } = this.state;

    let split = {
      length: new Date() - splitTime,
      time: Date.now()
    }
    splits.push(split);
    this.setState({ splitTime: Date.now() })
  }

  resetSplit = (i) => {
    let splits = [...this.state.splits];
    if (i + 1 < splits.length) {
      splits.splice((i + 1))
      this.setState({ splits })
    }
    let elapsed = splits.reduce((sum, split) => sum + split.length, 0)
    this.setState({
      highlight: i,
      startTime: Date.now() - elapsed,
      splitTime: Date.now(),
      elapsed,
    })
  }

  setTimeUnits = (unit) => {
    this.setState({
      timeUnits: unit
    })
  }

  renderSplits = () => {
    const { highlight, timeUnits } = this.state;
    return this.state.splits.map((split, index) => (
      <Split 
        key={index} 
        split={split} 
        index={index} 
        highlight={highlight} 
        resetSplit={this.resetSplit}
        timeUnits={timeUnits}
      />
    ))
  }

  render() {
    const { timer, elapsed, timeUnits } = this.state;
    return (
      <div className="App">
        <Timer
          elapsed={elapsed}
          timer={timer}
          split={this.split}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
          resetTimer={this.resetTimer}
          timeUnits={timeUnits}
          setTimeUnits={this.setTimeUnits}
        />
        <ul className='split-container'>
          {this.renderSplits()}
        </ul>
      </div>
    );
  }
}

export default App;
