import sample from "lodash.sample";
import random from "lodash.random";

const vowels = ["a","e","i","o","u"];
const constanants = ["b","c","d","f","g","h","j","k","l","m","n","p","qu","r","s","t","v","w","x","y","z"];
const vowelSets = [];
const bridges = [];

let namePatterns = [];

export function getName() {

  for (var i = 0; i < 20; i++) {
    let v1 = sample(vowels);
    let v2 = sample(vowels);
    let c1 = sample(constanants);
    let c2 = sample(constanants);
    let c3 = sample(constanants);
    const pat1 = `${v1}${c1}${c2}${v2}${c3}`
    console.log(pat1);
  }
}

export function getLanguage() {
  let commonVowels = [];
  let unCommonVowels = [];
  let rareVowels = [];
  let commonConstanants = [];
  let unCommonConstanants = [];
  let rareConstanants = [];

  for (var i = 0; i < vowels.length; i++) {
    let rand = random(10);
    let vowel = vowels[i];
    if (rand < 5) {
      commonVowels.push(vowel);
    }
    else if (rand < 7) {
      unCommonVowels.push(vowel);
    }
    else if (rand < 9) {
      rareVowels.push(vowel);
    }
  }

  for (var i = 0; i < constanants.length; i++) {
    let rand = random(10);
    let constanant = constanants[i];
    if (rand < 5) {
      commonConstanants.push(constanant);
    }
    else if (rand < 7) {
      unCommonConstanants.push(constanant);
    }
    else if (rand < 9) {
      rareConstanants.push(constanant);
    }
  }
  let language = {
    commonVowels: commonVowels,
    unCommonVowels: unCommonVowels,
    rareVowels: rareVowels,
    commonConstanants: commonConstanants,
    unCommonConstanants: unCommonConstanants,
    rareConstanants: rareConstanants,
    vowelSets: [],
    constanantSets: [],
    bridges: []
  }

  language.getName = function() {
    
  }

  return language;
}
