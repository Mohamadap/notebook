/ تابع برای نمایش اطلاعات یادداشت در سکشن ویرایش
function showNoteInEditSection(title, content) {
    const editTitleInput = document.querySelector("#mytextareas");
    const editContentInput = document.querySelector("#mytextarea1");

    editTitleInput.value = title;
    editContentInput.value = content;
}

// اضافه کردن event listener به ایکون‌های ویرایش
for (let i = 0; i < iedit.length; i++) {
    iedit[i].addEventListener('click', function () {
        const noteTitle = this.closest('.til').querySelector('h5').textContent;
        const noteContent = this.closest('.content').querySelector('p').textContent;

        // نمایش اطلاعات یادداشت در سکشن ویرایش
        showNoteInEditSection(noteTitle, noteContent);

        // نمایش سکشن ویرایش
        editshow();
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // ...
  
    // تابع برای نمایش سکشن ویرایش یادداشت با اطلاعات متناظر با باکس کلیک شده
    function showEditSection(clickedBox) {
      const editSection = document.querySelector('.edit-modal');
      const titleInputEdit = document.querySelector("#mytextareas");
      const contentInputEdit = document.querySelector("#mytextareas1");
      const editSubmitBtn = document.querySelector('.w-btns');
  
      // تنظیم مقادیر در سکشن ویرایش با اطلاعات باکس کلیک شده
      titleInputEdit.value = clickedBox.querySelector('.til h5').innerText;
      contentInputEdit.value = clickedBox.querySelector('.content p').innerText;
  
      // ثبت ویرایش
      editSubmitBtn.addEventListener('click', function () {
        // اعمال تغییرات در متن یادداشت با اطلاعات جدید وارد شده
        clickedBox.querySelector('.til h5').innerText = titleInputEdit.value;
        clickedBox.querySelector('.content p').innerText = contentInputEdit.value;
  
        // ذخیره یادداشت ویرایش شده در localStorage
        updateNoteInStorage(clickedBox, titleInputEdit.value, contentInputEdit.value);
  
        // مخفی کردن سکشن ویرایش
        editclose();
      });
  
      // نمایش سکشن ویرایش
      editSection.classList.remove('hiden');
      editSection.classList.add('hide');
    }
  
    // تابع برای ذخیره یادداشت ویرایش شده در localStorage
    function updateNoteInStorage(clickedBox, newTitle, newContent) {
      let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const index = Array.from(clickedBox.parentNode.children).indexOf(clickedBox);
      savedNotes[index] = { title: newTitle, content: newContent };
      localStorage.setItem("notes", JSON.stringify(savedNotes));
    }
  
    // ...
  
    // افزودن ایکون ویرایش به هر باکس
    function addEditIconToNote(noteElement) {
      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid", "fa-pen-to-square", 'elips', 'd-flex', 'align-items-center', 'rounded-circle', 'ms-1');
      editIcon.style.cursor = "pointer";
      editIcon.addEventListener("click", function () {
        // نمایش سکشن ویرایش با اطلاعات باکس کلیک شده
        showEditSection(noteElement);
      });
      noteElement.querySelector(".til .d-flex").appendChild(editIcon);
    }
  
    // ...
  
    // بارگذاری یادداشت‌ها از localStorage هنگام بارگذاری صفحه
    loadNotes();
  
    addNoteBtn.addEventListener("click", function () {
      // ...
  
      // اضافه کردن ایکون ویرایش به هر یادداشت
      addEditIconToNote(newBox);
  
      // ...
    });
  });
