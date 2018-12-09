import random from "lodash.random";


let newPlantCount = 0

export function createNewPlant() {
    let newPlant = {
        id: newPlantCount,
        foodType: random(1,8),
        idealWater: random(1,100),
        waterTolerance: random(.3,.9),
        idealTemp: random(1,100),
        tempTolerance: random(.3,.9),
    };
    newPlant.size = random(6,newPlant.idealWater);
    newPlant.health = 100;
    newPlant.height = Math.ceil(newPlant.size / 2);
    newPlant.shadow1 = newPlant.height;
    newPlant.shadow2 = Math.floor(newPlant.shadow1 / 1.5);
    newPlant.zIndex = newPlant.height;
    newPlant.g = random(75, 200);
    newPlant.b = random(0, (Math.floor(newPlant.g * .9)));
    newPlant.r = random(0, (Math.floor((100 - newPlant.idealWater) * 2)));
    newPlant.color = `rgba(${newPlant.r}, ${newPlant.g}, ${newPlant.b}, `;
    newPlant.foodAmount = random(0,3) * newPlant.size;
    newPlant.spreadRate = random(1,3) * newPlant.size;

    newPlantCount ++;
    return newPlant;
}

export function getInitialPlants(num) {
    let plantList = [];
    for (var i = 0; i < num; i++) {
        plantList.push(createNewPlant());
    }

    return plantList;
}

export const biomeType = [
  ["desert0", "desert1", "desert2", "desert3", "desert4", "desert5"],
  ["savanah0", "savanah1", "savanah2", "savanah3", "savanah4", "savanah5"],
  ["plain0", "plain1", "plain2", "plain3", "plain4", "plain5"],
  ["grassLand0", "grassLand1", "grassLand2", "grassLand3", "grassLand4", "grassLand5"],
  ["forest0", "forest1", "forest2", "forest3", "forest4", "forest5"]
]

export const waterType = ["water0","water1","water2","water3","water4","water5"];

export const biomeColors = [
    ["rgba(232, 207, 107, ","rgba(227, 192, 102, ","rgba(212, 175, 79, ","rgba(200, 159, 80, ","rgba(190, 143, 72, ","rgba(175, 124, 64, "],
    ["rgba(222, 232, 107, ","rgba(208, 218, 95, ","rgba(184, 209, 85, ","rgba(174, 198, 82, ","rgba(167, 181, 83, ","rgba(162, 137, 62, "],
    ["rgba(188, 228, 90, ","rgba(179, 218, 82, ","rgba(168, 205, 75, ","rgba(159, 193, 73, ","rgba(153, 182, 80, ","rgba(134, 123, 92, "],
    ["rgba(163, 228, 90, ","rgba(153, 217, 81, ","rgba(144, 205, 75, ","rgba(134, 193, 68, ","rgba(125, 180, 64, ","rgba(95, 99, 90, "],
    ["rgba(130, 228, 90, ","rgba(109, 209, 68, ","rgba(107, 200, 69, ","rgba(104, 187, 70, ","rgba(101, 172, 71, ","rgba(123, 130, 121, "]
];

export const grassColors = ["rgba(227, 193, 93, ", "rgba(222, 198, 97, ", "rgba(222, 213, 97, ", "rgba(212, 222, 97, ", "rgba(193, 222, 97, ", "rgba(182, 222, 97, ", "rgba(163, 222, 97, ", "rgba(152, 222, 97, ", "rgba(133, 222, 97, ", "rgba(110, 222, 97, ", "rgba(90, 214, 95, ", "rgba(80, 203, 103, "];
export const grassColorValues = [{r:227,g:193,b:93},{r:222,g:198,b:97},{r:222,g:213,b:97},{r:212,g:222,b:97},{r:193,g:222,b:97},{r:182,g:222,b:97},{r:163,g:222,b:97},{r:152,g:222,b:97},{r:133,g:222,b:97},{r:110,g:222,b:97},{r:90,g:214,b:95},{r:80,g:203,b:103}];
export const soilColors = ["rgba(212, 166, 105, ", "rgba(189, 142, 79, ", "rgba(189, 128, 79, ", "rgba(156, 106, 68, ", "rgba(136, 101, 74, ", "rgba(131, 101, 78, ", "rgba(113, 91, 74, "];

