import random from "lodash.random";
import sample from "lodash.sample";
import shuffle from "lodash.shuffle";
import compact from "lodash.compact";
import clone from "lodash.clone";
import foreach from "lodash.foreach";
import sortBy from "lodash.sortby";
import sortedUniq from "lodash.sorteduniq";
import {newPlant, newSeedling, growPLant, evolvePlant, testArray, testPlants} from "./plant";
import {grassColors, grassColorValues, soilColors, biomeType, biomeData, waterType, treeTypes, cropData, cropArray, getInitialPlants} from "./worldData";
import {getName, getLanguage} from "./syntax";


// let testPlant = newSeedling("a", 4);
// console.log("testPlant", testPlant);
// let sunArray = [.5,.6,.7,.8,.9,1];
// let waterArray = [1,.9,.8,.7,.6,.5];
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// testPlant = growPLant(clone(testPlant), sunArray, waterArray);
// console.log("testsPlant", testPlant);

// console.log(testPlants(10,20));

// let testPlantArray = [];
// // let testPlant = newPlant();
// let testPlant = testArray([5,5,5,5,20]);
// // testPlant = testArray([20,5,5,5,5]);
// // testPlant = testArray([5,5,20,5,5]);
// console.log("starting plant", testPlant.totalLight, testPlant.lightEfficiency, testPlant.foliageLayer);
// for (var i = 0; i < 10; i++) {
//     testPlant = evolvePlant(testPlant, 10);
// }
//
// console.log("ending plant", testPlant.totalLight, testPlant.lightEfficiency, testPlant.foliageLayer);

let grid = [];
let gridList = [];

let villageList = [];
let waterList = [];
let landList = [];
let seaList = [];
let riverList = [];
let peakList = [];
let shoreList = [];

let tempPaths = [];
let allPaths = {};

let aroundWater = [];

let count = 0;
let largeAnimalCount = 0;

const plantList = getInitialPlants(50);



const directionArray = ["east","south","west","north"];

const windDirections = ["N","S","E","W","NW","NE","SW","SE"];
const prevailingWind = sample(windDirections);
const cloudMin = random(50,150);
const cloudMax = random(100,300);
const spread = 120;

 let largeAnimalList = [];

const largeAnimals = {
  mammoth: {
    name: "Mammoth",
    size: 4,
    color: "brown",
    waterLevelMin: 30,
    waterLevelMax: 60,
    elevationMin: 1,
    elevationMax: 50,
    chance: 10,
    walkSpeed: 10,
    runSpeed: 5
  },
  woolyRhino: {
    name: "Wooly Rhino",
    size: 3,
    color: "brown",
    waterLevelMin: 10,
    waterLevelMax: 40,
    elevationMin: 1,
    elevationMax: 30,
    chance: 50,
    walkSpeed: 10,
    runSpeed: 5
  },
  saberTooth: {
    name: "Saber Tooth",
    size: 2,
    color: "brown",
    waterLevelMin: 20,
    waterLevelMax: 70,
    elevationMin: 1,
    elevationMax: 60,
    chance: 20,
    walkSpeed: 10,
    runSpeed: 5
  },
}

let biomes = {
  sea: {
    color: "rgba(42, 95, 129, ",
    name: "sea"
  },
  freshWater: {
    color: "rgba(40, 92, 168, ",
    name: "fresh water"
  },
  swamp: {
    color: "rgba(17, 126, 120, ",
    name: "swamp"
  },
  desert: {
    color: "rgba(196, 180, 112, ",
    name: "desert"
  },
  desertHill: {
    color: "rgba(182, 166, 98, ",
    name: "desert"
  },
  desertRidge: {
    color: "rgba(162, 147, 86, ",
    name: "desert"
  },
  grassland: {
    color: "rgba(135, 171, 68, ",
    name: "grassland"
  },
  plain: {
    color: "rgba(153, 171, 68, ",
    name: "plain"
  },
  savanah: {
    color: "rgba(172, 181, 73, ",
    name: "savanah"
  },
  forest: {
    color: "rgba(107, 171, 68, ",
    name: "forest"
  },
  mountain: {
    color: "rgba(142, 140, 136, ",
    name: "mountian"
  },
  snow: {
    color: "rgba(220, 220, 230, ",
    name: "snow"
  }
}

function fillMissing() {
  for (var i = 0; i < gridList.length; i++) {
    if(!gridList[i].elevation) {
      gridList[i].elevation = 50;
    }
  }
}

function newSquare(e, s) {
    let square = {
        id: count,
        e: e,
        s: s,
        waterLevel: 30,
        water: false,
        largeAnimals: [],
        surr: [],
        surrLand: [],
        surrWater: [],
        surrHigh: {elevation: 0},
        surrLow: {elevation: 200},
    };

    square.setSurr = function() {
      for (var i = 0; i < square.surr.length; i++) {
        let surr = square.surr[i];
        if(surr.elevation > square.surrHigh.elevation) {
          square.surrHigh = surr;
        }

        if(surr.elevation < square.surrLow.elevation) {
          square.surrLow = surr;
        }

        if(surr.water) {
          square.surrWater.push(surr)
        } else {
          square.surrLand.push(surr)
        }
      }
    }

    square.testSurr = function(callback) {
      for (var i = 0; i < square.surr.length; i++) {
        callback(square.surr[i])
      }
    }

    if(e) {
        square.west = grid[s][e - 1];
        square.surr.push(grid[s][e - 1]);
    }

    if(s) {
        square.north = grid[s - 1][e];
        square.surr.push(grid[s - 1][e]);
    }

    return square;
}

