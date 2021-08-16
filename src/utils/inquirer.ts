/**
 * @author [Similoluwa Okunowo (The Caveman)]
 * @email [rexsimiloluwa@gmail.com]
 * @create date 2020-12-16 20:13:17
 * @modify date 2020-12-21 08:14:27
 * @desc [description]
 */
import path from 'path';
import {readFileSync, existsSync} from 'fs';
import inquirer, { Question, ChoiceOptions, Answers, QuestionCollection } from 'inquirer';

export interface Choice {
    name: string,
    value: Mode | number
}

export enum Mode {
    FILE = 'file',
    DEFAULT = 'default'
}

export async function Inquirer(): Promise<Answers> {
    const modes: Array<ChoiceOptions> = [
        { name: 'default', value: 'default' },
        { name: 'file', value: 'file' }
    ];

    const prompts: QuestionCollection<Answers> = [
        {
            name: 'mode',
            type: 'list',
            message: 'Select mode to load search queries: - ',
            choices: modes
        },
        {
            name: 'input',
            type: 'input',
            message: 'Enter the names of images you want to download i.e. Cat,Dog: - ',
            validate: async (input: string) => {
                if (input.length) { return true }
                return "Empty or Invalid input, seperate the names with commas."
            },
            when: (answers) => answers.mode == 'default'
        },
        {
            name: 'number',
            type: 'input',
            message: 'Enter the number of images to scrape: -',
            validate: async (input: number) => {
                if(!Number(input) || input<0) {
                    return "Input must be a number and greater than 0"
                }
                return true
            },
            when: (answers) => answers.mode == 'default'
        },
        {
            name: 'filename',
            type: 'input',
            message: 'Enter the name of the .json file: -',
            validate: async (input: string) => {
                if(!input.length){ return "Invalid filename, filename cannot be empty." }
                if(path.extname(input)!='.json'){ return "File must be a .json file." }
                if(!existsSync(path.join('.', input))){ return "File does not exist in the base path." }
                if(!readFileSync(path.join('.', input))){ return "File is empty, Kindly follow the specified format." }
                return true
            },
            when: (answers) => answers.mode == 'file'
        }
    ]
    return inquirer.prompt(prompts);
}