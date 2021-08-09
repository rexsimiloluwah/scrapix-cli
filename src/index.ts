#!/usr/bin/env node 

import {program} from 'commander';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';

const { description, version } = require('../package.json');

if(!process.argv.slice(2).length){
    clear() // To clear the terminal
    console.log(
        chalk.red(
            figlet.textSync('Scrapix', {horizontalLayout:'full'})
        )
    )
}

program
    .description(description)
    .version(chalk.green(`Version: ${version}`), '-v')
    .parse(process.argv);