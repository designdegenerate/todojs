const toDoList = document.querySelector('#toDoList');

function updateCounters() {

  //Update Total Item Count
  const itemsTotalLabel = document.querySelector('#itemsTotal');
  itemsTotalLabel.textContent = toDoList.children.length;

  //Update completed items
  const itemsDoneLabel = document.querySelector('#itemsDone');
  const itemsDone = document.querySelectorAll('[checked]');
  itemsDoneLabel.textContent = itemsDone.length;

  //Update items not done yet
  const itemsNotDoneLabel = document.querySelector('#itemsNotDone');
  const itemsNotDone = toDoList.querySelectorAll('li:not([data-checked])');
  itemsNotDoneLabel.textContent = itemsNotDone.length;

}

updateCounters();

function toggleDone(event) {

  if (this.hasAttribute('checked')) {
    this.removeAttribute('checked');
    this.parentElement.removeAttribute('data-checked');
  } else {
    this.setAttribute('checked', '');
    this.parentElement.setAttribute('data-checked', '');
  }

  updateCounters();
}

const toDoItems = toDoList.querySelectorAll('li input');

for (var i = toDoItems.length - 1; i >= 0; i--) {
  const toDoItem = toDoItems[i]
  toDoItem.addEventListener('change', toggleDone);
};