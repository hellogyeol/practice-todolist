const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
let todolist = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  todolist.push(input.value);
  console.log(todolist);
  input.value = '';
  localStorage.setItem('todolist', JSON.stringify(todolist));
});