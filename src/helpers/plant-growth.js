import sample from "lodash.sample";
import random from "lodash.random";
import round from "lodash.round";
import clone from "lodash.clone";
import max from "lodash.max";
import min from "lodash.min";
import sum from "lodash.sum";

let count = 0;

let plantConsts = {
    "softTree": {
        woodiness: 5,
        maxAge: 100
    },
    "mediumTree": {
        woodiness: 7,
        maxAge: 100
    },
    "hardTree": {
        woodiness: 10,
        maxAge: 100
    },
    "softPlant": {
        woodiness: 1,
        maxAge: 100
    },
    "meduimPlant": {
        woodiness: 2,
        maxAge: 100
    },
    "hardPlant": {
        woodiness: 4,
        maxAge: 100
    },
}

export function constPlant(name) {

    return newPlant(0, plantConsts[name]);
}

export function newPlant(growthCycles, plantConst) {
    let woodiness = (plantConst && plantConst.woodiness) || random(1,10);
    let maxAge = (plantConst && plantConst.maxAge) || random(10,100);

    let plant = {
        woodiness: woodiness,
        maxAge: maxAge,
        age: 0,
        mass: 2,
        height: 1,
        trunkLayer: [
            {
                level: 0,
                width: 1,
                trunkWidth: 1,
                gain: 0
            }
        ],
        rootLayer: [
            {
                level: 0,
                width: 1,
                gain: 0
            }
        ],
        trunkMass: 1,
        leafMass: 0,
        rootMass: 1,
        trunkWidth: 1,

        //Used for testing display
        energyGain: 0,
        trunkGain: 0,
        waterGain: 0,
        trunkGain: 0,
        energyToWaterRatio: 0,

        energy: 0,
        waterSurplus: 0,
        waterdeficit: 0,
        leafStates: [1,1,1,1],
        hasLeaves: true,
    }
    plant.trunkCost = plant.woodiness / 5;
    plant.waterSurplusMax = round((plant.trunkMass * plant.trunkCost) / 2 + plant.rootMass / 2);
    //Amount one layer of trunk can spread below the layer below
    plant.maxSpread = round(plant.woodiness / 2);

    console.log("Start plant", plant);

    for (var i = 0; i < growthCycles; i++) {
        plant = growPlant(plant);
    }

    console.log("End plant", plant);

    return plant;
}

//waterNeed = trunkMass / woodiness + rootMass /10
//energy - devided between growing trunk and growing roots - plant.mass / 20
// - if waterdeficit - rootGrowth + waterdeficit
// - if waterSurplus - energyGrowth to fill surplus rest to root

export function growPlant(startingPlant, sun, water) {
    console.log("***************************************");
    let plant = clone(startingPlant);
    console.log("plant.energy", plant.energy);
    let energyGain = getEnergy(plant, sun);
    console.log("energyGain", energyGain);
    let waterGain = getWater(plant, water);
    plant.energyGain = energyGain;
    plant.waterGain = waterGain;

    let waterNeed = round((plant.leafMass / (plant.woodiness / 2)) + (plant.rootMass / 10), 2);
    let availableWater = waterGain + plant.waterSurplus;
    // console.log("availableWater", availableWater, "waterNeed", waterNeed);
    let netWater = availableWater - waterNeed;

    //Water storage
    let trunkGrowth = energyGain;
    let rootGrowth = waterGain;

    plant.rootGain = rootGrowth;
    plant.trunkGain = trunkGrowth;

    plant.rootLayer = growRootLayer(plant, rootGrowth);
    plant.trunkLayer = growTrunkLayer(plant, trunkGrowth);

    return plant;
}