function setSurronding() {
  for (var i = 0; i < gridList.length; i++) {
    gridList[i].setSurr();
  }
}

export function getDistance(currentS, targetS, currentE, targetE) {
  let distanceS = Math.abs(currentS - targetS);
  let distanceE = Math.abs(currentE - targetE);
  let totalDistance = Math.floor(Math.sqrt(distanceS * distanceS + distanceE * distanceE));

  return totalDistance;
}

export function getTransitionSpeed(currentS, targetS, currentE, targetE, speed) {
  return Math.round(getDistance(currentS, targetS, currentE, targetE) / 280 * speed);
}

export function moveAnimal(id) {
  let animal = largeAnimalList[id];
  // console.log("a.S", animal.positionS, "d.S", animal.destinationS, "isTraveling", animal.isTraveling);
  if(!animal) {
    // console.log("!!!!!!!!!!!!!!!!!!!!!! animal cannot be moved- not found");
  }

  if(!animal.isTraveling) {
    let newS = random(-100, 100);
    // console.log("newS", newS);

    let newE = random(-100, 100);
    // console.log("newE", newE);

    animal.destinationS = animal.positionS + newS;
    animal.destinationE = animal.positionE + newE;
    // console.log("new destination", );
    animal.isTraveling = true;
  }
  // console.log(animal.positionS, "===", animal.destinationS, "&&", animal.positionE, "===", animal.destinationE);
  if(animal.positionS === animal.destinationS && animal.positionE === animal.destinationE) {
    // console.log("##### Done traveling");
    animal.isTraveling = false;
  }

  if(animal.isTraveling) {
    // console.log("traveling");
    let maxS = animal.destinationS - animal.positionS;
    let minS = maxS > 0 ? 1 : -1;
    let maxE = animal.destinationE - animal.positionE;
    let minE = maxE > 0 ? 1 : -1;

    let moveS = random(minS, maxS);
    let moveE = random(minE, maxE);

    animal.transitionSpeed = getTransitionSpeed(animal.positionS, moveS, animal.positionE, moveE, animal.walkSpeed);

    animal.positionS += moveS;
    animal.positionE += moveE;
  }

  return animal;
}

function addLargeAnimals(square) {
  foreach(largeAnimals, (animal) => {
    if(square.elevation > animal.elevationMax || square.elevation < animal.elevationMin || square.waterLevel > animal.waterLevelMax || square.waterLevel < animal.waterLevelMin) {
      if(random(animal.chance) === 1) {

        let startS = square.s * 280 + random(280);
        let startE = square.e * 280 + random(280);

        let newAnimal = {
          ...animal,
          id: largeAnimalCount,
          location: square,
          destinationS: startS,
          destinationE: startE,
          isTraveling: false,
          positionS: startS,
          positionE: startE
        }

        largeAnimalCount ++;

        largeAnimalList.push(newAnimal);
        square.largeAnimals.push(newAnimal);
      }
    }
  })
}

// function assignBiomes(snowLine) {
//   for (var i = 0; i < gridList.length; i++) {
//     let square = gridList[i];
//
//     let elevationIndex = Math.floor(square.elevation / 16);
//     let waterLevelIndex = Math.floor(square.waterLevel / 20);
//
//     elevationIndex = elevationIndex > 5 ? 5 : elevationIndex;
//     waterLevelIndex = waterLevelIndex > 4 ? 4 : waterLevelIndex;
//
//     elevationIndex = elevationIndex < 0 ? 0 : elevationIndex;
//     waterLevelIndex = waterLevelIndex < 0 ? 0 : waterLevelIndex;
//
//
//     let biomeName = "error";
//     let shade = random(.9, 1);
//
//     if(square.elevation > 90) {
//       peakList.push(square);
//     }
//
//     if(square.river || square.elevation <= 0 && waterType[elevationIndex]) {
//       square.water = true;
//       biomeName = waterType[elevationIndex];
//       waterList.push(square);
//     }
//
//     else if (biomeType[waterLevelIndex] && biomeType[waterLevelIndex][elevationIndex]) {
//       biomeName = biomeType[waterLevelIndex][elevationIndex];
//       landList.push(square);
//     }
//
//     if(biomeName === "error") {
//       console.log("***** Biome Error *****");
//       console.log("square elevation/ index", square.elevation, elevationIndex);
//       console.log("square waterLevel/ index", square.waterLevel, waterLevelIndex);
//       console.log("biomeType[waterLevelIndex]", biomeType[waterLevelIndex]);
//     }
//
//     square.biome = biomeData[biomeName];
//     square.biomeColor = square.biome.color + shade + ")";
//
//     if(!square.water) {
//       // addLargeAnimals(square);
//     }
//   }
//
// }

