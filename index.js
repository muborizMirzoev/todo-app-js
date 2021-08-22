const input = document.querySelector('input');
const form = document.querySelector('#form');
const todos = document.querySelector('#todos');

const storageTodos = JSON.parse(localStorage.getItem('todos'));
if (storageTodos) {
   storageTodos.forEach(todo => {
      addNewTodo(todo)
   })
}

function addNewTodo(data = {}) {
   const li = document.createElement('li');
   li.classList.add('todo__item');
   li.classList.add('new-item')

   li.innerText = input.value || data.text
   todos.append(li);
   updateLocalStorage();
   data.status ? li.classList.add('completed') : '';

   li.addEventListener('click', () => {
      li.classList.toggle('completed');
      updateLocalStorage()
   });

   li.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      li.classList.add('removed-item');
      setTimeout(() => li.remove(), 500)
      updateLocalStorage();
   });
   input.value = '';
}

form.addEventListener('submit', (e) => {
   e.preventDefault();
   addNewTodo()
});

function updateLocalStorage() {
   const todoItems = document.querySelectorAll('.todo__item');
   const todos = [];
   todoItems.forEach(item => {
      todos.push({
         text: item.innerText,
         status: item.classList.contains('completed')
      });
   });
   localStorage.setItem('todos', JSON.stringify(todos));
}