// export function growPlant(startingPlant, sun, water) {
//     console.log("***************************************");
//     let plant = clone(startingPlant);
//     let energyGain = getEnergy(plant, sun);
//     let waterGain = getWater(plant, water);
//     plant.energyGain = energyGain;
//     plant.waterGain = waterGain;
//     console.log("waterGain", waterGain, "energyGain", energyGain);
//
//     let growthGain = energyGain > waterGain ? waterGain : energyGain;
//     console.log("growthGain", growthGain);
//     //Water storage
//     let energyToWaterRatio = energyGain / waterGain;
//     let baseEnergyNeed = waterGain / (energyGain + waterGain);
//     console.log("baseEnergyNeed", baseEnergyNeed, "trunkCost", plant.trunkCost);
//     let baseEnergy = growthGain * baseEnergyNeed;
//     let adjustedEnergy = baseEnergy * plant.trunkCost;
//     let energyGrowth = adjustedEnergy > growthGain ? growthGain : adjustedEnergy;
//     let waterGrowth = growthGain - energyGrowth;
//
//     console.log("energyToWaterRatio", energyToWaterRatio, "waterGrowth", waterGrowth, "energyGrowth", energyGrowth);
//     plant.rootGain = waterGrowth;
//     plant.trunkGain = energyGrowth;
//     plant.energyToWaterRatio = energyToWaterRatio;
//
//     plant.rootLayer = growRootLayer(plant, waterGrowth);
//     plant.trunkLayer = growTrunkLayer(plant, energyGrowth);
//
//     return plant;
// }

function getEnergy(plant, sun) {
    let totalGain = 0;
    for (var i = 0; i < plant.trunkLayer.length; i++) {
        let layer = plant.trunkLayer[i];
        let sunLevel = sun[i] || 1;
        let leafWidth = layer.width - (plant.trunkWidth - 1);
        if(i === plant.trunkLayer.length - 1) {
            leafWidth = layer.width;
        } else if(leafWidth <= 0) {
            leafWidth = 1;
        }
        let layerGain = leafWidth * sunLevel;
        console.log("layerWidth", layer.width, "trunkWidth", plant.trunkWidth, "sunLevel", sunLevel,"leafWidth", leafWidth, "layerGain", layerGain);

        layer.gain = layerGain;
        totalGain += layerGain;
    };

    totalGain += plant.energy;
    plant.energy = 0;

    return round(totalGain, 2);
}

function getWater(plant, water) {
    let totalGain = 0;
    for (var i = 0; i < plant.rootLayer.length; i++) {
        let layerGain = 0;
        let layer = plant.rootLayer[i];
        let waterLevel = water[i] || 0;

        layerGain = layer.width * waterLevel;
        layer.gain = layerGain;
        totalGain += layerGain;
    };

    return round(totalGain, 2);
}

function growRootLayer(plant, waterGrowth) {
    let rootArray = clone(plant.rootLayer);
    let newLayer = {
        layer: rootArray.length,
        width: waterGrowth,
        gain: waterGrowth,
    }
    plant.rootMass += waterGrowth;
    rootArray.push(newLayer);

    return rootArray;
}

function growTrunkLayer(plant, trunkGrowth) {
    let trunkArray = clone(plant.trunkLayer);

    if(trunkGrowth <= 0) {
        return trunkArray;
    }

    let minWidthForHeight = (trunkArray.length / plant.woodiness) * 2;
    console.log("minWidthForHeight", minWidthForHeight);

    //Check to make sure the plants width can support it's height. If not, add width
    if(plant.trunkWidth < minWidthForHeight) {
        console.log("adding to trunk", trunkGrowth);
        for (var i = 0; i < trunkArray.length; i++) {
            console.log("layer", i, "width", trunkArray[i].width, "min", minWidthForHeight);
            if(trunkArray[i].width < minWidthForHeight) {
                console.log("building trunk");
                if(trunkGrowth <= 0) {
                    console.log("breaking before trunk full", trunkGrowth);
                    return trunkArray;
                }
                let needed = minWidthForHeight - trunkArray[i].width;

                if (needed > trunkGrowth) {
                    trunkArray[i].width += trunkGrowth;
                    return trunkArray;
                }
                trunkArray[i].width += needed;
                trunkGrowth -= needed;
            }
        }
        plant.trunkWidth = minWidthForHeight;
    }

    if(trunkGrowth >= 1) {
        console.log("adding height", trunkGrowth);
        let possibleSpread = trunkArray[trunkArray.length - 1].width + plant.maxSpread;
        let spread = possibleSpread > trunkGrowth ? trunkGrowth : possibleSpread;
        let newLayer = {
            layer: trunkArray.length,
            width: spread,
            trunkWidth: null,
            gain: null
        }

        plant.trunkMass += spread;
        plant.leafMass = plant.trunkMass - (plant.trunkLayer.length * plant.trunkWidth);
        trunkArray.push(newLayer);
    }

    plant.energy += trunkGrowth;

    return trunkArray;
}