function assignPlants() {
    let shuffleList = shuffle(gridList);
    for (var i = 0; i < shuffleList.length; i++) {
        let square = shuffleList[i];
        if(square.river || square.elevation <= 0) {

            let shade = random(.9, 1);
            square.water = true;
            // biomeName = waterType[elevationIndex];
            waterList.push(square);
            // square.biome = biomeData[waterType[elevationIndex]];
            square.biomeColor = "rgba(66, 117, 177, " + shade + ")";
        }

        else if(square.path) {

        }

        else {
            landList.push(square);

            let numPlants = Math.floor( (100 - (100 - square.waterLevel)) / 3 );
            // if(numPlants < 5) {
            //     numPlants = 5;
            // }

            square.plants = [];
            for (var j = 0; j < numPlants; j++) {
                let plant = Object.assign({}, sample(plantList));
                // console.log("plant", plant);
                // console.log("waterlevel", square.waterLevel);
                let waterDiff = Math.floor(Math.abs(square.waterLevel - plant.idealWater) * plant.waterTolerance);
                let tempDiff = Math.floor(Math.abs(square.elevation - plant.idealTemp) * plant.tempTolerance);
                // console.log("waterDiff", waterDiff, "tempDiff", tempDiff);
                plant.health -= (waterDiff + tempDiff);
                // console.log("-- final health", plant.health);
                if(plant.health > 0) {
                    square.plants.push(plant);
                }
            }

            square.plants = sortBy(square.plants, "health");

            if(true) {
                square.biomeColor = getBiomeShade(square.plants, square);
            }
        }
    }
    for (var l = 0; l < 1; l++) {
        cyclePlants();
    }
}
function getBiomeShade(plants, square) {
    // if(!plants) {
    //     return "rgb(182,145,106)";
    // }

    let r = 0;
    let g = 0;
    let b = 0;
    let len = plants.length - 1 > 15 ? plants.length - 1 : 15;

    for (var i = 0; i < len; i++) {
        let plant = plants[i];
        if(plant) {
            r += plant.r;
            g += plant.g;
            b += plant.b;
        } else {
            let index = Math.floor(square.waterLevel / (100 / grassColorValues.length)) || 0;
            index = index > grassColorValues.length - 1 ? grassColorValues.length - 1 : index;
            let grass = grassColorValues[index];

            r += grass.r;
            g += grass.g;
            b += grass.b;
        }
    }


    r = Math.floor(r/len);
    g = Math.floor(g/len);
    b = Math.floor(b/len);


    return `rgb(${r}, ${g}, ${b})`;
    // return plants[plants.length - 1].color;
}

export function cyclePlants() {
    //for each cycle, collect a lits of sorted potential plants.
    //each cycle, the squares weakest plant will be replaced by the strongest of the potentialPlants.
    for (var i = 0; i < landList.length; i++) {
        let square = landList[i];
        let potentialPlants = [];
        potentialPlants = potentialPlants.concat(square.plants);
        if(square.south && !square.south.water) {
            potentialPlants = potentialPlants.concat(square.south.plants);
        }
        if(square.north && !square.north.water) {
            potentialPlants = potentialPlants.concat(square.north.plants);
        }
        if(square.east && !square.east.water) {
            potentialPlants = potentialPlants.concat(square.east.plants);
        }
        if(square.west && !square.west.water) {
            potentialPlants = potentialPlants.concat(square.west.plants);
        }

        potentialPlants = sortBy(potentialPlants, "health");
        potentialPlants = sortedUniq(potentialPlants);
        let bestPotential = potentialPlants[potentialPlants.length - 1]
        let worstCurrent = square.plants[0];

        if (bestPotential && worstCurrent && bestPotential.health > worstCurrent.health) {
            for (var k = 0; k < potentialPlants.length; k++) {

                if(square.id === 15){
                }
                if (square.plants.indexOf(potentialPlants[k]) === -1) {
                    let plant = Object.assign({}, potentialPlants[k]);
                    // console.log("plant", plant);
                    // console.log("waterlevel", square.waterLevel);
                    let waterDiff = Math.floor(Math.abs(square.waterLevel - plant.idealWater) * plant.waterTolerance);
                    let tempDiff = Math.floor(Math.abs(square.elevation - plant.idealTemp) * plant.tempTolerance);
                    // console.log("waterDiff", waterDiff, "tempDiff", tempDiff);
                    plant.health -= (waterDiff + tempDiff);

                    if(plant.health > square.plants[0].health) {
                        if(square.id === 15){
                        }

                        square.plants[0] = plant;
                        square.plants = sortBy(square.plants, "health");
                        square.biomeColor = getBiomeShade(square.plants, square);
                        break;
                    }
                }
            }
        }

        if(square.id === 15){
        }
    }
}

