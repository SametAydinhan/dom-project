// ToDo chose element

// E chose element

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;


//load Items
loadItems();


eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener("submit", addNewItem);
    // delete an item
    taskList.addEventListener("click", deleteItem);
    // delete all item
    btnDeleteAll.addEventListener("click", deleteAllItems);

}

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    });
}
// get items from local storage
function getItemsFromLS(){
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
// set item to local storage
function setItemToLS(newTodo){
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function createItem(newTodo) {
    // li create

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    // a create

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
}

function addNewItem(e) {
    if (input.value === '') {
        alert("Add New Item");
        //console.log("submit");
    }
    // CREATE ıtem

    createItem(input.value);

    setItemToLS(input.value);

    input.value = "";

    e.preventDefault();
}

// Delete Item

function deleteItem(e) {

    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz ?")) {
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getItemsFromLS();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}

// all item delete
function deleteAllItems(e) {
    if (confirm("Tüm elemanları silmek istediğinize emin misiniz?")) {
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    // taskList.innerHTML="";
}
