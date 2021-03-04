const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let myPet
class Pet {
  constructor(name, hungerLevel = 5, happinessLevel = 5) {
    this.name = name;
    this.hungerLevel = hungerLevel;
    this.happinessLevel = happinessLevel;
  }
  feed() {
    this.hungerLevel++;
  }
  play() {
    this.happinessLevel++;
    this.hungerLevel--;
  }
  get status() {
    let hunger, happiness
    switch (true) {
      case this.hungerLevel === 10:
        hunger = "full";
        break;
      case this.hungerLevel > 0 && this.hungerLevel < 10:
        hunger = "hungry";
        break;
      default:
        hunger = "dead from hunger";
    }
    switch (true) {
        case this.happinessLevel === 10:
        happiness = "happy";
          break;
        case this.happinessLevel > 0 && this.hungerLevel < 10:
            happiness = "unhappy";
          break;
        default:
        happiness = "dead from boredom";
      }
    return `${myPet.name} is ${hunger} and ${happiness}.`
  }
}

//user names pet
function namePet() {
    rl.question('What your pet called? ', (answer) => {
        myPet = new Pet(answer)
        //user interacts with pet
        interact()
    });
}

function interact() {
    rl.question(`What do you want to do with ${myPet.name}, (try: feed, play, [full]status)? `, (answer) => {
        switch(answer) {
            case 'feed':
                if (myPet.hungerLevel < 10) {
                    console.log('yum!')
                    myPet.feed()
                    interact()
                }
                else {
                    console.log(`${myPet.name} is full!`)
                    interact() 
                }
              break;
            case 'play':
                if (myPet.happinessLevel < 10) {
                    console.log('fun!')
                    myPet.play()
                    interact()
                }
                else {
                    console.log(`${myPet.name} has had enough fun!`)
                    interact() 
                }
              break;
            case 'status':
                console.log(myPet.status)
                interact()
             break;
             case 'fullstatus':
                console.log(JSON.stringify(myPet))
                interact()
             break;
            default :
                console.log(`${myPet.name} doesn't know that one!`)
          }
    });
}

namePet()