function spreadElevationFromPoint(current, power) {
  const direction = shuffle(directionArray);

  if(current[direction[0]] && !current[direction[0]].elevation) {
    current[direction[0]].elevation = getElevation(current.elevation, power);
    current = current[direction[0]];
    spreadElevationFromPoint(current, power);
  }

  if(current[direction[1]] && !current[direction[1]].elevation) {
    current[direction[1]].elevation = getElevation(current.elevation, power);
    current = current[direction[1]];
    spreadElevationFromPoint(current, power);
  }

  if(current[direction[2]] && !current[direction[2]].elevation) {
    current[direction[2]].elevation = getElevation(current.elevation, power);
    current = current[direction[2]];
    spreadElevationFromPoint(current, power);
  }

  if(current[direction[3]] && !current[direction[3]].elevation) {
    current[direction[3]].elevation = getElevation(current.elevation, power);
    current = current[direction[3]];
    spreadElevationFromPoint(current, power);
  }
}

export default function (gridHeight, gridWidth) {
    let t1 = performance.now();
    for (let s = 0; s < gridHeight; s++) {
        grid[s] = [];
        for (let e = 0; e < gridWidth; e++) {
            grid[s][e] = newSquare(e,s);
            gridList.push(grid[s][e]);
            count ++;
        }
    }

    for (let s = 0; s < gridHeight; s++) {
        for (let e = 0; e < gridWidth; e++) {
            if(grid[s][e + 1]) {
              grid[s][e].east = grid[s][e + 1];
              grid[s][e].surr.push(grid[s][e + 1]);
            }
            if(grid[s + 1]) {
              grid[s][e].south = grid[s + 1][e];
              grid[s][e].surr.push(grid[s + 1][e]);
            }
        }
    }
    let t2 = performance.now();
    // console.log("Initial grid", t2 - t1);

    let start = gridList[0];
    start.elevation = random(20);

    t1 = performance.now();
    spreadElevationFromPoint(start, 5);
    t2 = performance.now();
    // console.log("spreadElevationFromPoint(start, 3)", t2 - t1);

    t1 = performance.now();
    fillMissing();
    t2 = performance.now();
    // console.log("fillMissing()", t2 - t1);

    t1 = performance.now();
    simulateRainfall(random(50,100));
    t2 = performance.now();
    // console.log("simulateRainfall(100)", t2 - t1);

    t1 = performance.now();
    carveRivers();
    t2 = performance.now();
    // console.log("carveRivers()", t2 - t1);

    t1 = performance.now();
    assignPlants();
    t2 = performance.now();
    // console.log("assignPlants()", t2 - t1);

    t1 = performance.now();
    setSurronding()
    t2 = performance.now();
    // console.log("setSurronding()", t2 - t1);

    t1 = performance.now();
    assignElevationColor();
    t2 = performance.now();
    // console.log("assignElevationColor()", t2 - t1);

    t1 = performance.now();
    assignRainColor();
    t2 = performance.now();
    // console.log("assignRainColor()", t2 - t1);

    t1 = performance.now();
    setVillage();
    t2 = performance.now();
    // console.log("setVillage()", t2 - t1);

    t1 = performance.now();
    // chartAroundWater();
    edgeWater();
    t2 = performance.now();
    // console.log("edgeWater()", t2 - t1);

    t1 = performance.now();
    chartAllPaths();
    t2 = performance.now();
    // console.log("chartAllPaths()", t2 - t1);

    t1 = performance.now();
    testCycle();
    t2 = performance.now();
    // console.log("testCycle()", t2 - t1);

    // console.log("******** total squares", gridList.length);
    // console.log("^^^^^^^^ Animals", largeAnimalList);
    return grid;
}

function testCycle() {
  for (var i = 0; i < gridList.length; i++) {
    let square = gridList[i];
  }
}

export function cycleVillages() {
  for (var i = 0; i < array.length; i++) {
    array[i]
  }
}

function edgeWater() {
  for (var i = 0; i < landList.length; i++) {
    let square = landList[i];
    if(square.west && square.west.water) {
      // square.biomeColor = "red";
      square.shoreLine = true;
      shoreList.push(square);
    }
    else if(square.west && square.west.north && square.west.north.water || square.west && square.west.south && square.west.south.water) {
      // square.biomeColor = "red";
      square.shoreLine = true;
      shoreList.push(square);
    }
    else if(square.east && square.east.water) {
      // square.biomeColor = "red";
      square.shoreLine = true;
      shoreList.push(square);
    }
    else if(square.east && square.east.north && square.east.north.water || square.east && square.east.south && square.east.south.water) {
      // square.biomeColor = "red";
      square.shoreLine = true;
      shoreList.push(square);
    }
    else if(square.north && square.north.water) {
      // square.biomeColor = "red";
      square.shoreLine = true;
      shoreList.push(square);
    }
    else if(square.south && square.south.water) {
      // square.biomeColor = "red";
      square.shoreLine = true;
      shoreList.push(square);
    }
  }
}

export function startCycle(snowLine) {
    cyclePlants();
    return grid;
}

// export function startCycle(snowLine) {
//   addRainFall();
//   takeWater();
//   generateWaterFlow(90);
//   assignElevationColor();
//   assignRainColor();
//   assignBiomes(snowLine);
//   return grid;
// }

