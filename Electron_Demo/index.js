var htmlResult = document.getElementById('result');
var submitBtn = document.getElementById('submitBtn');
var divAddNote = document.getElementById('addInput');
var divEditNote = document.getElementById('editInput');
var addBtn = document.getElementById('addBtn');
var editBtn = document.getElementById('editBtn');

submitBtn.addEventListener('click', main);
addBtn.addEventListener('click', addNewNote);

var url = 'http://localhost:9081/notes';

var dataNote = [];

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
    divAddNote.style.display = 'block';
    let noteTitle = document.getElementById('title').value;
    let noteContent = document.getElementById('content').value;
    let noteObject = {
        "title": noteTitle,
        "content": noteContent
    };
    axios.post(url, noteObject);
}

function editNote(notes) {
    let noteEdit = document.getElementById('editTitle').value;
    let contentEdit = document.getElementById('editContent').value;
    var updateItem = {
        content: contentEdit
    };
    notes.filter(function (item) {
        if (item.title === noteEdit) {
            axios.put(url, updateItem);
        }
    });
}

async function main() {
    dataNote = await loadData();
    var choice = document.getElementById('choice').value;
    switch (choice) {
        case '1':
            showAllNotes(dataNote.data);
            choice.value = '';
            break;
        case '2':
            addNewNote();
            choice.value = '';
            break;
        case '3':
            divEditNote.style.display = 'block';
            editBtn.addEventListener('click', editNote(dataNote.data));
            // editNote(dataNote.data);
            choice.value = '';
            break;
        case '4':
            // deleteNote();
            choice.value = '';
            break;
        default:
            console.log('Your choice is not correct!!!');
            break;
    }
}

main();