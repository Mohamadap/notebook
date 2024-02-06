const close = document.querySelector('.close-modal');
const clos =document.querySelectorAll('.close-modals')
const modal = document.querySelector('.modals')
const show =document.querySelector('#addNoteBtn') 
const edit = document.querySelector('.edit-modal')
const iedit = document.querySelectorAll('.fa-pen-to-square')
const textinp = document.querySelector('.txt-inp')

const add= function(){
modal.classList.remove('hiden')
modal.classList.add('hide')
document.getElementById('mytextarea').focus();
}

const closes = function(){
modal.classList.remove('hide')
modal.classList.add('hiden')
}
 const editshow = function(){
    edit.classList.add('hide')
    edit.classList.remove('hiden')
    document.getElementById('mytextareas').focus();
}
const editclose = function(){
    edit.classList.remove('hide')
    edit.classList.add('hiden')
}
show.addEventListener('click' , add)
close.addEventListener('click' , closes)

for(let i = 0 ; i<iedit.length;i++){
    iedit[i].addEventListener('click',editshow)
}
for(let i = 0 ; i<clos.length;i++){
  clos[i].addEventListener('click',editclose)
}

document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
        if(!modal.classList.contains('hiden')){
            closes()
        }
        
    }
})
document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
        if(!edit.classList.contains('hiden')){
            editclose()
        }
        
    }
})