function simulateRainfall(times) {
  for (var i = 0; i < times; i++) {
    addRainFall();
    takeWater();
    generateWaterFlow(80);
  }
}

export function addDetail(square, numPerSq) {
    let patchList = [];

    square.detail = [];
    square.trees = [];

    if (square.plants && square.plants.length > 0) {
      square.trees = addPlants(square, numPerSq);
    }

    for (var s = 0; s < numPerSq; s++) {
      let row = [];

      for (var e = 0; e < numPerSq; e++) {
        let biomeColor = getBiomeColor(square, s, e, numPerSq);
        let patch = {
          e: e,
          s:s,
          waterLevel: square.waterLevel,
          biomeColor: biomeColor
        }

        row.push(patch);
        patchList.push(patch);
      }
      square.detail.push(row);
    }

    grid[square.s][square.e] = square;
    gridList[square.id] = square;

    return square;
}

function addPlants(square, numPerSq) {
  let trees = [];

  let numTrees = random(Math.floor(square.plants.length / 2), square.plants.length);

  for (var i = 0; i < numTrees; i++) {
      let plant = Object.assign({}, sample(square.plants));
      plant.positionS = random(numPerSq) * 5.26;
      plant.positionE = random(numPerSq) * 5.26;
      trees.push(plant);
  }

  return trees;
}

function newTree(square, numPerSq) {
  let s = random(numPerSq) * 5.26;
  let e = random(numPerSq) * 5.26;
  let wood = random(5, 10);

  let tree = treeTypes[sample(square.biome.trees)]

  let newTree = {
    ...tree,
    positionS: s,
    positionE: e,
    wood: wood,
  }

  return newTree;
}

function getBiomeColor(square, s, e, numPerSq) {
  if(square.path) {
    let half = Math.floor(numPerSq / 2);
    let pathWeight = square.use;
    let pathColor = "rgb(94, 68, 34)";
    // Path left
    if ((square.next && square.west && square.next === square.west || square.prev && square.prev === square.west) && e <= half && s > half - 2 && s < half + 2 && random(100) < pathWeight) {
      return pathColor;
    }

    // Path right
    if ((square.next && square.east && square.next === square.east || square.prev && square.prev === square.east) && e >= half && s > half - 2 && s < half + 2 && random(100) < pathWeight) {
      return pathColor;
    }

    // Path top
    if ((square.next && square.north && square.next === square.north || square.prev && square.prev === square.north) && s <= half && e > half - 2 && e < half + 2 && random(100) < pathWeight) {
      return pathColor;
    }

    // Path bottom
    if ((square.next && square.south && square.next === square.south || square.prev && square.prev === square.south) && s >= half && e > half - 2 && e < half + 2 && random(100) < pathWeight) {
      return pathColor;
    }

  }

  if(square.field) {
    let crop = cropData[square.crop];
    let maxHarvest = crop.fpa;

    console.log("crop", crop, "maxHarvest", maxHarvest);
    if(random(0, maxHarvest * 2) < square.harvest) {
      let shade = random(.8, 1);
      return cropData[square.crop].color + shade + ")";
    }

  }

  if(square.field && cropData[square.crop].aquatic) {
    return "rgb(40, 145, 156)";
  }

  let selected = square;
  let shade = random(.8, 1);

  let low = Math.floor(numPerSq / 4);

  if(random(low) + s < low && square.north && !square.north.village && !square.village) {
    selected = square.north;
  }

  if(random(low) + e < low && square.west && !square.west.village && !square.village) {
    selected = square.west;
  }
  let rand = random(square.waterLevel, 100) + square.waterLevel;

  if(rand > random(200)) {
      let index = Math.floor(rand / (200 / grassColors.length));
      index = index > 11 ? 11 : index;
      console.log("*** index", index);
      return grassColors[index] + random(.8,1) + ")";
  }

  else {
      let index = Math.floor(square.waterLevel / (100 / soilColors.length)) || 0;
      return soilColors[0] + random(.8,1) + ")";
  }
}

function setVillage() {
  for (var i = 0; i < gridList.length; i++) {
    let square = gridList[i];

    if(square.elevation > 0 && !square.river) {
      if(((square.south && square.south.water) || (square.north && square.north.water) || (square.east && square.east.water) || (square.west && square.west.water)) && random(700) === 1) {
        square = buildVillage(square);
      } else if(random(50000) < (100 - square.elevation + square.waterLevel)) {
        square = buildVillage(square);
      }
    }
  }
}

function buildVillage(square) {
  square.village = true;
  square.population = random(10,30);
  square.aggression = random(10);
  square.reprisal = random(10);
  square.openess = random(10);
  square.spreadRate = random(10);
  square.paths = [];
  square.pathIds = [];
  square.biomeColor = "rgb(83, 51, 24)";
  square.cropLand = [];
  square.quarry = null;
  square.port = null;
  square.bestCrops = [];
  square.allCrops = [];
  square.food = 0;
  square.numFields = Math.floor(square.population / 10);
  square.fields = [];
  square.biome = {
    name: "Village",
    color: "rgba(83, 51, 24, ",
    plants: [],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: [],
  }

  for (var i = 0; i < 8; i++) {
    square.allCrops.push(cropArray[i]);
  }

  for (var i = 0; i < square.numFields; i++) {
    if(!square.surr[i].water) {
      let field = square.surr[i];
      field.field = true;
      square.fields.push(field);
    }
  }

  villageList.push(square);
  cropCycle(square);
}

