import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square(props) {
  const [play, setPlay] = useState("")

  const handleMoves = (newPositon) => {
    let currentPositions = [...props.positions]
    currentPositions[props.currentPosition] = newPositon
    props.setPositions([...currentPositions])
  }

  const handlePlay = () => {
    if (play !== "" && play !== props.player) return
    if (play === "" && props.plays[props.player] > 2) return
    if (props.plays[props.player] === 3 || play !== "") {
      if(props.plays[props.player] < 3) return
      setPlay("")
      handleMoves("")
      props.plays[props.player]--
      return
    }

    setPlay(props.player)
    handleMoves(props.player)
    props.plays[props.player]++
    props.switchPlayer()
    
  }

  return (
    <div
      className="square"
      style={squareStyle}
      onClick={handlePlay}>
      { play }
    </div>
  );
}

function Board() {
  const [player, setPlayer] = useState("X")
  const [plays, setPlays] = useState({
    X: 0,
    O: 0
  })
  const [positions, setPositions] = useState(new Array(9))

  const switchPlayer = () => {
    setPlayer((player === "X") ? "O" : "X")
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{ player }</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>None</span></div>
      <button style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={0} setPositions={setPositions} positions={positions}/>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={1} setPositions={setPositions} positions={positions}/>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={2} setPositions={setPositions} positions={positions}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={3} setPositions={setPositions} positions={positions}/>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={4} setPositions={setPositions} positions={positions}/>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={5} setPositions={setPositions} positions={positions}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={6} setPositions={setPositions} positions={positions}/>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={7} setPositions={setPositions} positions={positions}/>
          <Square switchPlayer={switchPlayer} player={player} plays={plays} setPlays={setPlays} currentPosition={8} setPositions={setPositions} positions={positions}/>
        </div>
      </div>
       <div id="playsArea" className="plays" style={instructionsStyle}>Plays: <span> X = {plays['X']} <br/> O = {plays['O']}</span></div>
       <div id="playsArea2" className="plays" style={instructionsStyle}>Positions: <span> 0 = {positions[0]}, 1 = {positions[1]}, 2 = {positions[2]}, 3 = {positions[3]}, 4 = {positions[4]}, 5 = {positions[5]}, 6 = {positions[6]}, 7 = {positions[7]}, 8 = {positions[8]}, 9 = {positions[9]} </span></div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);