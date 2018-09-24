var htmlResult = document.getElementById('result');

var submitBtn = document.getElementById('submitBtn');
var divAddNote = document.getElementById('addInput');
var divEditNote = document.getElementById('editInput');
var divDeleteNote = document.getElementById('deleteInput');

var addBtn = document.getElementById('addBtn');
var editBtn = document.getElementById('editBtn');
var deleteBtn = document.getElementById('deleteBtn');

submitBtn.addEventListener('click', main);

var url = 'http://localhost:9081/notes';

var dataNote = {};

function loadData() {
    return axios.get(url);
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
    var notes = dataNote.data;
    let noteEdit = document.getElementById('editTitle').value;
    let contentEdit = document.getElementById('editContent').value;
    var updateItem = {
        title: noteEdit,
        content: contentEdit
    };
    notes.filter(function (item) {
        if (item.title === noteEdit) {
            axios.put(url + "/" + item.id, updateItem);
        }
    });
}

function deleteNote() {
    var notes = dataNote.data;
    let noteDelete = document.getElementById('deleteTitle').value;
    var deleteItem = {
        title: noteDelete
    };
    notes.filter(function (item) {
        if (item.title === noteDelete) {
            axios.delete(url + "/" + item.id, deleteItem);
        }
    });
}

editBtn.addEventListener('click', editNote);
addBtn.addEventListener('click', addNewNote);
deleteBtn.addEventListener('click', deleteNote);

async function main() {
    dataNote = await loadData();

    var choice = document.getElementById('choice').value;
    switch (choice) {
        case '1':
            showAllNotes(dataNote.data);
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
            divDeleteNote.style.display = 'block';
            choice.value = '';
            break;
        default:
            console.log('Your choice is not correct!!!');
            break;
    }
}

main();