function cropCycle(village) {
  let bc = 0;
  let c1 = 0;
  let c2 = 0;
  let c3 = 0;

  for (var i = 0; i < village.fields.length; i++) {
    let field = village.fields[i];
    let shade = random(.9,1);

    if (random(3) === 3 || village.bestCrops.length === 0) {
      //try new crop
      field.crop = sample(village.allCrops);
    } else {
      field.crop = sample(village.bestCrops);
    }
    field.biomeColor = cropData[field.crop].color + shade + ")";

    if (field.crop) {
      console.log("adding harvest");
      field.harvest = harvestCrop(field, cropData[field.crop]);
    }
  }
}

function harvestCrop(square, crop) {
  let maxHarvest = crop.fpa;
  let waterDiff = Math.abs(crop.optWater - square.waterLevel);

  return crop.fpa - (waterDiff * 10);
}

export function chartAllPaths() {
  for (var i = 0; i < villageList.length; i++) {
    let current = villageList[i];
    findClosestVillages(current);
    chartPaths(current, 3);
  }
}

function findClosestWater(current, number) {

}

export function findClosestVillages(current) {
  let villages = [];
  for (var i = 0; i < villageList.length; i++) {
    let village = villageList[i];

    if(village.id !== current.id) {
      let distance = Math.abs(village.s - current.s) + Math.abs(village.e - current.e);
      villages.push({village: village, distance: distance})
    }
  }

  let closestVillages = sortBy(villages, [function(village) {return village.distance;}]);

  current.closestVillages = closestVillages;
}

function chartPaths(current, number) {
  let villages = current.closestVillages;
  number = number > villages.length ? villages.length : number;
  tempPaths = [];

  // For x number of closest villages
  for (var i = 0; i < number; i++) {
    let target = villages[i].village;
    let isCharted = target.pathIds.indexOf(current.id) !== -1;

    // If the path is not charted
    if(!isCharted) {

      //Try charting the route 5 times
      for (var j = 0; j < 5; j++) {
        chartPathToVillage(current, target);
      }

      //If at least one route is found, find th shortest
      if(tempPaths.length > 0) {
        let minPath = tempPaths[0];

        for (var k = 0; k < tempPaths.length; k++) {
          if (tempPaths[k].length < minPath.length) {
            minPath = tempPaths[k];
          }
        }

        //set path attributes
        minPath[0].start = true;
        for (var i = 0; i < minPath.length; i++) {
          minPath[i].path = true;
          minPath[i].use = 1;
          minPath.from = current;
          minPath.to = target;

          if(minPath[i + 1]) {
            minPath[i].next = minPath[i + 1];
            minPath[i + 1].prev = minPath[i];
          } else {
            minPath[i].end = true;
          }
        }

        //Add to villages path index
        current.paths.push(minPath);
        current.pathIds.push(target.id);

        if (allPaths[current.id]) {
          allPaths[current.id].push(minPath.to.id);
        } else {
          allPaths[current.id] = [minPath.to.id];
        }

        tempPaths = [];
      }
    }
  }

  for (var i = 0; i < current.paths.length; i++) {
    let path = current.paths[i];

    for (var j = 0; j < path.length; j++) {
      if(!path[j].village) {
        path[j].biomeColor = "rgb(156, 136, 86)";
      }
    }
  }
}

function chartPathToVillage(current, target) {
  let startVillage = current;
  let distS = target.s - current.s;
  let distE = target.e - current.e;
  let directionS = distS < 0 ? "north" : "south";
  let directionE = distE < 0 ? "west" : "east";

  distE = Math.abs(distE);
  distS = Math.abs(distS);

  let distArray = [directionS, directionE];

  let safety = 0;
  let possPath = [];

  while(current.s != target.s || current.e != target.e && safety < 1000) {
    safety ++;

    //Level on east axis- move on south axis
    if(distE <= 0 && current[directionS] && !current[directionS].water) {
      // console.log("moving S");
      current = current[directionS];
      distS --;
    }

    else if(distS <= 0 && current[directionE] && !current[directionE].water) {
      // console.log("moving E");
      current = current[directionE];
      distE --;
    }

    else if(current[directionE] && current[directionE].water && current[directionS] && current[directionS].water) {
      console.log("blocked by water !!!!!");
      break;
    }

    else {
      let rand = random(1,2);

      if(rand === 1 && current[directionE] && !current[directionE].water) {
        current = current[directionE];
        distE --;
      } else if(rand === 2 && current[directionS] && !current[directionS].water) {
        current = current[directionS];
        distS --;
      } else {
        // console.log("no route found");
        break;
      }

    }

    possPath.push(current);
  }

  if(current === target) {
    tempPaths.push(possPath);
  }
}

