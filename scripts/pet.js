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
    return statusMessage(this.hungerLevel, this.happinessLevel, this.name);
  }
}

function statusMessage(hungerLevel, happinessLevel, name) {
  let hunger, happiness;
  switch (true) {
    case hungerLevel === 10:
      hunger = "full";
      break;
    case hungerLevel > 0 && hungerLevel < 10:
      hunger = "hungry";
      break;
    default:
      hunger = "dead from hunger";
  }
  switch (true) {
    case happinessLevel === 10:
      happiness = "happy";
      break;
    case happinessLevel > 0 && hungerLevel < 10:
      happiness = "unhappy";
      break;
    default:
      happiness = "dead from boredom";
  }
  return `${name} is ${hunger} and ${happiness}.`;
}

module.exports = Pet;
