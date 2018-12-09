/*
Year characteristics:
Year is devided into 4 seasons
Each season has an avg temperature and wind direction
Each season consists of 10 rain cyclePlants

Planet characteristics
Gravity .5 - 1.5
Avg temp
Light-type
Tectonic activity - adds ridges and valleys to surface
Meteor frequency - adds craters to surface - reduced by atmosphere
Num moons
Density moons
Tidal strength = num moons * density moons
Atmospheric Density
Atmospheric oxegen
WaterLevel Starts at 0. Increasing water-level floods low elevation
Num seasons even number from 2 - 8 each season will have random wind direction and strength but avg temperature will vary evenly from hight to low

Tereforming tools
Atmospheric generator- bores into earths crust to release gasses Can be set to select for co2, water-vapor and total density levels

Bacteria- a variety can be used to fine-tune oxegen, co2 and for soil creation

Water- Algae- once sufficient water-levels have been acheived, algae can be released to turn co2 into oxegen - very hardy

Land- lichen- performs the same function as Algae but more slowly and builds soil - very hardy

Moss - land based soild creator - convert co2 to oxegen - cool planet
Plants land based soil and food creators - convert co2 to oxegen - cool Planet

Phytoplankton - water-based co2 - oxegen- feeds off sunlight

Zooplankton - water-based oxegen to co2-  feeds off Phytoplankton

Animals- various, land and water - feed off plants, algae, moss, Phytoplankton and Zooplankton and each other- co2 - oxegen

Devided by class and by trophic level

anthropods

fish

reptiles

amphibians

birds

mammals

Water square characteristics
Salinity
flowingRate
tidalRate
Nutrients
Temperature
Depth


Land Square characteristics:
Current temperature: determined by avg temp - elevation + waterLevel -- Areas with high rain have more moderate temps
Holding capacity: .1 to 1 water per foot of soil
Soil Depth: feet of soil 0-10 0 is rock and has no water-holding capacity
Total capacity: holdingCapacity * soilDepth
soilProfile = array [waterLevel, waterLevel]
Rain amount: Total rain per year
Rain variation: difference between seasonal rain amounts


Plant characteristics
Plant expends energy to build root, tubers, trunk, leaves, and fruit

Plants TER- total energy requirement is based on full volume of plant
Plant TER must be met with both sunlight/energy and water.
Plant can store water and energy in trunk or roots to survive periods without water or sunlight

plant consists of 2 - 3 arrays root trunk and leaves (some plants 3 high or under lack trunk)

rootProfile an array of root spread and thickness at various depths
root depth * spread determines the amount of water the plant can pick up a given soild level
root volume is = root spread * root thickness. Combines with trunk volume to determine total water holding capacity

trunkProfle- an array of trunk thickness and spread at each level
trunk thickness determines water carry capacity
trunk spread determines potential leaf area

trunk rules. trunk can split multiple times, but total trunk volume at any given level must be less than level below * trunk trunkWoodiness
trunkWoodiness- woodier trunks are stronger and allow for more spread but take more energy and reduces growth-rate and photosynthisis from trunk

leaf profile- an array of leafspread at each level.
leaf size determines energy per spread. larger size produces more energy but loses more water and takes more energy to replace and limits cold-tolerance
plant can drop leaves in certain seasons to reduce load or increase cold tolerance but leaves must be re-grown at a cost

leaves can spread horizontal along ground up to 10 from root
leaves can spread horizontal 2 from trunk
leaves can spread 1 from leaf below
leaves can stack 3 hight from ground or trunk

each leaf layer reduces the efficiency of the layer directly below



Square level plant rules
Each square is made up of many small spaces. Each space randomly varies temp and waterLevel slightly from square avg
Each square starts with a randomly generated array of possible plants
The square is then filled in as follows

Cycle randomly through available spaces. At each space cycle through possible plant array and fill with best adapted

On each succesive cycle, possible plant array is filled with- plants from surrounding squares and mutations from current square

Best suited plants will fill the grid until they begin to interfere with each other and create space for smaller Plants
If a small plant is the bes suited, it could take over all available niches.
*/

import sample from "lodash.sample";
import random from "lodash.random";
import clone from "lodash.clone";
import max from "lodash.max";
import min from "lodash.min";
import sum from "lodash.sum";

let count = 0;
/*
Possible properties
initalClimb- height tree will attempt to reach before puting energy into spreading
growthTaper- plants height to spread ratio decreases by an amount on each generation.
growthCurve- Array of 10 numbers that represent the plants growthCurve over time
*/