function addRainFall() {
  if (prevailingWind === "W") {
    addRainFallFromWest();
  } else if (prevailingWind === "N") {
    addRainFallFromNorth();
  } else if (prevailingWind === "E") {
    addRainFallFromEast();
  } else if (prevailingWind === "S") {
    addRainFallFromSouth();
  } else if(prevailingWind === "NW") {
    if(random(1,2) === 2) {
      addRainFallFromNorth();
    } else {
      addRainFallFromWest();
    }
  } else if(prevailingWind === "NE") {
    if(random(1,2) === 2) {
      addRainFallFromNorth();
    } else {
      addRainFallFromEast();
    }
  } else if(prevailingWind === "SW") {
    if(random(1,2) === 2) {
      addRainFallFromSouth();
    } else {
      addRainFallFromWest();
    }
  } else if(prevailingWind === "SE") {
    if(random(1,2) === 2) {
      addRainFallFromSouth();
    } else {
      addRainFallFromEast();
    }
  }
}

function addRainFallFromNorth() {
  let cloud = [];

  for (var i = 0; i < grid[0].length; i++) {
    cloud[i] = random(cloudMin, cloudMax);
  }

  for (var e = 0; e < grid[0].length; e++) {

    for (var s = 0; s < grid.length; s++) {
      const square = grid[s][e];
      const rainChance = random(spread);
      if(square.elevation <= 0) {
        cloud[e] += 1;
      }
      else if(cloud[e] > 0 && (square.elevation > rainChance || random(100) > 35)) {
        let amount = 3;
        square.waterLevel += amount
        cloud[e] -= amount;
      }
    }
  }
}

function addRainFallFromSouth() {
  let cloud = [];

  for (var i = 0; i < grid[0].length; i++) {
    cloud[i] = random(cloudMin, cloudMax);
  }

  for (var e = 0; e < grid[0].length; e++) {

    for (var s = grid.length - 1; s >= 0 ; s--) {
      const square = grid[s][e];
      const rainChance = random(spread);
      if(square.elevation <= 0) {
        cloud[e] += 1;
      }
      else if(cloud[e] > 0 && (square.elevation > rainChance || random(100) > 35)) {
        let amount = 3;
        square.waterLevel += amount
        cloud[e] -= amount;
      }
    }
  }
}

function addRainFallFromEast() {
  let cloud = [];

  for (var i = 0; i < grid.length; i++) {
    cloud[i] = random(cloudMin, cloudMax);
  }

  for (var s = 0; s < grid.length; s++) {
    const row = grid[s];

    for (var e = row.length - 1; e >= 0; e--) {
      const square = row[e];
      const rainChance = random(spread);
      if(square.elevation <= 0) {
        cloud[s] += 1;
      }
      else if(cloud[s] > 0 && (square.elevation > rainChance || random(100) > 35)) {
        let amount = 3;
        square.waterLevel += amount
        cloud[s] -= amount;
      }
    }
  }
}

function addRainFallFromWest() {
  let cloud = [];

  for (var i = 0; i < grid.length; i++) {
    cloud[i] = random(cloudMin, cloudMax);
  }

  for (var s = 0; s < grid.length; s++) {
    const row = grid[s];

    for (var e = 0; e < row.length; e++) {
      const square = row[e];
      const rainChance = random(spread);
      if(square.elevation <= 0) {
        cloud[s] += 1;
      }
      else if(cloud[s] > 0 && (square.elevation > rainChance || random(100) > 35)) {
        let amount = 3;
        square.waterLevel += amount
        cloud[s] -= amount;
      }
    }
  }
}

function takeWater() {
  for (var s = 0; s < grid.length; s++) {
    const row = grid[s];

    for (var e = 0; e < row.length; e++) {
      const square = row[e];
      square.waterLevel -= 2;
      if(square.waterLevel < 0){
        square.waterLevel = 0;
      }
    }
  }
}

let rivers = [];

function traceRiverFrom(start) {
  let current = start;
  let river = [];
  let safety = 0;

  while (safety < 1000 && current.elevation > 0 && current.east && current.west && current.north && current.south) {
    safety ++;
    // current.biomeColor = "blue";
    river.push(current);
    current.river = true;
    current.water = true;

    let lower = getLower(current);
    if((lower.elevation - current.elevation) > 10) {
      break;
    }

    current = lower;
  }

  if(current.elevation === 0 || river.length > 40) {
    rivers.push(river);
  } else {
    for (var i = 0; i < river.length; i++) {
      river[i].river = false;
      river[i].water = false;
    }
  }

  // if(river.length > 30) {
  //   rivers.push(river);
  // }

  for (var i = 0; i < rivers.length; i++) {
    for (var j = 0; j < rivers[i].length; j++) {
      let square = rivers[i][j];
      square.biomeColor = "blue";
      square.elevation -= .5;

      let riverWater = .3;

      if(square.west && !square.west.river) {
        square.west.waterLevel += riverWater;
      }
      if(square.east && !square.east.river) {
        square.east.waterLevel += riverWater;
      }
      if(square.south && !square.south.river) {
        square.south.waterLevel += riverWater;
      }
      if(square.north && !square.north.river) {
        square.north.waterLevel += riverWater;
      }
    }
  }
}

