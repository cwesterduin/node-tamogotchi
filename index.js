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


//user names pet
async function namePet() {
    const name = await rl.question('Name your pet? ', (answer) => {
        myPet = new Pet(answer)
        })
}

//user interacts with pet
async function inputFunc() {
    await namePet()
    rl.on('line', (line) => {
        console.log(`${myPet.name} says: ${line}`);
    });
}

inputFunc()