export function newSeedling(location, numSeasons) {
    let plant = {
        // spreadRate: random(10),
        // spreadPercent: random(.2,1),
        // leafSize: random(1,3),
        // leafDensity: random(1,3),
        topBias: random(.1,.9),
        heightCurve: [], //percent of new growth added to height
        spreadCurve: [], //percent of new spread-growth added to each level
        trunkLayer: [1],
        rootLayer: [1],
        rootMass: 1,
        trunkMass: 1,
        mass: 2,
        energy: 0,
        water: 0,
        health: 5,
        woodiness: random(10),
        // rootRatio: random(.3, .7), May want to bring this back for seasonailty
        maxAge: random(1, 100),
        age: 0,
        chem: [random(10), random(10), random(10), random(10), random(10)],
        location: location,
        leafLevel: []
    }

    plant.heightCurve = getRandomHeightCurve();
    plant.spreadCurve = getRandomSpreadCurve();
    plant.leafLevel.length = numSeasons;
    plant.lightGainArray = getLightGainArray(plant.trunkLayer, max(plant.trunkLayer), min(plant.trunkLayer));
    plant.leafLevel.fill(1);
    // plant.trunkCost = (plant.woodiness + (plant.spreadRate * plant.spreadPercent)) * .1;
    plant.trunkCost = 1;


    // plant.trunkProfile = [];
    // plant.maxHeight = Math.round((plant.woodiness * plant.maxAge)  / ((plant.spreadRate || 1) * plant.spreadPercent) / 4);
    // for (var i = 0; i < plant.maxHeight; i++) {
    //     plant.trunkProfile[i] = random(10);
    // }

    // plant.mass = plant.rootMass + Math.round(plant.trunkMass + (plant.trunkMass * 1 + plant.leafLevel[0] * plant.leafDensity *));
    plant.mass = plant.rootMass + plant.trunkMass;
    plant.id = count;
    count ++;
    console.log("seedling", plant.id, plant);
    return plant;
}

function getRandomHeightCurve() {
    let curve = [];
    curve.length = 5;
    curve.fill(.5);
    let total = 0;


    // for (var i = 0; i < 5; i++) {
    //     let rand = random(10);
    //     total += rand;
    //     curve[i] = rand;
    // }
    //
    // for (var i = 0; i < 5; i++) {
    //     curve[i] = curve[i]/total;
    // }

    return curve;
}

function getRandomSpreadCurve() {
    let curve = [];
    let total = 0;

    for (var i = 0; i < 5; i++) {
        let rand = random(10);
        total += rand;
        curve[i] = rand;
    }

    for (var i = 0; i < 5; i++) {
        curve[i] = curve[i]/total;
    }

    return curve;
}

export function growPLant(plant, sunArray, waterArray) {
    // console.log("                                          ");
    // console.log("*****************************************************");
    let newEnergy = getEnergy(plant, sunArray);
    let newWater = getWater(plant.rootLayer, waterArray);
    // console.log("energyGain", newEnergy);
    // console.log("waterGain", newWater);
    // console.log("plant.mass", plant.mass);

    let energyGrowth = newEnergy - (plant.mass / 5);
    let waterGrowth = newWater - (plant.mass / 5);
    // console.log("energyGrowth after mass", energyGrowth);
    // console.log("waterGrowth after mass", waterGrowth);


    if(energyGrowth < 0) {
        plant.health -= energyGrowth;
    }

    if(waterGrowth < 0) {
        plant.health -= waterGrowth;
    }

    if(plant.health < 0) {
        console.log("Plant died !!!!!!!");
        return null;
    }

    let growth = energyGrowth < waterGrowth ? energyGrowth : waterGrowth;
    // console.log("total Growth", growth);
    let adjustedEnergy = energyGrowth * plant.trunkCost;
    let energyNeed = adjustedEnergy / (adjustedEnergy + waterGrowth);
    let waterNeed = waterGrowth / (adjustedEnergy + waterGrowth);
    // console.log("energyNeed", energyNeed);
    // console.log("waterNeed", waterNeed);

    // let waterNeed = .3;

    let rootGrowth = Math.round(waterNeed * growth);
    let trunkGrowth = Math.round((growth - rootGrowth) / plant.trunkCost);


    // console.log("rootGrowth", rootGrowth);
    // console.log("trunkGrowth", trunkGrowth);

    if(rootGrowth) {
        plant.rootMass += rootGrowth;
        plant.rootLayer = growRootLayer(plant, rootGrowth);
    }

    if(trunkGrowth) {
        plant.trunkMass += trunkGrowth;
        plant.trunkLayer = growTrunkLayer(plant, trunkGrowth);
        plant.lightGainArray = getLightGainArray(plant.trunkLayer, max(plant.trunkLayer), min(plant.trunkLayer));
    }

    plant.mass = (plant.rootMass + plant.trunkMass);
    plant.age += 1;

    return plant;
}

