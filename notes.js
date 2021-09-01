//Ex: Notes
/*
const getNotes = () => 'Your notes...';
module.exports = getNotes;
*/

//Ex: Notes with fs
const fs = require('fs');
const chalk = require('chalk');

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if(note) {
        console.log(chalk.green.inverse('Note found!'));
        console.log(chalk.yellow(`Title "${note.title}", Body "${note.body}"`));
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

const getNotes = () => {
    const notes = loadNotes();

    console.log(chalk.yellow.inverse('Notes...'));
    notes.forEach(note => console.log(chalk.green(note.title)));
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataStringify = dataBuffer.toString();
        
        return JSON.parse(dataStringify);
    } catch(ex) {
        return [];
    }
};

const saveNotes = notes => {
    const dataStringify = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataStringify);
};

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicatedNotes = notes.filter(note => note.title === title );

    // if(duplicatedNotes.length > 0) {
    //     console.log(chalk.red.inverse('Note exists!'));
    //     return;
    // }

    // debugger

    const duplicateNote = notes.find(note => note.title === title );

    if(duplicateNote) {
        console.log(chalk.red.inverse('Note exists!'));
        return;
    }

    // for(const note of notes) {
    //     if(note.title === title) {
    //         return;
    //     }
    // }


    console.log(chalk.green.inverse('Note added!'));
    notes.push({ title: title, body: body });

    saveNotes(notes);
};

const removeNote = title => {
    const notes = loadNotes();

    // const existingNotes = notes.filter(note => note.title === title );

    // if(existingNotes.length === 0) {
    //     console.log('NOTE TITLE DOES NOT EXISTS!!!');
    //     return;
    // }

    // const index = notes.indexOf(existingNotes[0]);
    // notes.splice(index, 1);
    // saveNotes(notes);

    const notesToKeep = notes.filter(note => note.title !== title);

    if(notesToKeep.length === notes.length) {
        console.log(chalk.red.inverse('No note found!'));
    } else {
        console.log(chalk.green.inverse('Note removed!'));
    }

    saveNotes(notesToKeep);
};

module.exports = {
    getNotes: getNotes,
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote
};