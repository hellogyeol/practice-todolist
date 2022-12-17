const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const savedList = localStorage.getItem('todolist');
let todolist = [];

if (savedList !== null) {
  todolist = JSON.parse(savedList);
  render();
} else {
  const span = document.createElement('span');
  span.innerText = 'No Todo!';
  document.body.append(span);
}

function render() {
  todolist.map(todo => {
    const li = document.createElement('li');
    li.innerText = todo.content;
    ul.append(li);
  });
}

form.addEventListener('submit', () => {
  const todo = {
    id: Date.now(),
    content: input.value
  };

  todolist.push(todo);
  input.value = '';
  localStorage.setItem('todolist', JSON.stringify(todolist));
});