function generateWaterFlow(level) {
  let safety = 0;
  let flowing = true;

  while (safety < 100000 && flowing) {
    safety ++;
    flowing = false;
    for (var i = 0; i < gridList.length; i++) {
      const square = gridList[i];

      if(square.waterLevel > level) {
        let lower = getLowerLevel(square);
        if (lower !== square) {
          let transfer = square.waterLevel - level;
          lower.waterLevel += transfer;
          lower.erosion ++;
          if (lower.erosion >= 50) {
            lower.elevation -= 1;
            lower.erosion = 0;
          }
          square.waterLevel -= transfer;
          flowing = true;
        }
      }
    }
  }

}

function getLowerLevel(square) {
  let lowestSide = square;

  if(square.west && square.west.elevation < lowestSide.elevation) {
    lowestSide = square.west;
    // next = ["east","east","north","south"];
  }

  if(square.east && square.east.elevation < lowestSide.elevation) {
    lowestSide = square.east;
    // next = ["east","east","north","south"];
  }
  if(square.north && square.north.elevation < lowestSide.elevation) {
    lowestSide = square.north;
    // next = ["north","north","east","west"];
  }
  if(square.south && square.south.elevation < lowestSide.elevation) {
    lowestSide = square.south;
    // next = ["south","south","east","west"];
  }

  return lowestSide;
}

function getLower(square) {
  let lowestSide = {elevation: 200};
  if(square.west && square.west.elevation < lowestSide.elevation && !square.west.river && !square.west.north.river && !square.west.south.river) {
    lowestSide = square.west;
    // next = ["east","east","north","south"];
  }

  if(square.east && square.east.elevation < lowestSide.elevation && !square.east.river && !square.east.north.river && !square.east.south.river) {
    lowestSide = square.east;
    // next = ["east","east","north","south"];
  }
  if(square.north && square.north.elevation < lowestSide.elevation && !square.north.river && !square.north.east.river && !square.north.west.river) {
    lowestSide = square.north;
    // next = ["north","north","east","west"];
  }
  if(square.south && square.south.elevation < lowestSide.elevation && !square.south.river && !square.south.east.river && !square.south.west.river) {
    lowestSide = square.south;
    // next = ["south","south","east","west"];
  }

  return lowestSide;
}



function getRivers() {
  let highRain = [];
  for (var i = 0; i < gridList.length; i++) {
    let square = gridList[i];
    if(square.waterLevel > 100) {
      highRain.push(square);
      // runRiver(square);
    }
  }

  let source = sample(highRain);

  runRiver(source);
}

function runRiver(source) {
  source.biomeColor = "blue";
  source.biome = "freshWater"

  let current = source;
  current.biomeColor = "blue";
  current.river = true;
  current.water = true;
  let safety = 500;

  while(safety > 0 && current.elevation > 0) {
    safety --;
    let lower = getLower(current);

    // if(lower.elevation >= current.elevation) {
    //   lower.elevation = current.elevation - 1;
    // }
    current.biomeColor = "blue";
    current.river = true;
    current = lower;
  }
}

export function carveRivers() {
  // generateWaterFlow()
  // getRivers();
  let hightWater = [];
  for (var i = 0; i < gridList.length; i++) {
    if(gridList[i].waterLevel > 100) {
      hightWater.push(gridList[i]);
      traceRiverFrom(gridList[i]);
    }
  }

  // traceRiverFrom(sample(hightWater));
  // assignBiomes(87);
  // assignElevationColor();
  assignRainColor();

  return grid;
}

function assignElevationColor() {
  for (var i = 0; i < gridList.length; i++) {
    let square = gridList[i];
    let elevationShade = square.elevation / 100;
    let elevationColor = "rgba(0, 0, 0, ";

    square.elevationColor = elevationColor + elevationShade + ")";
  }
}

function assignRainColor() {
  for (var i = 0; i < gridList.length; i++) {
    let square = gridList[i];
    let rainShade = square.waterLevel / 100;
    let rainColor = "rgba(40, 92, 168, ";
    square.rainColor = rainColor + rainShade + ")";
    if (square.waterLevel > 100) {
      square.rainColor = "rgb(80, 54, 122)";
    }
  }
}

function getElevation(currentElevation, power) {
  let plusMinus = [-1, 1];
  let multiplyer = sample(plusMinus);

  multiplyer = currentElevation > 90 ? -1 : multiplyer;
  multiplyer = currentElevation < -20 ? 1 : multiplyer;
  const diff = random(power) * multiplyer;

  return currentElevation + diff;
}

function addBaseRainfall() {
  let rainLevel = random(40, 60);

  for (var s = 0; s < grid.length; s++) {
    const row = grid[s];
    for (var e = 0; e < row.length; e++) {
      const rand = random(-5,5);
      rainLevel += rand;
      row[e].rain = rainLevel;
    }
  }
}

// for (var s = 0; s < grid.length; s++) {
//   const row = grid[s];
//
//   for (var e = 0; e < row.length; e++) {
//     row[e]
//   }
// }
