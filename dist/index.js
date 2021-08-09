#!/usr/bin/env node 
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var clear_1 = __importDefault(require("clear"));
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var version = require('../package.json').version;
console.log(process.argv);
if (!process.argv.slice(2).length) {
    clear_1.default(); // To clear the terminal
    console.log(chalk_1.default.red(figlet_1.default.textSync('Scrapix', { horizontalLayout: 'full' })));
}
commander_1.program.version(chalk_1.default.green("Version: " + version));
commander_1.program.parse(process.argv);
