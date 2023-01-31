//Common Variables used throughout the page
const data = new Date();

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Display current date
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();


//Display current time using time() function
function time() {
    const data = new Date();
    let h = data.getHours();
    let m = data.getMinutes();
    let s = data.getSeconds();

    if(h < 10)
        h = "0" + h;
    if(m < 10)
        m = "0" + m;
    if(s < 10)
        s = "0" + s;
    
    document.getElementById("hour").innerHTML = h + ":" + m + ":" + s;
    setTimeout('time()', 500);
}

//Add new todo functionality

//Save the added note
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
    if(inputValue)
        saveTodo(inputValue);
})

const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

//Add todo Items events for complete, remove and edit
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3"))
        todoTitle = parentEl.querySelector("h3").innerText;

    if(targetEl.classList.contains("finish-todo"))
        parentEl.classList.toggle("done");

    if(targetEl.classList.contains("remove-todo"))
        parentEl.remove();

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

//Toggle function to show/hide
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

//Cancel button event in edit form
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
})

//Edit todo items
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    if(editInputValue)
        updateTodo(editInputValue)
    
    toggleForms();
})

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue)
            todoTitle.innerText = text;
    })
}

//Export as pdf
const exportPDF = () => {
    const pdf = new jsPDF({ orientation: "l" });
    var currentPage = pdf.internal.getCurrentPageInfo().pageNumber;
    var y = 20;
    
    const h3Elements = document.querySelectorAll("h3");
    h3Elements.forEach((h3, i) => {
    var height = pdf.getStringUnitWidth(h3.textContent) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

    if (y + height > pdf.internal.pageSize.height - 20) {
        pdf.addPage();
        y = 20;
        currentPage = pdf.internal.getCurrentPageInfo().pageNumber;
      }
      pdf.text(20, y, h3.textContent);
      y = y + height + 10;
    });

    pdf.save("Session Notes.pdf");
};
document.querySelector("#export-pdf").addEventListener("click", exportPDF);