// ===========================
// Elements
// ===========================

const notesContainer = document.getElementById("notesContainer");

const newNoteBtn = document.getElementById("newNote");

const searchInput = document.getElementById("searchInput");

// ===========================
// Variables
// ===========================

let notes = [];

// ===========================
// Local Storage
// ===========================

function saveNotes(){

localStorage.setItem(

"notes",

JSON.stringify(notes)

);

}

// ===========================
// Load Notes
// ===========================

function loadNotes(){

const savedNotes=

localStorage.getItem("notes");

if(savedNotes){

notes=JSON.parse(savedNotes);

}

renderNotes();

}

loadNotes();

// ===========================
// Create Note
// ===========================

function createNote(){

notes.unshift({

title:"",

content:"",

pinned:false,

date:new Date().toLocaleString()

});

saveNotes();

renderNotes();

}

// ===========================
// New Note Button
// ===========================

newNoteBtn.addEventListener(

"click",

createNote

);

// ===========================
// Render Notes
// ===========================

function renderNotes(){

notesContainer.innerHTML="";

notes.forEach((note,index)=>{

const card=document.createElement("div");

card.className="note";

card.innerHTML=`

<input

class="note-title"

placeholder="Title"

value="${note.title}">

<textarea

class="note-content"

placeholder="Write your note...">${note.content}</textarea>

<p class="note-date">

${note.date}

</p>

<div class="note-buttons">

<button class="pin">

${note.pinned ? "📌 Pinned" : "📌 Pin"}

</button>

<button class="save">

💾 Save

</button>

<button class="delete">

🗑 Delete

</button>

</div>

`;

notesContainer.appendChild(card);

});

}
// ===========================
// Save Note
// ===========================

function saveNote(index,title,content){

notes[index].title=title;

notes[index].content=content;

notes[index].date=

"Updated: "+new Date().toLocaleString();

saveNotes();

}

// ===========================
// Delete Note
// ===========================

function deleteNote(index){

if(confirm("Delete this note?")){

notes.splice(index,1);

saveNotes();

renderNotes();

}

}

// ===========================
// Pin Note
// ===========================

function pinNote(index){

notes[index].pinned=

!notes[index].pinned;

// Move pinned notes to top

notes.sort((a,b)=>

b.pinned-a.pinned

);

saveNotes();

renderNotes();

}

// ===========================
// Improve Render
// ===========================

const originalRender=renderNotes;

renderNotes=function(){

originalRender();

const cards=

document.querySelectorAll(".note");

cards.forEach((card,index)=>{

const title=

card.querySelector(".note-title");

const content=

card.querySelector(".note-content");

const saveBtn=

card.querySelector(".save");

const deleteBtn=

card.querySelector(".delete");

const pinBtn=

card.querySelector(".pin");

// Save

saveBtn.addEventListener("click",()=>{

saveNote(

index,

title.value,

content.value

);

alert("Note Saved!");

});

// Delete

deleteBtn.addEventListener("click",()=>{

deleteNote(index);

});

// Pin

pinBtn.addEventListener("click",()=>{

pinNote(index);

});

});

};

// ===========================
// Refresh
// ===========================

renderNotes();
// ===========================
// Live Search
// ===========================

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

const cards=document.querySelectorAll(".note");

cards.forEach(card=>{

const title=card.querySelector(".note-title")
.value.toLowerCase();

const content=card.querySelector(".note-content")
.value.toLowerCase();

if(

title.includes(value) ||

content.includes(value)

){

card.style.display="flex";

}

else{

card.style.display="none";

}

});

});

// ===========================
// Auto Save While Typing
// ===========================

document.addEventListener("input",(event)=>{

if(

event.target.classList.contains("note-title") ||

event.target.classList.contains("note-content")

){

const card=event.target.closest(".note");

const cards=[...document.querySelectorAll(".note")];

const index=cards.indexOf(card);

if(index!==-1){

notes[index].title=

card.querySelector(".note-title").value;

notes[index].content=

card.querySelector(".note-content").value;

notes[index].date=

"Updated: "+new Date().toLocaleString();

saveNotes();

card.querySelector(".note-date").textContent=

notes[index].date;

}

}

});

// ===========================
// Keyboard Shortcut
// Ctrl + N = New Note
// ===========================

document.addEventListener("keydown",(event)=>{

if(event.ctrlKey && event.key==="n"){

event.preventDefault();

createNote();

}

});

// ===========================
// Empty State
// ===========================

function showEmptyState(){

if(notes.length===0){

notesContainer.innerHTML=`

<div class="empty-state">

<h2>📝 No Notes Yet</h2>

<p>

Click "New Note" to create your first note.

</p>

</div>

`;

}

}

const previousRender=renderNotes;

renderNotes=function(){

previousRender();

showEmptyState();

};

// ===========================
// Save Before Closing
// ===========================

window.addEventListener("beforeunload",()=>{

saveNotes();

});

// ===========================
// Initial Render
// ===========================

renderNotes();