const readLineSync = require('readline-sync');
const fs = require('fs');

var notes = [];

function loadData() {
    var fileContent = fs.readFileSync('./data.json');

    // get JSON string and convert to object
    notes = JSON.parse(fileContent);
}

function showMenu() {
    console.log('1. Show all notes');
    console.log('2. Add new note');
    console.log('3. Edit your note');
    console.log('4. Delete note');
    var choice = readLineSync.question('Input your choice: ');

    switch (choice) {
        case '1':
            showAllNotes();
            showMenu();
            break;
        case '2':
            addNewNote();
            showMenu();
            break;
        case '3':
            editNote();
            showMenu();
            break;
        case '4':
            deleteNote();
            showMenu();
            break;
        default:
            console.log('Your choice is not correct!!!');
            showMenu();
            break;
    }
}

function main() {
    loadData();
    showMenu();
}

function showAllNotes() {
    // notes.map(function (note) {
    //     console.log(note.title + ' | ' + note.content);
    // });
    console.log('\n');
    for (var note of notes) {
        console.log(note.title + ' | ' + note.content);
    }
    console.log('\n');
}

function addNewNote() {
    let noteTitle = readLineSync.question('Please input your title: ');
    let noteContent = readLineSync.question('Please input your content: ');
    let noteObject = {
        title: noteTitle,
        content: noteContent
    };

    notes.push(noteObject);
    save();
}

function editNote() {
    let noteEdit = readLineSync.question('Input your title note you want to edit: ');
    let contentEdit = readLineSync.question('Input your content note you want to edit: ');
    for (var note of notes) {
        if (note.title == noteEdit) {
            note.content = contentEdit;
            save();
        }
    }
}

function deleteNote() {
    let noteDelete = readLineSync.question('Input your title note you want to delete: ');
    let index = notes.findIndex(note => note.title == noteDelete);
    notes.splice(index, 1);
    save();
}

function save() {
    var content = JSON.stringify(notes)
    fs.writeFileSync('./data.json', content, {
        encoding: 'utf8'
    });
}

main();