function cleartextareas(){
  document.getElementById('mytextarea').value = '';
  document.getElementById('mytextarea1').value = '';
}


 
  document.addEventListener("DOMContentLoaded", function () {
    const addNoteBtn = document.querySelector(".w-btn");
    const titleInput = document.querySelector("#mytextarea");
    const contentInput = document.querySelector("#mytextarea1");
    const notesContainer = document.querySelector(".sd");
    function showEditSection(clickedBox) {
      const editSection = document.querySelector('.edit-modal');
      const titleInputEdit = document.querySelector("#mytextareas");
      const contentInputEdit = document.querySelector("#mytextareas1");
      const editSubmitBtn = document.querySelector('.w-btns');
  
  
      titleInputEdit.value = clickedBox.querySelector('.til h5').innerText;
      contentInputEdit.value = clickedBox.querySelector('.content p').innerText;
  
       
      editSubmitBtn.addEventListener('click', function () {
        clickedBox.querySelector('.til h5').innerText = titleInputEdit.value;
        clickedBox.querySelector('.content p').innerText = contentInputEdit.value;
  
        updateNoteInStorage(clickedBox, titleInputEdit.value, contentInputEdit.value);
  
        editclose();
        for(let i = 0 ; i<clos.length;i++){
    clos[i].addEventListener('click',editclose)
}
      });
  
      editSection.classList.remove('hiden');
      editSection.classList.add('hide');
    }
  
    function updateNoteInStorage(clickedBox, newTitle, newContent) {
      let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const index = Array.from(clickedBox.parentNode.children).indexOf(clickedBox);
      savedNotes[index] = { title: newTitle, content: newContent };
      localStorage.setItem("notes", JSON.stringify(savedNotes));
    }
  
    
  
    function addEditIconToNote(noteElement) {
      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid", "fa-pen-to-square", 'elips', 'd-flex', 'align-items-center' ,'justify-content-center','rounded-circle', 'ms-1' ,'p-2');
      editIcon.style.cursor = "pointer";
      editIcon.addEventListener("click", function () {
        showEditSection(noteElement);
      });
      noteElement.querySelector(".til .d-flex").appendChild(editIcon);
    }
  
   
    function deleteNoteFromStorage(title, content) {
      let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      savedNotes = savedNotes.filter(note => !(note.title === title && note.content === content));
      localStorage.setItem("notes", JSON.stringify(savedNotes));
    }
  
    function addDeleteIconToNote(noteElement, title, content) {
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash",  'elips' ,'d-flex' , 'align-items-center','justify-content-center' , 'rounded-circle' , 'ms-3' , 'p-2');
      deleteIcon.style.cursor = "pointer";
      deleteIcon.addEventListener("click", function () {
        noteElement.remove();
        deleteNoteFromStorage(title, content);
      });
      noteElement.querySelector(".til .d-flex").appendChild(deleteIcon);
    }
  
    function loadNotes() {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  
      savedNotes.forEach(note => {
        const newBox = document.createElement("div");
        newBox.classList.add("col-xl-6", "col-md-6", "col-sm-6", "col-xs-12");
        newBox.innerHTML = `
          <div class="boxs d-flex flex-column align-items-center">
            <div class="til d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center justify-content-center">
              
              </div>
              <div>
                <h5 class="fw-bold me-4 mt-2">${note.title}</h5>
              </div>
            </div>
            <div class="content mt-4">
              <p dir="rtl" class="p-3">${note.content}</p>
            </div>
          </div>
        `;
  
        addDeleteIconToNote(newBox, note.title, note.content);
        addEditIconToNote(newBox);
  
        const existingRows = document.querySelectorAll('.row.d-flex.align-items-center.justify-content-center.sd');
        let currentRow;
  
        if (existingRows.length > 0) {
          currentRow = existingRows[existingRows.length - 1];
        } else {
          currentRow = document.createElement('div');
          currentRow.classList.add('row', 'd-flex', 'align-items-center', 'justify-content-center', 'sd');
          notesContainer.appendChild(currentRow);
        }
  
        const boxesInCurrentRow = currentRow.querySelectorAll('.col-xl-6');
        if (boxesInCurrentRow.length < 2) {
          currentRow.appendChild(newBox);
        } else {
          const newRow = document.createElement('div');
          newRow.classList.add('row', 'd-flex', 'align-items-center', 'justify-content-center', 'sd');
          newRow.appendChild(newBox);
          notesContainer.appendChild(newRow);
        }
      });
    }
  
    loadNotes();
  
    addNoteBtn.addEventListener("click", function () {
      const title = titleInput.value;
      const content = contentInput.value;
  
      const newBox = document.createElement("div");
      newBox.classList.add("col-xl-6", "col-md-6", "col-sm-6", "col-xs-12");
      newBox.innerHTML = `
        <div class="boxs d-flex flex-column align-items-center">
          <div class="til d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center justify-content-center">
              
            </div>
            <div>
              <h5 class="fw-bold me-4 mt-2">${title}</h5>
            </div>
          </div>
          <div class="content mt-4">
            <p dir="rtl" class="p-3">${content}</p>
          </div>
        </div>
      `;
  
      addDeleteIconToNote(newBox, title, content);
      addEditIconToNote(newBox);
  
      const existingRows = document.querySelectorAll('.row.d-flex.align-items-center.justify-content-center.sd');
      let currentRow;
  
      if (existingRows.length > 0) {
        currentRow = existingRows[existingRows.length - 1];
      } else {
        currentRow = document.createElement('div');
        currentRow.classList.add('row', 'd-flex', 'align-items-center', 'justify-content-center', 'sd');
        notesContainer.appendChild(currentRow);
      }
  
      const boxesInCurrentRow = currentRow.querySelectorAll('.col-xl-6');
      if (boxesInCurrentRow.length < 2) {
        currentRow.appendChild(newBox);
      } else {
        const newRow = document.createElement('div');
        newRow.classList.add('row', 'd-flex', 'align-items-center', 'justify-content-center', 'sd');
        newRow.appendChild(newBox);
        notesContainer.appendChild(newRow);
      }
  
      let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      savedNotes.push({ title, content });
      localStorage.setItem("notes", JSON.stringify(savedNotes));
  
      titleInput.value = "";
      contentInput.value = "";

      closes()
    });
  });
  
  
  
  
  
  
  
  
  
  
 
   
    
  