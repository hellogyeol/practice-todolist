const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const savedList = localStorage.getItem('todolist');
let todolist = [];

/*
 * 저장된 To-Do가 없으면 입력 안내문 출력,
 * 저장된 To-Do가 있으면 렌더링
 */
if ((savedList === null) || (savedList === '[]')) {
  const span = document.createElement('span');
  span.innerText = 'To-Do를 입력하세요.';
  document.body.append(span);
} else {
  todolist = JSON.parse(savedList);
  renderList();
}

/* 
 * 사용자 입력 값으로 To-Do 생성,
 * 로컬 스토리지에 저장,
 * 페이지 새로고침 및 렌더링
 */
form.addEventListener('submit', event => {
  event.preventDefault();
  makeTodo();
  saveList();
  pageRefresh();
  renderList();
});

/**
 * To-Do 생성 함수.
 * 고유ID, 내용, 완료 여부로 구성.
 * 생성 후 리스트에 추가
 */
function makeTodo() {
  const todo = {
    id: String(Date.now()),
    content: input.value,
    done: false
  };
  input.value = '';
  todolist.push(todo);
}

/** 로컬 스토리지에 리스트 저장 */
function saveList() {
  localStorage.setItem('todolist', JSON.stringify(todolist));
}

/** 페이지 새로고침 */
function pageRefresh() {
  location.reload();
}

/**
 * To-Do 리스트 렌더링 함수.
 * 로컬 스토리지에 저장된 리스트를 페이지에 렌더링.
 * 각 To-Do에 완료 체크박스, 삭제 버튼 요소 추가
 */
function renderList() {
  todolist.map(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    span.innerText = todo.content;
    deleteBtn.innerText = 'X';
    li.id = todo.id;
    li.append(checkBox, span, deleteBtn);
    ul.append(li);

    /* To-Do 완료 여부에 따라 취소선 스타일 추가 */
    if (todo.done === true) {
      checkBox.checked = true;
      span.style.textDecoration = 'line-through';
    } else {
      checkBox.checked = false;
      span.style.textDecoration = 'none';
    }

    deleteBtn.addEventListener('click', deleteTodo);
    checkBox.addEventListener('click', doneTodo);
  });
}

/**
 * To-Do 삭제 함수.
 * 고유ID를 이용해 선택한 To-Do 삭제
 */
function deleteTodo(event) {
  const todoLiId = event.target.parentElement.id;
  todolist = todolist.filter(todo => todo.id !== todoLiId);
  saveList();
  pageRefresh();
  renderList();
}

/**
 * To-Do 완료 체크 함수.
 * 고유ID를 이용해 선택한 To-Do의 완료 또는 미완료 표시
 */
function doneTodo(event) {
  const todoLiId = event.target.parentElement.id;
  todolist.forEach(todo => {
    if (todo.id === todoLiId) {
      todo.done = !todo.done
    }
  });
  saveList();
  pageRefresh();
  renderList();
}