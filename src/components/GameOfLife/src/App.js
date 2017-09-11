import React, { Component } from 'react';
import './App.css';

class Environment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.rows,
      cols: this.props.cols,
      board: new Array(this.props.rows).fill(new Array(this.props.cols).fill(false)),
      generation: 0,
    }
    this.tick = this.tick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
  }

  startTimer() {
    if (!this.state.running) {
      this.ticker = setInterval(() => {
        this.setState({
          generation: this.state.generation + 1
        }, this.tick);
      }, 100)
    }
    this.setState({
      running: true
    })
  }

  stopTimer() {

    clearInterval(this.ticker);
    this.setState({ running: false })
  }

  clearBoard() {
    this.stopTimer()
    this.setState({
      board: new Array(this.props.rows).fill(new Array(this.props.cols).fill(false)),
      generation: 0,
    })
  }

  tick() {
    const board = this.state.board;

    function aboveRow(i) {
      if (i === 0) {
        return board.length - 1;
      } else {
        return i - 1;
      }
    }

    function thisRow(i) {
      return i;
    }

    function belowRow(i) {
      if (i === board.length - 1) {
        return 0;
      } else {
        return i + 1
      }
    }

    function leftCol(j) {
      if (j === 0) {
        return board[0].length - 1;
      } else {
        return j - 1;
      }
    }

    function thisCol(j) {
      return j;
    }

    function rightCol(j) {
      if (j === board.length - 1) {
        return 0;
      } else {
        return j + 1;
      }
    }

    function getSurroundingLifeStates(i, j) {
      // returns an array of booleans
      return [
        board[aboveRow(i)][leftCol(j)],
        board[thisRow(i)][leftCol(j)],
        board[belowRow(i)][leftCol(j)],
        board[aboveRow(i)][thisCol(j)],
        board[belowRow(i)][thisCol(j)],
        board[aboveRow(i)][rightCol(j)],
        board[thisRow(i)][rightCol(j)],
        board[belowRow(i)][rightCol(j)],
      ];
    }

    function countLiveNeighbors(i, j) {
      return getSurroundingLifeStates(i, j).reduce(
          (a, e) => { return a + (e ? 1 : 0); },
          0
        )
    }

    function cellAlive(live, i, j) {
      const liveNeighbors = countLiveNeighbors(i, j);
      if (live) {
        if (liveNeighbors < 2) {
          return false;
        } else if(liveNeighbors === 2 || liveNeighbors === 3) {
          return true
        } else {
          return false
        }
      } else {
        if (liveNeighbors === 3) {
          return true;
        } else {
          return false;
        }
      }
    }

    this.setState({
      board: this.state.board.map((row, i) => {
        return row.map((col, j) => {
          return cellAlive(col, i, j);
        })
      }),
      generation: this.state.generation + 1,
    })
  }

  toggle(m, n) {
    this.setState({
      board: this.state.board.map((old_row, i) => {
        return old_row.map((old_col, j) => {
          return (i === m && j === n) ? !old_col : old_col;
        })
      })
    })
  }
 
  render() {
    const styles = {
      width: '400px',
      margin: '40px auto 20px auto',
      display: 'block'
    },
    infoStyles = {
      margin: '0 auto',
      bgColor: 'blue',
      display: 'block',
      marginTop: '20px',
      clear: 'both'
    },
    buttonClasses = 'button';
    return (
      <div>
        <div style={styles} className='clearfix'>
          {this.state.board.map((row, i) => { return row.map((col, j) => { return <Cell row={i} col={j} alive={col} toggle={this.toggle}/>; })}) }
        </div>
        <div style={infoStyles}>
          <button className={buttonClasses} onClick={this.tick}>Tick</button>
          <button className={buttonClasses} onClick={this.startTimer}>Start</button>
          <button className={buttonClasses} onClick={this.stopTimer}>Stop</button>
          <button className={buttonClasses} onClick={this.clearBoard}>Clear</button>
          <h1 className='title'>Generation: {this.state.generation}</h1>
        </div>
      </div>
    );
  }
}

class Cell extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle(this.props.row, this.props.col);
  }

  render() {
    const styles = {
      width: '20px',
      height: '20px',
      border: '1px solid black',
      boxSizing: 'border-box',
      float: 'left',
      backgroundColor: this.props.alive ? 'black' : '#ffffff'
    }
    return (
      <div style={styles} onClick={this.toggle}>
      </div>
    );
  }
}

class GameOfLife extends Component {
  render() {
    return (
      <div className="GOLApp">
        <Environment rows={20} cols={20} />
      </div>
    );
  }
}

export default GameOfLife;
