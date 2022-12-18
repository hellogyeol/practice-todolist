const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const savedList = localStorage.getItem('todolist');
let todolist = [];

if (savedList !== null) {
  todolist = JSON.parse(savedList);
  renderList();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const todo = {
    id: String(Date.now()),
    content: input.value
  };
  input.value = '';
  todolist.push(todo);
  saveList();
  pageRefresh();
  renderList();
});

function saveList() {
  localStorage.setItem('todolist', JSON.stringify(todolist));
}

function pageRefresh() {
  location.reload();
}

function renderList() {
  todolist.map(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');
    span.innerText = todo.content;
    deleteBtn.innerText = 'X';
    li.id = todo.id;
    li.append(span, deleteBtn);
    ul.append(li);

    deleteBtn.addEventListener('click', deleteTodo);
  });
}

function deleteTodo(event) {
  const todoLiId = event.target.parentElement.id;
  todolist = todolist.filter(todo => todo.id !== todoLiId);
  saveList();
  pageRefresh();
  renderList();
}