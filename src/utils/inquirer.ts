import inquirer,{Question, ChoiceOptions, Answers} from 'inquirer';

export interface Choice {
    name: string,
    value: Mode|number
}

export interface Answer {

}

export enum Mode{
    FILE = 'file',
    DEFAULT = 'default'
}

export async function Inquirer(): Promise<Answers> {
    const modes: Array<ChoiceOptions> = [
        {name: 'default', value: 'default'},
        {name: 'file', value: 'file'}
    ];

    const prompts: Question<Answers> = [
        {
            name: 'mode',
            type: 'list',
            message: 'Select mode to load search queries',
            choices: modes
        }
    ]
}