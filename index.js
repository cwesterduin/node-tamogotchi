const { getMaxListeners } = require("process");
const readline = require("readline");
const Pet = require("./pet.js");
const styles = require("./terminalStyles")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//user names pet and starts game
let myPet
function startGame() {
  rl.question(styles.warning("What is your pet called? "), (answer) => {
    myPet = new Pet(answer);
    //user interactions with pet begin
    interact();
  });
}

let timer
function interact() {

  if (myPet.hungerLevel === 0 || myPet.happinessLevel === 0) {
    gameOver(myPet)
    return;
  } else {
    clearInterval(timer)
    promptInput()
    timer = setInterval(() => {
      myPet.bored()
      myPet.hungry()
      console.log(styles.warning('\nhunger +1\nboredom +1'))
      interact()
    }, 5000);
  }
}

function promptInput() {
  rl.question(
    `What do you want to do with ${myPet.name}? (try: feed, play, [full]status) `,
    (answer) => {
      switch (answer) {
        case "feed":
          if (myPet.hungerLevel < 10) {
            console.log(styles.success("yum!"));
            myPet.feed();
            interact();
          } else {
            console.log(styles.fail(`${myPet.name} is full!`));
            interact();
          }
          break;
        case "play":
          if (myPet.happinessLevel < 10) {
            console.log(styles.success("fun!"));
            myPet.play();
            interact();
          } else {
            console.log(styles.fail(`${myPet.name} has had enough fun!`));
            interact();
          }
          break;
        case "status":
          console.log(myPet.status);
          interact();
          break;
        case "fullstatus":
          console.log(JSON.stringify(myPet));
          interact();
          break;
        default:
          console.log(styles.fail(`${myPet.name} doesn't know that one!`));
          interact();
      }
    }
  );
}

function gameOver(myPet) {
  clearInterval(timer)
  rl.close();
  myPet.hungerLevel === 0 && myPet.happinessLevel === 0 ?
    console.log(styles.fatal(`Oh no! ${myPet.name} died of general neglect.`))
  :
  myPet.hungerLevel === 0 ?
    console.log(styles.fatal(`Oh no! ${myPet.name} died of hunger.`))   
  :  console.log(styles.fatal(`Oh no! ${myPet.name} died of boredom.`))
}

startGame();
