const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const li = document.createElement('li');
  li.innerText = input.value;
  ul.append(li);
  input.value = '';
});