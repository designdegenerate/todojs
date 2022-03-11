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

//Attach checkboxes to events to toggle its state
const toDoItems = toDoList.querySelectorAll('li input');

for (var i = toDoItems.length - 1; i >= 0; i--) {
  toDoItems[i].addEventListener('change', toggleDone);
};

function createItem(title) {
  // create a label

  console.log('Added new item:', title);

  const itemNum = "todoItem" + parseInt(toDoList.children.length + 1);
  const newLabel = document.createElement('label');
  const newCheckbox = document.createElement('input');
  const newLi = document.createElement('li');

  //create label
  newLabel.setAttribute('for', itemNum);
  newLabel.innerText = title;

  //create checkbox
  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('id', itemNum);
  newCheckbox.setAttribute('name', 'toDoItems');
  newCheckbox.addEventListener('change', toggleDone);

  //append to a new <li> and then to the list
  newLi.appendChild(newCheckbox);
  newLi.appendChild(newLabel);
  toDoList.appendChild(newLi);
}


document
  .querySelector("form")
  .addEventListener("submit", function addNewItem(event){
    event.preventDefault();

    const inputField = document.querySelector('input[type="text"]');
    const newItemTitle = inputField.value;
    createItem(newItemTitle);

    // reset the value of the inputField to make it empty and
    // ready to create new todos
    inputField.value = null;

    updateCounters();
  });


//Update the counters once upon page load
updateCounters();