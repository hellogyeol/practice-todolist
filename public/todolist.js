const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
let todolist = [];

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