function growRootLayer(plant, rootGrowth) {
    let rootLayer = clone(plant.rootLayer)
    rootLayer.push(rootGrowth);
    return rootLayer;
}


/*
Growth rules:
1) check to see if plant will devote all growth up or spread
2) check what amount to spread
3) if trunk can support upward growth - add growth upward
    if trunk cannot support upward growth, shore up trunk starting from the bottom
4) add spread starting from the top and factoring topBias
*/

function growTrunkLayer(plant, trunkGrowth) {
    console.log("*****", trunkGrowth);
    let trunkLayer = clone(plant.trunkLayer);
    let ageIndex = Math.floor(plant.age / 5);
    console.log("ageIndex", ageIndex, "valiue", plant.heightCurve[ageIndex]);
    console.log(plant.heightCurve);
    let heightGrowth = Math.round(trunkGrowth * plant.heightCurve[ageIndex]);
    let spreadGrowth = trunkGrowth - heightGrowth;
    console.log("heightGrowth", heightGrowth, "spreadGrowth", spreadGrowth);

    let heightIndex = Math.floor(trunkLayer.length / 5);
    for (var i = 0; i < trunkLayer.length; i++) {
        let levelGrowth = Math.round(spreadGrowth * plant.spreadCurve[heightIndex]);
        if(trunkLayer.length < 5) {
            levelGrowth = Math.round(spreadGrowth / trunkLayer.length);
        }
        trunkLayer[i] = trunkLayer[i] + levelGrowth;
    }
    // console.log("before adding", heightGrowth, trunkLayer);
    trunkLayer.push(heightGrowth);
    console.log("after", trunkLayer);
    // if()
    // let safety = 0;
    // while (saftey < 100 && trunkGrowth > 0) {
    //     safety ++;
    //
    //
    // }

    return trunkLayer;
}

function getEnergy(plant, sunArray) {
    let totalEnergyGain = 0;
    for (var i = 0; i < plant.lightGainArray.length; i++) {
        let leafSurface = plant.lightGainArray[i] * 4;
        let availableLight = sunArray[i];
        totalEnergyGain += leafSurface * availableLight;
    }
    console.log("totalEnergyGain", totalEnergyGain);
    return totalEnergyGain;
}

function getWater(rootLayer, waterArray) {
    let totalWaterGain = 0;
    for (var i = 0; i < rootLayer.length; i++) {
        totalWaterGain += rootLayer[i] * waterArray[i] * 4;
    }

    console.log("totalWaterGain", totalWaterGain);
    return totalWaterGain;
}

let setPlants = [

]

