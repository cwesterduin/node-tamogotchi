const chalk = require('chalk');

const warning = (string) => chalk.bgRed.bold(string)
const fatal = (string) => chalk.bgRedBright.bold(string)
const fail = (string) => chalk.bgYellow.bold(string)
const success = (string) => chalk.bgGreen.bold(string)

module.exports = {
    warning,
    fatal,
    fail,
    success
}