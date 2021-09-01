//Ex: Module loader
/*
const getNotes = require('./notes');
const notes = getNotes();
console.log(notes);
*/

//Ex: Validator library
/*
const validatorLib = require('validator');
console.log(validatorLib.isURL('https://mead.io'));
 */

//Ex: Chalk library
/*
const chalkLib = require('chalk');
console.log(chalkLib.black.bgBlue.bold('Info!')); 
*/

//Ex: Nodemon library
/* */

//Ex: Get input from user
/*
const command = process.argv[2];
const commandValue = process.argv[3];

if(command) {
    if(['add', 'remove'].includes(command)) {
        if(command === 'add') {
            console.log('Adding...');

            if(commandValue) {
                const commandInput = commandValue.split('=');
                const commandArgument = commandInput[0];

                if(['--title', '--description'].includes(commandArgument) && commandInput[1]) {
                    let input = commandInput[1];

                    if(input[0] === '"') {
                        input = input.splice(0, 1);
                    }

                    if(input[input.length - 1] === '"') {
                        input = input.splice(input.length - 1, 1);
                    }

                    if(commandInput[0] === '--title') {
                        console.log(`Title: ${input}`);
                    }

                    if(commandInput[0] === '--description') {
                        console.log(`Description: ${input}`);
                    }
                }
            }
        }

        if (command === 'remove') {
            console.log('Removing...');
        }
    }
}
*/

//Ex: Yargs library
/*
const yargsLib = require('yargs');

yargsLib.command({
    command: 'add',
    describe: 'Add a new property',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        console.log('Adding by command...');
        
        if(argv.title) {
            console.log(`Title: ${argv.title}`);
        } 

        if(argv.body) {
            console.log(`Body: ${argv.body}`);
        }
    }
});

yargsLib.command({
    command: 'remove',
    describe: 'Remove a new property',
    handler: argv => {
        console.log('Removing by command...');
        
        if(argv.title) {
            console.log(`Title: ${argv.title}`);
        } 

        if(argv.body) {
            console.log(`Body: ${argv.body}`);
        }
    }
});

yargsLib.parse();
*/

//Ex: Note module loader & Yargs lib
const yargsLib = require('yargs');
const note = require('./notes');

yargsLib.command({
    command: 'add',
    describe: 'Add a new property',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        note.addNote(argv.title, argv.body);
    }
});

yargsLib.command({
    command: 'remove',
    describe: 'Remove a new property',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        note.removeNote(argv.title);
    }
});

yargsLib.command({
    command: 'list',
    describe: 'Get all notes',
    handler: argv => {
        note.getNotes();
    }
});

yargsLib.command({
    command: 'read',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        note.readNote(argv.title);
    }
});

yargsLib.parse();