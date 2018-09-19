var htmlResult = document.getElementById('result');
var submitBtn = document.getElementById('submitBtn');
var divAddNote = document.getElementById('addInput');
var divEditNote = document.getElementById('editInput');
var addBtn = document.getElementById('addBtn');
var editBtn = document.getElementById('editBtn');

submitBtn.addEventListener('click', main);
addBtn.addEventListener('click', addNewNote);

var url = 'http://localhost:9081/notes';

function loadData() {
    axios.get(url).then(function (res) {
        var notes = res.data;
        showAllNotes(notes);
    });
}

function showMenu() {
    var choice = document.getElementById('choice').value;

    switch (choice) {
        case '1':
            loadData();
            choice.value = '';
            break;
        case '2':
            divAddNote.style.display = 'block';
            choice.value = '';
            break;
        case '3':
            divEditNote.style.display = 'block';
            choice.value = '';
            break;
        case '4':
            deleteNote();
            choice.value = '';
            break;
        default:
            console.log('Your choice is not correct!!!');
            break;
    }
}

function main() {
    showMenu();
}

function showAllNotes(notes) {
    var list = notes.map(function (note) {
        return '<li>' + note.title + ' | ' + note.content + '</li>';
    });
    htmlResult.innerHTML = list.join('');
}

function addNewNote() {
    let noteTitle = document.getElementById('title').value;
    let noteContent = document.getElementById('content').value;
    let noteObject = {
        "title": noteTitle,
        "content": noteContent
    };

    axios.post(url, noteObject);
}

function editNote() {
    let noteEdit = document.getElementById('editTitle').value;
    let contentEdit = document.getElementById('editContent').value;
    for (var note of notes) {
        if (note.title == noteEdit) {
            note.content = contentEdit;
        }
    }
}

function deleteNote() {
    let noteDelete = readLineSync.question('Input your title note you want to delete: ');
    let index = notes.findIndex(note => note.title == noteDelete);
    notes.splice(index, 1);
}

main();