export function testPlants(numPlants, numCycles) {
    let testArray = [];
    let perfect = {
        name: "perfect",
        water: [1,1,1,1,1,1,1,1,1,1],
        sun: [1,1,1,1,1,1,1,1,1,1]
    }

    let desert = {
        name: "desert",
        water: [.3,.2,.1,0,0,0,0,0,0,0],
        sun: [.8,.9,1,1,1,1,1,1,1,1]
    }

    let grassLand = {
        name: "grassLand",
        water: [.7,.6,.4,.3,.2,.1,0,0,0,0],
        sun: [.8,.9,1,1,1,1,1,1,1,1]
    }

    let dryForest = {
        name: "dryForest",
        water: [.7,.6,.4,.3,.2,.1,0,0,0,0],
        sun: [.4,.5,.6,.7,.8,.9,1,1,1,1]
    }

    let rainForest = {
        name: "rainForest",
        water: [1,1,1,1,1,1,1,1,1,1],
        sun: [.4,.5,.6,.7,.8,.9,1,1,1,1]
    }

    let biomeArray = [perfect, desert, grassLand, dryForest, rainForest];
    biomeArray = [rainForest];

    for (var i = 0; i < numPlants; i++) {
        testArray.push(newSeedling("a", 4));
    }
    let summary = {
        perfect: {
            bestPlant: null,
            worstPlant: null,
            bestScore: 0,
            worstScore: 100000,
            allScores: {},
            bestPlantDetail: null,
        },
        desert: {
            bestPlant: null,
            worstPlant: null,
            bestScore: 0,
            worstScore: 100000,
            allScores: {},
            bestPlantDetail: null,
        },
        grassLand: {
            bestPlant: null,
            worstPlant: null,
            bestScore: 0,
            worstScore: 100000,
            allScores: {},
            bestPlantDetail: null,
        },
        dryForest: {
            bestPlant: null,
            worstPlant: null,
            bestScore: 0,
            worstScore: 100000,
            allScores: {},
            bestPlantDetail: null,
        },
        rainForest: {
            bestPlant: null,
            worstPlant: null,
            bestScore: 0,
            worstScore: 100000,
            allScores: {},
            bestPlantDetail: null,
        },
    }

    for (var i = 0; i < biomeArray.length; i++) {

        for (var j = 0; j < testArray.length; j++) {
            let biome = biomeArray[i];
            let plant = clone(testArray[j]);

            for (var k = 0; k < numCycles; k++) {
                plant = growPLant(clone(plant), biome.sun, biome.water);
            }

            summary[biome.name].allScores[plant.id] = plant.mass;
            // console.log("plant", plant.id, "biome", biome.name, "mass", plant.mass);
            if(plant.mass > summary[biome.name].bestScore) {
                summary[biome.name].bestScore = plant.mass;
                summary[biome.name].bestPlant = plant.id;
                summary[biome.name].bestPlantDetail = plant;
            }

            if(plant.mass < summary[biome.name].worstScore) {
                summary[biome.name].worstScore = plant.mass;
                summary[biome.name].worstPlant = plant.id;
            }
        }

    }

    return {summary: summary, allPlants: testArray};
}

// export function newPlant() {
//     let plant = {
//         mass: random(1,300),
//         rootMass: random(1,100),
//         leafSize: random(1,10),
//     };
//
//     plant.rootMass = random(.1,.9) * plant.mass;
//     plant.foliageMass = plant.mass - plant.rootMass;
//
//     plant.baseThickness = Math.ceil(plant.foliageMass / random(10, 50));
//
//     plant.rootSpread = Math.round(random(1, plant.rootMass / 2));
//     plant.foliageSpread = Math.round(random(plant.baseThickness, plant.foliageMass / 2));
//
//
//     plant.clone = function() {
//         return  clone(plant);
//     }
//
//     plant.muClone = function() {
//         let muPlant = clone(plant);
//         return muPlant;
//     }
//
//     plant.rootLayer = generateRootLayer(plant);
//     plant.foliageLayer = generatefoliageLayer(plant);
//     plant.height = plant.foliageLayer.length;
//     plant.width = max(plant.foliageLayer);
//     plant.foliageWoodiness = Math.floor(plant.height / plant.baseThickness);
//
//     plant.lightGainArray = getLightGainArray(plant.foliageLayer, plant.width, plant.baseThickness);
//     plant.totalLight = 0;
//     for (var i = 0; i < plant.lightGainArray.length; i++) {
//         plant.totalLight += plant.lightGainArray[i];
//     }
//     plant.lightEfficiency = plant.totalLight / plant.foliageMass;
//     console.log("foliageLayer", plant.foliageLayer);
//     console.log("Foliage mass", plant.foliageMass);
//     console.log("Light Total", plant.totalLight);
//     console.log("Efficiency", plant.totalLight / plant.foliageMass);
//     console.log("------------------------------------------------");
//
//
//     return plant;
// }

function getLightGainArray(foliage, width, thickness) {
    let filterArray = []
    let stem = thickness < 3 ? thickness : thickness - 2;
    let array = [foliage[0]];

    for (var i = 1; i < foliage.length; i++) {
        array.push(0);
    }

    for (var j = stem; j < width; j++) {
        let filter = .9;
        let spread = j;

        // for (var k = foliage.length - 2; k > 0; k--) {
        //     let layer = foliage[k];
        //
        //     if(layer >= spread && filter > 0) {
        //         array[k] += filter;
        //         filter -= .1;
        //     }
        // }

        for (var k = 1; k < foliage.length; k++) {
            let layer = foliage[k];

            if(layer >= spread && filter > 0) {
                array[k] += filter;
                filter -= .1;
            }
        }
    }

    return array;
}




function growTrunkLayerTest(plant, growth) {

}



