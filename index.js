const readline = require("readline");
const Pet = require("./pet.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//user names pet
let myPet;
function namePet() {
  rl.question("What was your pet called? ", (answer) => {
    myPet = new Pet(answer);
    //user interacts with pet
    interact();
  });
}

function interact() {
  if (myPet.hungerLevel === 0 || myPet.happinessLevel === 0) {
    rl.close();
    console.log(`Oh no! ${myPet.name} is dead :(`);
    return;
  } else {
    rl.question(
      `What do you want to do with ${myPet.name}? (try: feed, play, [full]status) `,
      (answer) => {
        switch (answer) {
          case "feed":
            if (myPet.hungerLevel < 10) {
              console.log("yum!");
              myPet.feed();
              interact();
            } else {
              console.log(`${myPet.name} is full!`);
              interact();
            }
            break;
          case "play":
            if (myPet.happinessLevel < 10) {
              console.log("fun!");
              myPet.play();
              interact();
            } else {
              console.log(`${myPet.name} has had enough fun!`);
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
            console.log(`${myPet.name} doesn't know that one!`);
            interact();
        }
      }
    );
  }
}

namePet();
