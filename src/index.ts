#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
import path from 'path';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import { performance } from 'perf_hooks';
import { Inquirer } from './utils/inquirer';
import { scrapeImages, FileContent } from './utils/scraper';


const { description, version } = require('../package.json');

if (!process.argv.slice(2).length) {
    clear() // To clear the terminal
    console.log(
        chalk.red(
            figlet.textSync('Scrapix', { horizontalLayout: 'full' })
        )
    )
    console.log(chalk.gray('⚡ A CLI tool for scraping Google images the right way'))
}

program
    .description(description)
    .version(chalk.green(`Version: ${version}`), '-v')
    .parse(process.argv);

// start the CLI 
function measurePromise(fn: () => Promise<any>): Promise<number> {
    let onPromiseDone = () => performance.now() - start;

    let start = performance.now();
    return fn().then(onPromiseDone, onPromiseDone);
}

const start = async () => {
    await Inquirer().then(results => {
        const { input, number, filename } = results;
        if(filename){
            const file_contents = JSON.parse(readFileSync(path.join('.', filename), 'utf8'));
            if(!file_contents['images'] || !file_contents['images'].length){
                console.log("File must contain the required images.");
            }else{
                file_contents['images'].map((item:FileContent, id:number)=>(
                    scrapeImages(item['keyword'].trim(), item['number'])
                ))
            }
        }
        else{
            input.split(',').map((keyword:string)=>(
                scrapeImages(keyword.trim(), number)
            ))
        }
    }).catch(error=>{
        console.log(`An unknown error occurred --> ${error}`)
    })
}

start();
