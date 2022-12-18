const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const savedList = localStorage.getItem('todolist');
let todolist = [];

if (savedList !== null) {
  todolist = JSON.parse(savedList);
  saveList();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const todo = {
    id: String(Date.now()),
    content: input.value
  };
  input.value = '';
  todolist.push(todo)
  saveList();
});

function saveList() {
  localStorage.setItem('todolist', JSON.stringify(todolist));
}