const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let myPet
class Pet{
    constructor(name, hungerLevel=10, happinessLevel=0){
        this.name = name;
        this.hungerLevel = hungerLevel;
        this.happinessLevel = happinessLevel;
    }
}


