(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (process){(function (){
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

}).call(this)}).call(this,require('_process'))
},{"./pet.js":4,"_process":2,"readline":1}],4:[function(require,module,exports){
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

},{}]},{},[3]);
