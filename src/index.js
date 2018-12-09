import React from 'react';
import ReactDOM from 'react-dom';
import random from "lodash.random";
import sample from "lodash.sample";
import compact from "lodash.compact";
import createGrid from "./helpers/grid";
import MotionScreen from "./motionScreen";
import {createNewPlant} from "./helpers/worldData";
import PlantTest from "./plant-test";

import {
  startCycle,
  carveRivers,
  addDetail,
  moveAnimal,
  getTransitionSpeed,
  getDistance,
  chartPaths,
  findClosestVillages
} from "./helpers/grid";

const gridHeight = 3;
const gridWidth = 20;

// const gridHeight = 50;
// const gridWidth = 50;

// const gridHeight = 90;
// const gridWidth = 150;

const REFRESH_SPEED = 2000;


const numPerSq = 50;
const zoomSquareSize = 280;

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      time: 0,
      grid: [],
      miniGrid: [],
      zoom: false,
      zoomSquareSize: 10,
      colorType: "biomeColor",
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

  componentWillMount() {
    // this.setState({
    //   grid: createGrid(gridHeight, gridWidth)
    // })
  }

  componentDidMount() {
    // this.startTimer();
  }

  minuteCheck = () => {
    if(this.state.zoom) {
      this.checkAnimals();
      this.updatePlayer();
    }
    this.setState({
      time: this.state.time + 1
    })
  }

  startTimer = () => {
    this.delay(REFRESH_SPEED).then(function(){
      this.minuteCheck();
      this.startTimer();
    }.bind(this));
  }

  delay = (time) => {
    return new Promise(
      function(resolve){
        setTimeout(function(resolve){
          resolve(true);
        }.bind(this, resolve), time);
      }
    );
  }

  checkAnimals = () => {
    // console.log("checking animals");
    for (var i = 0; i < this.state.largeAnimals.length; i++) {
      let animal = this.state.largeAnimals[i];

      if(random(3) === 0) {
        this.moveAnimal(animal.id, i);
      }
    }
  }

  renderSquare = (square) => {
    const grid = square.detail;

    const shadowStyle = {
      height: this.state.zoomSquareSize + "px",
      width: this.state.zoomSquareSize + "px"
    }

    let columns = [];
    let patchSize = this.state.zoomSquareSize / numPerSq;
    const rowStyle = {
      height: patchSize + "px",
      width: this.state.zoomSquareSize + "px"
    }

    for (let s = 0; s < grid.length; s++) {
      let row = [];
      for (let e = 0; e < grid[s].length; e++) {
        const patch = grid[s][e];
        const patchStyle = {
          height: this.state.zoomSquareSize / numPerSq + "px",
          width: this.state.zoomSquareSize / numPerSq + "px",
          background: patch[this.state.colorType]
        }

        row.push(<div className="patch" style={patchStyle}></div>);
      }
      columns.push(<div className="patch-row" style={rowStyle}>{row}</div>);
    }

    return (<div>
      {columns}
    </div>);
  }

  //<div className="square-shadow" style={shadowStyle}></div>

  renderZoom = (grid) => {

    let columns = [];
    let largeAnimals = this.renderLargeAnimals();


    const rowStyle = {
      height: this.state.zoomSquareSize + "px",
      width: 5 * this.state.zoomSquareSize + "px"
    }

    for (let s = 0; s < grid.length; s++) {
      let row = [];
      for (let e = 0; e < grid[s].length; e++) {
        const square = grid[s][e];

        let patches = this.renderSquare(square);
        let trees = this.renderTrees(square);
        let display = square.plants ? (<span className="display">waterlevel:{square.waterLevel}  plants:{square.plants.length}</span>) : null;
        row.push(<div className="square" onClick={this.renderZoomSquare.bind(this, square)}>{display}{patches}{trees}</div>);
      }
      columns.push(<div className="row" style={rowStyle}>{row}</div>);
    }

    // onClick={this.renderZoomSquare.bind(this, square)}

    return (
      <div className="grid">
        {columns}
        {largeAnimals}
      </div>
    );
  }

  renderGrid = () => {
    const grid = this.state.grid;

    let columns = [];

    const rowStyle = {
      height: this.state.zoomSquareSize + "px",
      width: gridWidth * this.state.zoomSquareSize + "px"
    }

    for (let s = 0; s < this.state.grid.length; s++) {
      let row = [];
      for (let e = 0; e < this.state.grid[s].length; e++) {
        const square = grid[s][e];
        const squareStyle = {
          height: this.state.zoomSquareSize + "px",
          width: this.state.zoomSquareSize + "px",
          background: square[this.state.colorType]
        }

        row.push(<div className="square" style={squareStyle} onClick={this.renderZoomSquare.bind(this, square)}></div>);
      }
      columns.push(<div className="row" style={rowStyle}>{row}</div>);
    }

    // renderZoomSquare

    return (
      <div className="grid">{columns}</div>
    );
  }

  biomeView = () => {
    this.setState({
      colorType: "biomeColor"
    })
  }

  elevationView = () => {
    this.setState({
      colorType: "elevationColor"
    })
  }

  rainfallView = () => {
    this.setState({
      colorType: "rainColor"
    })
  }

  cycle = () => {
    const newGrid = startCycle();
    this.setState({
      grid: newGrid
    })
  }

  zoomIn = () => {
    this.setState({
      zoom: true,
      zoomSquareSize: zoomSquareSize
    })
  }

  zoomOut = () => {
    this.setState({
      zoom: false,
      zoomSquareSize: 10
    })
  }

  findClosestVillage = (square) => {
    findClosestVillages(square);
  }

  updatePlayer = () => {
    if(this.state.playerTargetS && this.state.playerTargetE) {
      if(Math.abs(this.state.playerS - this.state.playerTargetS) < 10 && Math.abs(this.state.playerS - this.state.playerTargetS) < 10) {
        this.state.playerTargetS = null;
        this.state.playerTargetE = null;
      } else {
        this.state.playerS += this.state.playerSIncrement;
        this.state.playerE += this.state.playerEIncrement;
      }
    }
  }

  movePlayer = (e) => {
    let sDistance = Math.floor(e.clientY - this.state.playerS);
    let eDistance = Math.floor(e.clientX - this.state.playerE);
    let sPercent =  sDistance / eDistance;
    let ePercent = eDistance / sDistance;

    let sIncrement = Math.round(sDistance / 10);
    // sIncrement = sIncrement < 1 ? 1 : sIncrement;

    let eIncrement = Math.round(eDistance / 10);
    // eIncrement = eIncrement < 1 ? 1 : eIncrement;


    this.setState({
      playerSIncrement: sIncrement,
      playerEIncrement: eIncrement,
      playerTargetS: Math.floor(e.clientY),
      playerTargetE: Math.floor(e.clientX)
    })
    // let transitionSpeed = getTransitionSpeed(this.state.playerS, e.clientY, this.state.playerE, e.clientX, this.state.playerWalkSpeed)
    // console.log("transitionSpeed", transitionSpeed);
    // this.setState({
    //   playerS: e.clientY,
    //   playerE: e.clientX,
    //   playerTransitionSpeed: transitionSpeed
    // })
  }

  moveAnimal = (id, i) => {
    this.state.largeAnimals[i] = moveAnimal(id);
    this.setState({
      zoom: true
    })
  }

  renderTrees = (square) => {
    if(!this.state.zoom || !square.trees) {
      return;
    }
    let renderArray = [];

    for (var i = 0; i < square.trees.length; i++) {
      let tree = square.trees[i];
      let treeStyle = {
        zIndex: tree.zIndex,
        boxShadow: `${tree.shadow1}px ${tree.shadow2}px rgba(0, 0, 0, 0.5)`,
        top: tree.positionS + "px",
        left: tree.positionE + "px",
        height: tree.size + "px",
        width: tree.size + "px",
        background: tree.color + random(.9, 1) + ")",
      }

      renderArray.push(
        <div className="tree" style={treeStyle}></div>
      );
    }

    return renderArray;
  }

  renderLargeAnimals = () => {
    if(!this.state.zoom || !this.state.largeAnimals) {
      return;
    }
    let renderArray = [];

    for (var i = 0; i < this.state.largeAnimals.length; i++) {
      let animal = this.state.largeAnimals[i];

      const animalTop = animal.positionS - (this.state.screenS * 280);
      const animalLeft = animal.positionE - (this.state.screenE * 280);
      const largeAnimalStyle = {
        top: animalTop  + "px",
        left: animalLeft + "px",
        transition: `top ${animal.walkSpeed}s, left ${animal.walkSpeed}s`
      }

      renderArray.push(
        <div className="largeAnimal" style={largeAnimalStyle} onClick={this.moveAnimal.bind(this, animal.id, i)}>
        </div>
      );
    }

    return renderArray;
  }

  renderZoomSquare = (square) => {
    let t1 = performance.now()
    let miniGrid = [];
    let largeAnimals = [];

    let farWest = square.west && square.west.west;
    let farEast = square.east && square.east.east;
    let corner;

    if(square.north) {
      let row = [square.north.west, square.north, square.north.east];
      if(farWest) {
        row.unshift(farWest.north);
      }

      if(farEast) {
        row.push(farEast.north);
      }
      //TODO lodash compact
      // compact(row)
      miniGrid.push(row);
    }

    let row = [square.west, square, square.east];
    if(farWest) {
      row.unshift(farWest);
    }

    if(farEast) {
      row.push(farEast);
    }
    miniGrid.push(row);

    if(square.south) {
      let row = [square.south.west, square.south, square.south.east];

      if(farWest) {
        row.unshift(farWest.south);
      }

      if(farEast) {
        row.push(farEast.south);
      }

      miniGrid.push(row);
    }



    corner = miniGrid[0][0];

    this.state.screenS = corner.s;
    this.state.screenE = corner.e;

    for (var s = 0; s < miniGrid.length; s++) {
      let gridRow = miniGrid[s];

      for (var e = 0; e < gridRow.length; e++) {
        if(gridRow[e].largeAnimals ) {
          for (var i = 0; i < gridRow[e].largeAnimals.length; i++) {
            let animal = gridRow[e].largeAnimals[i];
            largeAnimals.push(animal);
          }
        }

        if(!gridRow[e].detail) {
          gridRow[e] = addDetail(gridRow[e], numPerSq);
        }
      }
    }

    let t2 = performance.now();

    this.setState({
      miniGrid: miniGrid,
      zoom: true,
      zoomSquareSize: zoomSquareSize,
      largeAnimals: largeAnimals
    })
  }

  render() {
    // let zoomLevelRender = this.renderGrid();;
    // let player;
    // let testPlant = createNewPlant();
    // let testPlantStyle = {

    //     height: "100px",
    //     width: "100px",
    //     backgroundColor: testPlant.color
    // }

    // let largeAnimals;
    // if(this.state.zoom) {
    //   zoomLevelRender = this.renderZoom(this.state.miniGrid);
    //   let playerStyle = {
    //     top: this.state.playerS + "px",
    //     left: this.state.playerE + "px"
    //     // transition: `top ${this.state.playerTransitionSpeed}s linear, left ${this.state.playerTransitionSpeed}s linear`
    //   }
    //   player = (<div className="player" style={playerStyle}></div>);
    // }

    return (

        <PlantTest />
        // <div className="game-wrapper">
        //   <div className="buttons">
        //     <button onClick={this.biomeView}>Biome</button>
        //     <button onClick={this.elevationView}>Elevation</button>
        //     <button onClick={this.rainfallView}>Rainfall</button>
        //     <button onClick={this.cycle}>Cycle</button>
        //     <button onClick={this.zoomOut}>Zoom Out</button>
        //   </div>
        //   <div className="game-screen">
        //     {zoomLevelRender}
        //     {player}
        //   </div>
        // </div>
    );
  }
}


ReactDOM.render(<Game />, document.getElementById('game-screen'))
