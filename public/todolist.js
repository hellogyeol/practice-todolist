const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const savedList = localStorage.getItem('todolist');
let todolist = [];

if (savedList !== null) {
  todolist = JSON.parse(savedList);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const todo = {
    id: Date.now(),
    content: input.value
  };

  todolist.push(todo);
  input.value = '';
  localStorage.setItem('todolist', JSON.stringify(todolist));
});
