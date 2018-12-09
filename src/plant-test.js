import React from 'react';
import ReactDOM from 'react-dom';
import random from "lodash.random";
import round from "lodash.round";
import sample from "lodash.sample";
import compact from "lodash.compact";
import {constPlant, newPlant, growPlant} from "./helpers/plant-growth";

let fullArray = [1,1,1,1,1,1,1,1,1,1];
let threeQuarterArray = [.75,.85,.95,1,1,1,1,1,1,1];
let halfArray = [.5,.6,.7,.8,.9,1,1,1,1,1];
let quarterArray = [.25,.35,.45,.55,.65,.75,.85,.95,1,1];
let tenthArray = [.1,.1,.1,.1,.1,.1,.1,.1,.1,.1,.2,.3,.4,.5,.6,.7,.8,.9,1];

let shallowWater = [1,1,.5,0,0,0,0,0,0,0];
let deepWater = [0,0,0,0,0,0,.5,1,1];



class PlantTest extends React.Component {
  constructor(){
    super();

    this.state = {
        plant: constPlant("hardTree"),
        sun: tenthArray,
        water: fullArray.reverse(),
    }
  }

  growPlant = () => {
      let plant = growPlant(this.state.plant, this.state.sun, this.state.water);
      this.setState({
          plant: plant
      })
  }

  renderTrunkLayer = () => {
      let trunkLayer = [];

      for (var i = this.state.plant.trunkLayer.length - 1; i >= 0 ; i--) {
          let layer = this.state.plant.trunkLayer[i];
          let layerArray = [];
          for (var j = 0; j < layer.width; j++) {
              layerArray.push(<span>O</span>);
          }
          trunkLayer.push(<div>{layerArray}<span> / {layer.gain}</span></div>);
      }

      return trunkLayer;
  }

  renderRootLayer = () => {
      let rootLayer = [];

      for (var i = 0; i < this.state.plant.rootLayer.length; i++) {
          let layer = this.state.plant.rootLayer[i];
          let layerArray = [];
          for (var j = 0; j < layer.width; j++) {
              layerArray.push(<span>V</span>);
          }
          rootLayer.push(<div>{layerArray}<span> / {layer.gain}</span></div>);
      }

      return rootLayer;
  }


  render() {
      console.log("this.state.plant", this.state.plant);
      const plant = this.state.plant;

      return (
          <div>
              <h3>PLant Test</h3>

              <button onClick={this.growPlant}>Action</button>

              <div className="testPlantInfo">
                  <div>Woodiness</div>
                  <div>Plant energy gain: {plant.energyGain} | per trunkMass: {round((plant.energyGain / plant.trunkMass), 2)} | Trunk Growth: {plant.trunkGain}</div>
                  <div>Plant water gain: {plant.waterGain} | per rootMass: {round((plant.waterGain / plant.rootMass), 2)} | Root Growth: {plant.rootGain}</div>
              </div>

              <div className="testPlant">
                  {this.renderTrunkLayer()}
                  {this.renderRootLayer()}
              </div>
              <div>{plant.age}</div>
          </div>
      )
  }
}

export default PlantTest;
