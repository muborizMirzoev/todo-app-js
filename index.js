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

   li.innerHTML = `
      <p class="todo__text" contentEditable="false">${input.value || data.text} </p>
      <button class="edit" type="button"><i class="fas fa-edit"></i></button>
      <button class="delete" type="button"><i class="fas fa-trash-alt"></i></button>
   `
   todos.append(li);
   updateLocalStorage();
   data.status ? li.classList.add('completed') : '';

   li.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.edit')) {

         const todoText = target.closest('.edit').previousElementSibling;
         if (todoText.contentEditable === 'false') {
            todoText.contentEditable = true;
            todoText.focus();
            todoText.style.backgroundColor = '#E0E0E0';
            todoText.style.border = '1px dotted black';
         } else {
            todoText.contentEditable = false;
            todoText.style.backgroundColor = '';
            todoText.style.border = '';
            updateLocalStorage()
         }

      } else if (target.closest('.delete')) {
         deleteTodo(e);
         updateLocalStorage();
      } else {
         // li.classList.toggle('completed');
         // updateLocalStorage()
      }
   });

   li.addEventListener('contextmenu', deleteTodo);

   function deleteTodo(e) {
      console.log(e)
      e.preventDefault()
      li.classList.add('removed-item');
      setTimeout(() => li.remove(), 500)
      updateLocalStorage();
   }
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