// function generateRootLayer(plant) {
//     let safety = 0;
//     let mass = clone(plant.rootMass);
//     let thickness = clone(plant.baseThickness);
//
//     let array = [];
//
//     while (mass > 0 && safety < 100) {
//         safety ++;
//         // console.log("round", safety);
//         let spread = random(thickness, plant.rootSpread);
//         spread = spread < mass ? spread : Math.ceil(mass);
//         array.push(spread);
//         mass -= spread;
//     }
//
//     return array;
// }
//
// function generatefoliageLayer(plant) {
//     let safety = 0;
//     let mass = clone(plant.foliageMass);
//     let thickness = clone(plant.baseThickness);
//
//     let array = [];
//
//     while (mass > 0 && safety < 100) {
//         safety ++;
//         // console.log("round", safety);
//         let spread = random(thickness, plant.foliageSpread);
//         spread = spread < mass ? spread : Math.ceil(mass);
//         array.push(spread);
//         mass -= spread;
//     }
//
//     return array;
// }


// function distributeAmount(amount, distArray) {
//     let distAmount = Math.round(amount / 10);
//     for (var i = 0; i < 10; i++) {
//
//         distArray[random(distArray.length - 1)] += distAmount;
//         amount -= distAmount;
//         if(amount <= 0) {
//             break;
//         }
//     }
//     console.log("distArray", distArray);
// }
//
// export function evolvePlant(startingPlant, seedCount) {
//     let bestScore = startingPlant.lightEfficiency;
//     let bestPlant = startingPlant;
//     let newPlants = [];
//     for (var i = 0; i < seedCount; i++) {
//         let plant = clone(startingPlant);
//         let availableMass = clone(plant.foliageMass);
//
//         // for (var j = 0; j < plant.foliageLayer.length; j++) {
//         //     let layer = plant.foliageLayer[j];
//         //     if(random(plant.foliageLayer.length) === plant.foliageLayer.length) {
//         //         // console.log("random mutation");
//         //         if(j > 0 && j < plant.foliageLayer.length - 1 && layer > plant.baseThickness) {
//         //             let addIndex = sample([j - 1, j + 1]);
//         //             plant.foliageLayer[addIndex] += 1;
//         //             plant.foliageLayer[j] -= 1;
//         //         }
//         //     }
//         // }
//
//         for (var j = 0; j < plant.foliageLayer.length; j++) {
//             let index = random(0, plant.foliageLayer.length - 1);
//             let amount = random(-1,1)
//             if(availableMass < startingPlant.foliageMass && amount === 1) {
//                 plant.foliageLayer[index] += 1;
//                 availableMass += 1;
//             } else if(plant.foliageLayer[index] > plant.baseThickness && amount === -1) {
//                 plant.foliageLayer[index] -= 1;
//                 availableMass -= 1;
//             }
//         }
//
//         plant.width = max(plant.foliageLayer);
//
//         plant.lightGainArray = getLightGainArray(plant.foliageLayer, plant.width, plant.baseThickness);
//         plant.totalLight = 0;
//
//         for (var k = 0; k < plant.lightGainArray.length; k++) {
//             plant.totalLight += plant.lightGainArray[k];
//         }
//         plant.lightEfficiency = plant.totalLight / plant.foliageMass;
//
//         newPlants.push(plant);
//         console.log("newPlants", newPlants);
//
//         if(plant.lightEfficiency > bestScore) {
//             bestScore = plant.lightEfficiency;
//             bestPlant = plant;
//         }
//
//     }
//
//     // console.log("newPlants", newPlants);
//     // console.log("bestPlant", bestPlant.foliageLayer);
//     // console.log("bestScore", bestScore);
//     // console.log("starting score", startingPlant.totalLight);
//     console.log("best plant", bestPlant.totalLight, bestPlant.foliageLayer, bestPlant.lightEfficiency);
//     return bestPlant;
// }
//
// export function testArray(array) {
//     let plant = {
//         foliageMass: sum(array),
//         foliageLayer: array,
//         width: max(array),
//         baseThickness: min(array),
//     }
//     console.log("plant.baseThickness", plant.baseThickness);
//     console.log("width", plant.width);
//
//     plant.lightGainArray = getLightGainArray(array, plant.width, plant.baseThickness);
//     plant.totalLight = sum(plant.lightGainArray);
//     // console.log("plant.totalLight", plant.totalLight);
//     plant.lightEfficiency = plant.totalLight / plant.foliageMass;
//     console.log("Test Array Results", plant.totalLight, plant.lightEfficiency);
//     return plant;
// }