export const biomeData = {
  desert0: {
    name: "Low Desert",
    color: "rgba(232, 207, 107, ",
    plants: ["cactus", "mesquite"],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  desert1: {
    name: "Desert",
    color: "rgba(227, 192, 102, ",
    plants: ["cactus", "yuca"],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  desert2: {
    name: "High Desert",
    color: "rgba(212, 175, 79, ",
    plants: ["cactus", "mesquite", "yuca"],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  desert3: {
    name: "Desert Hills",
    color: "rgba(200, 159, 80, ",
    plants: ["mesquite", "yuca"],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  desert4: {
    name: "Barren Mountain",
    color: "rgba(190, 143, 72, ",
    plants: [],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  desert5: {
    name: "Barren Mountain Peak",
    color: "rgba(175, 124, 64, ",
    plants: [],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  savanah0: {
    name: "Low Savanah",
    color: "rgba(222, 232, 107, ",
    plants: ["cactus", "mesquite"],
    trees: ["dryForest1","dryForest2","dryForest3","dryForest4"],
    minTrees: 0,
    maxTrees: 3,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  savanah1: {
    name: "Savanah",
    color: "rgba(208, 218, 95, ",
    plants: ["cactus", "yuca"],
    trees: ["dryForest1","dryForest2","dryForest3","dryForest4"],
    minTrees: 0,
    maxTrees: 3,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  savanah2: {
    name: "High Savanah",
    color: "rgba(184, 209, 85, ",
    plants: ["cactus", "mesquite", "yuca"],
    trees: ["dryForest1","dryForest2","dryForest3","dryForest4"],
    minTrees: 0,
    maxTrees: 3,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  savanah3: {
    name: "Veld",
    color: "rgba(174, 198, 82, ",
    plants: ["mesquite", "yuca"],
    trees: ["dryForest1","dryForest2","dryForest3","dryForest4"],
    minTrees: 0,
    maxTrees: 2,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  savanah4: {
    name: "Arid Mountain",
    color: "rgba(167, 181, 83, ",
    plants: [],
    trees: ["dryForest1","dryForest2","dryForest3","dryForest4"],
    minTrees: 0,
    maxTrees: 1,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  savanah5: {
    name: "Arid Mountain Peak",
    color: "rgba(162, 137, 62, ",
    plants: [],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  plain0: {
    name: "Plains",
    color: "rgba(188, 228, 90, ",
    plants: ["cactus", "mesquite"],
    trees: ["broadLeaf1","broadLeaf2","broadLeaf3","broadLeaf4"],
    minTrees: 0,
    maxTrees: 3,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  plain1: {
    name: "Praire",
    color: "rgba(179, 218, 82, ",
    plants: ["cactus", "yuca"],
    trees: ["broadLeaf1","broadLeaf2","broadLeaf3","broadLeaf4"],
    minTrees: 0,
    maxTrees: 3,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  plain2: {
    name: "High Praire",
    color: "rgba(168, 205, 75, ",
    plants: ["cactus", "mesquite", "yuca"],
    trees: ["broadLeaf1","broadLeaf2","broadLeaf3","broadLeaf4"],
    minTrees: 0,
    maxTrees: 3,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  plain3: {
    name: "Praire Hills",
    color: "rgba(159, 193, 73, ",
    plants: ["mesquite", "yuca"],
    trees: ["conifer1", "conifer2", "conifer3", "conifer4"],
    minTrees: 0,
    maxTrees: 3,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  plain4: {
    name: "Dry Mountain",
    color: "rgba(153, 182, 80, ",
    plants: [],
    trees: [],
    minTrees: 0,
    maxTrees: 2,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  plain5: {
    name: "Dry Mountain Peak",
    color: "rgba(134, 123, 92, ",
    plants: [],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  grassLand0: {
    name: "Flood Plain",
    color: "rgba(163, 228, 90, ",
    plants: ["cactus", "mesquite"],
    trees: ["jungle1","jungle2","jungle3","jungle4"],
    minTrees: 3,
    maxTrees: 15,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  grassLand1: {
    name: "Meadow",
    color: "rgba(153, 217, 81, ",
    plants: ["cactus", "yuca"],
    trees: ["broadLeaf1","broadLeaf2","broadLeaf3","broadLeaf4"],
    minTrees: 1,
    maxTrees: 15,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  grassLand2: {
    name: "High Meadow",
    color: "rgba(144, 205, 75, ",
    plants: ["cactus", "mesquite", "yuca"],
    trees: ["conifer1", "conifer2", "conifer3", "conifer4"],
    minTrees: 1,
    maxTrees: 10,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  grassLand3: {
    name: "Meadow Hills",
    color: "rgba(134, 193, 68, ",
    plants: ["mesquite", "yuca"],
    trees: ["conifer1", "conifer2", "conifer3", "conifer4"],
    minTrees: 1,
    maxTrees: 10,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  grassLand4: {
    name: "Mountain",
    color: "rgba(125, 180, 64, ",
    plants: [],
    trees: [],
    minTrees: 1,
    maxTrees: 5,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  grassLand5: {
    name: "Mountain Peak",
    color: "rgba(95, 99, 90, ",
    plants: [],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  forest0: {
    name: "Mangrove",
    color: "rgba(130, 228, 90, ",
    plants: ["cactus", "mesquite"],
    trees: ["jungle1","jungle2","jungle3","jungle4"],
    minTrees: 30,
    maxTrees: 40,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  forest1: {
    name: "Jungle",
    color: "rgba(109, 209, 68, ",
    plants: ["cactus", "yuca"],
    trees: ["jungle1","jungle2","jungle3","jungle4"],
    minTrees: 40,
    maxTrees: 50,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  forest2: {
    name: "Deciduous Forest",
    color: "rgba(107, 200, 69, ",
    plants: ["cactus", "mesquite", "yuca"],
    minTrees: 30,
    maxTrees: 40,
    trees: ["broadLeaf1","broadLeaf2","broadLeaf3","broadLeaf4"],
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  forest3: {
    name: "Conifer Forest",
    color: "rgba(104, 187, 70, ",
    plants: ["mesquite", "yuca"],
    trees: ["conifer1", "conifer2", "conifer3", "conifer4"],
    minTrees: 30,
    maxTrees: 40,
    smallAnimals: [""],
  },
  forest4: {
    name: "Mountain Forest",
    color: "rgba(101, 172, 71, ",
    plants: [],
    trees: ["conifer1", "conifer2", "conifer3", "conifer4"],
    minTrees: 10,
    maxTrees: 30,
    smallAnimals: ["Grey Squirrel", "Bobcat", "Red Fox", "Coyote"],
    birds: ["Robin"]
  },
  forest5: {
    name: "Mountain Forest Peak",
    color: "rgba(123, 130, 121, ",
    plants: [],
    trees: [],
    minTrees: 0,
    maxTrees: 0,
    smallAnimals: ["Desert Hare", "Desert Lizard", "Sand Adder", "Sand Fox"],
  },
  water0: {
    name: "Sea",
    color: "rgba(50, 80, 168, ",
    plants: [],
    trees: [],
    smallAnimals: [],
  },
  water1: {
    name: "Estuary",
    color: "rgba(50, 101, 168, ",
    plants: [],
    trees: [],
    smallAnimals: [],
  },
  water2: {
    name: "River",
    color: "rgba(50, 119, 168, ",
    plants: [],
    trees: [],
    smallAnimals: [],
  },
  water3: {
    name: "Stream",
    color: "rgba(41, 120, 145, ",
    plants: [],
    trees: [],
    smallAnimals: [],
  },
  water4: {
    name: "Mountain Stream",
    color: "rgba(43, 135, 156, ",
    plants: [],
    trees: [],
    smallAnimals: [],
  },
  water5: {
    name: "Mountian Cascade",
    color: "rgba(49, 146, 168, ",
    plants: [],
    trees: [],
    smallAnimals: [],
  },
  error: {
    color: "rgba(224, 24, 24, ",
  }
}

// export const smallAnimals = {
//   greySquirrel: {
//     name: "Grey Squirrel",
//     type: "smallHerb",
//     size: 1,
//     eats: [conifer1,conifer2,conifer3,broadLeaf1],
//   },
//   redSquirrel: {
//     name: "Red Squirrel",
//     type: "smallHerb",
//     size: 1,
//     eats: [broadLeaf1, broadLeaf2, broadLeaf3, broadLeaf4],
//   },
//   brownSquirrel: {
//     name: "Brown Squirrel",
//     type: "smallHerb",
//     size: 1,
//     eats: [jungle1, jungle3, jungle4],
//   },
//   cottontail: {
//     name: "Cottontail",
//     type: "smallHerb",
//     size: 1,
//     eats: [jungle1, jungle3, jungle4],
//   },
//
//
//
//
//   redFox: {
//     name: "Red Fox",
//     type: "smallPred",
//     size: 2,
//     eats: [greySquirrel, redSquirrel],
//   },
//   bobcat: {
//     name: "Bobcat",
//     type: "smallPred",
//     size: 2,
//     eats: [greySquirrel,redSquirrel],
//   },
//   lynx: {
//     name: "Lynx",
//     type: "smallPred",
//     size: 2,
//     eats: [greySquirrel, snowShoeHare],
//   },
//
// }
export const largeAnimals = {
  mammoth: {
    name: "Mammoth",
    size: 6,
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
    size: 5,
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
    size: 4,
    color: "brown",
    waterLevelMin: 20,
    waterLevelMax: 70,
    elevationMin: 1,
    elevationMax: 60,
    chance: 20,
    walkSpeed: 10,
    runSpeed: 5
  },
  dinotherium: {
    name: "Dinotherium",
    size: 7,
    color: "brown",
    waterLevelMin: 10,
    waterLevelMax: 40,
    elevationMin: 1,
    elevationMax: 40,
    chance: 10,
    walkSpeed: 10,
    runSpeed: 5
  },
  indricotherium: {
    name: "Indricotherium",
    size: 8,
    color: "brown",
    waterLevelMin: 10,
    waterLevelMax: 30,
    elevationMin: 1,
    elevationMax: 30,
    chance: 10,
    walkSpeed: 10,
    runSpeed: 5
  },
  wolf: {
    name: "Wolf",
    size: 3,
    color: "brown",
    waterLevelMin: 20,
    waterLevelMax: 70,
    elevationMin: 1,
    elevationMax: 80,
    chance: 10,
    walkSpeed: 10,
    runSpeed: 5
  },
  direWolf: {
    name: "Dire Wolf",
    size: 4,
    color: "brown",
    waterLevelMin: 30,
    waterLevelMax: 70,
    elevationMin: 1,
    elevationMax: 70,
    chance: 10,
    walkSpeed: 10,
    runSpeed: 5
  },
}

// export const plantTypes = {
//   choya: {
//     name: "Choya",
//     maxHealth: 20,
//     health: 20,
//     size: 3,
//     color: rgb(92, 129, 102),
//     food: 4,
//     spreadRate: 10,
//     spread: 0,
//     waterLevel: 2,
//     waterLevelTolerance: 1,
//     elevation: 1,
//     elevationTolerance: 1,
//   },
//   suguaro: {
//     name: "Suguaro",
//     maxHealth: 20,
//     health: 20,
//     size: 4,
//     color: rgb(116, 161, 98),
//     food: 2,
//     spreadRate: 20,
//     spread: 0,
//     waterLevel: 2,
//     waterLevelTolerance: 1,
//     elevation: 10,
//     elevationTolerance: 1,
//   },
//   barrelCactus: {
//     name: "Barrel Cactus",
//     maxHealth: 20,
//     health: 20,
//     size: 2,
//     color: rgb(114, 149, 119),
//     food: 0,
//     spreadRate: 10,
//     spread: 0,
//     waterLevel: 5,
//     waterLevelTolerance: 1,
//     elevation: 1,
//     elevationTolerance: 1,
//   },
//   yucca: {
//     name: "Yucca",
//     maxHealth: 20,
//     health: 20,
//     size: 3,
//     color: rgb(165, 179, 126),
//     food: 1,
//     spreadRate: 10,
//     spread: 0,
//     waterLevel: 10,
//     waterLevelTolerance: 1,
//     elevation: 60,
//     elevationTolerance: 1,
//   },
//   centuryPlant: {
//     name: "Century Plant",
//     maxHealth: 20,
//     health: 20,
//     size: 3,
//     color: rgb(126, 179, 155),
//     food: 1,
//     spreadRate: 10,
//     spread: 0,
//     waterLevel: 10,
//     waterLevelTolerance: 1,
//     elevation: 30,
//     elevationTolerance: 10,
//   },
//   aloe: {
//     name: "Aloe",
//     maxHealth: 20,
//     health: 20,
//     size: 3,
//     color: rgb(108, 161, 137),
//     food: 1,
//     spreadRate: 10,
//     spread: 0,
//     waterLevel: 10,
//     waterLevelTolerance: 1,
//     elevation: 1,
//     elevationTolerance: 1,
//   },
//   creasote: {
//     name: "Creasote Bush",
//     maxHealth: 20,
//     health: 20,
//     size: 4,
//     color: rgb(108, 161, 137),
//     food: 1,
//     spreadRate: 10,
//     spread: 0,
//     waterLevel: 15,
//     waterLevelTolerance: 1,
//     elevation: 1,
//     elevationTolerance: 1,
//   },
//   creasote: {
//     name: "Creasote Bush",
//     maxHealth: 20,
//     health: 20,
//     size: 4,
//     color: rgb(108, 161, 137),
//     food: 1,
//     spreadRate: 10,
//     spread: 0,
//     waterLevel: 15,
//     waterLevelTolerance: 1,
//     elevation: 1,
//     elevationTolerance: 1,
//   },
// }

export const treeTypes = {
  jungle1: {
    name: "Mahogany",
    size: 28,
    color: "rgba(25, 89, 19, ",
  },
  jungle2: {
    name: "Teak",
    size: 30,
    color: "rgba(37, 122, 29, ",
  },
  jungle3: {
    name: "Kapok",
    size: 15,
    color: "rgba(17, 54, 17, ",
  },
  jungle4: {
    name: "Jungle Palm",
    size: 12,
    color: "rgba(45, 105, 45, ",
  },

  broadLeaf1: {
    name: "Oak",
    size: 24,
    color: "rgba(24, 84, 12, ",
  },
  broadLeaf2: {
    name: "Beech",
    size: 11,
    color: "rgba(40, 124, 23, ",
  },
  broadLeaf3: {
    name: "Apple",
    size: 9,
    color: "rgba(5, 131, 6, ",
  },
  broadLeaf4: {
    name: "Elm",
    size: 12,
    color: "rgba(3, 74, 3, ",
  },

  conifer1: {
    name: "Pine",
    size: 10,
    color: "rgba(17, 75, 29, ",
  },
  conifer2: {
    name: "Fir",
    size: 19,
    color: "rgba(13, 46, 25, ",
  },
  conifer3: {
    name: "Spruce",
    size: 14,
    color: "rgba(8, 61, 36, ",
  },
  conifer4: {
    name: "Cedar",
    size: 12,
    color: "rgba(14, 52, 6, ",
  },

  dryForest1: {
    name: "Acacia",
    size: 10,
    color: "rgba(46, 89, 8, ",
  },
  dryForest2: {
    name: "Thorn Tree",
    size: 12,
    color: "rgba(84, 79, 29, ",
  },
  dryForest3: {
    name: "Fan Palm",
    size: 14,
    color: "rgba(79, 145, 21, ",
  },
  dryForest4: {
    name: "Tamarask",
    size: 9,
    color: "rgba(79, 111, 51, ",
  }
}

export const cropArray = ["wheat","oats","barley","lentils","rice","millet","sorgum","taro"];

export const cropData = {
  "wheat": {
    name: "wheat",
    optTemp: 50,
    tempRange: 10,
    optWater: 40,
    waterRange: 10,
    color: "rgba(224, 186, 48,",
    fpa: 500,
    catagory: 1
  },
  "oats": {
    name: "oats",
    optTemp: 40,
    tempRange: 10,
    optWater: 45,
    waterRange: 10,
    color: "rgba(176, 133, 36,",
    fpa: 400,
    catagory: 1
  },
  "barley": {
    name: "barley",
    optTemp: 30,
    tempRange: 10,
    optWater: 40,
    waterRange: 10,
    color: "rgba(142, 101, 11,",
    fpa: 500,
    catagory: 1
  },
  "lentils": {
    name: "lentils",
    optTemp: 40,
    tempRange: 10,
    optWater: 30,
    waterRange: 10,
    color: "rgba(56, 130, 40,",
    fpa: 550,
    catagory: 1
  },
  "rice": {
    name: "rice",
    optTemp: 50,
    tempRange: 10,
    optWater: 80,
    waterRange: 20,
    color: "rgba(32, 163, 29,",
    fpa: 500,
    catagory: 1,
    aquatic: true
  },
  "millet": {
    name: "millet",
    optTemp: 50,
    tempRange: 10,
    optWater: 20,
    waterRange: 10,
    color: "rgba(182, 130, 41,",
    fpa: 500,
    catagory: 1
  },
  "sorgum": {
    name: "sorgum",
    optTemp: 60,
    tempRange: 10,
    optWater: 60,
    waterRange: 10,
    color: "rgba(158, 154, 4,",
    fpa: 500,
    catagory: 1
  },
  "taro": {
    name: "taro",
    optTemp: 80,
    tempRange: 20,
    optWater: 80,
    waterRange: 20,
    color: "rgba(7, 98, 16,",
    fpa: 500,
    catagory: 1,
    aquatic: true
  },
}
