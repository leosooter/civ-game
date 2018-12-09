import React from 'react';
import ReactDOM from 'react-dom';
import random from "lodash.random";
import sample from "lodash.sample";
import compact from "lodash.compact";
import createGrid from "./helpers/grid";
import {startCycle, carveRivers, addDetail, moveAnimal, getTransitionSpeed, getDistance} from "./helpers/grid";

// const gridHeight = 3;
// const gridWidth = 20;

// const gridHeight = 10;
// const gridWidth = 10;

const gridHeight = 80;
const gridWidth = 140;

const REFRESH_SPEED = 2000;


const numPerSq = 50;
const zoomSquareSize = 280;

class MotionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      playerS: 450,
      playerE: 700,
      playerTargetS: null,
      playerTargetE: null,
      playerSIncrement: null,
      playerEIncrement: null,
      playerWalkSpeed: 5,
      playerTransitionSpeed: 0
    }
  }

  movePlayer = (e) => {
    console.log(e.clientX);
    // let sDistance = Math.floor(e.clientY - this.state.playerS);
    // let eDistance = Math.floor(e.clientX - this.state.playerE);
    // console.log("sDistance", sDistance, "eDistance", eDistance);
    // let sPercent =  sDistance / eDistance;
    // let ePercent = eDistance / sDistance;
    //
    // let sIncrement = Math.round(sDistance / 10);
    // // sIncrement = sIncrement < 1 ? 1 : sIncrement;
    //
    // let eIncrement = Math.round(eDistance / 10);
    // // eIncrement = eIncrement < 1 ? 1 : eIncrement;
    //
    //
    // console.log("sIncrement", sIncrement, "eIncrement", eIncrement);
    //
    //
    //
    // this.setState({
    //   playerSIncrement: sIncrement,
    //   playerEIncrement: eIncrement,
    //   playerTargetS: Math.floor(e.clientY),
    //   playerTargetE: Math.floor(e.clientX)
    // })
    let transitionSpeed = getTransitionSpeed(this.state.playerS, e.clientY, this.state.playerE, e.clientX, this.state.playerWalkSpeed)
    console.log("transitionSpeed", transitionSpeed);
    this.setState({
      playerS: e.clientY,
      playerE: e.clientX,
      playerTransitionSpeed: transitionSpeed
    })
  }

  render() {

    let playerStyle = {
      top: this.state.playerS + "px",
      left: this.state.playerE + "px"
      // transition: `top ${this.state.playerTransitionSpeed}s linear, left ${this.state.playerTransitionSpeed}s linear`
    }
    let player = (<div className="player" style={playerStyle}></div>);

    return (
      <div className="motion-screen" onClick={this.movePlayer}>
        {player}
      </div>
    )
  }
}

export default MotionScreen;
