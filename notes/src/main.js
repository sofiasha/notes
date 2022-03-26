const notesContainer = document.getElementById("app"); // refers to div "app"
const addNoteButton = notesContainer.querySelector(".add-note"); // refers to button, querySelector returns first elem

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

// get notes from local storage to clients browser
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]"); // converting json to js obj
}

// save new notes to clients browser
// localStorage.setItem saves (key, value) even after restarting browser
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes)); // converting js obj to json
}

//create new elem
function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";
    
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure? The action is irreversible");
        if(doDelete) {
            deleteNote(id, element);
        }
    });
    return element;
}

// add and save to local storage
function addNote() {
    const notes = getNotes();
    const noteObject = {
      id: Math.floor(Math.random() * 100000),
      content: ""
    };
  
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
  
    notes.push(noteObject);
    saveNotes(notes);
}

//updating note
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
  
    targetNote.content = newContent;
    saveNotes(notes);
  }

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    saveNotes(notes);
    notesContainer.removeChild(element);
}