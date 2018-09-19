// const readLineSync = require('readline-sync');
const fs = require('fs');

var notes = [];

var htmlResult = document.getElementById('result');

var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', main);

function loadData() {
    var fileContent = fs.readFileSync('./data.json');

    // get JSON string and convert to object
    notes = JSON.parse(fileContent);
}

function showMenu() {
    var choice = document.getElementById('choice').value;
    console.log('1. Show all notes');
    console.log('2. Add new note');
    console.log('3. Edit your note');
    console.log('4. Delete note');

    switch (choice) {
        case '1':
            showAllNotes();
            choice.value = '';
            showMenu();
            break;
        case '2':
            addNewNote();
            choice.value = '';
            showMenu();
            break;
        case '3':
            editNote();
            choice.value = '';
            showMenu();
            break;
        case '4':
            deleteNote();
            choice.value = '';
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
    var list = notes.map(function(note) {
        return '<li>' + note.title + ' | ' + note.content + '</li>';
    });
    htmlResult.innerHTML = list.join('');
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