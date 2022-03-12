const toDoList = document.querySelector('#toDoList');

//Function to handle the statusbar counting
function updateCounters() {

  //Update Total Item Count
  const itemsTotalLabel = document.querySelector('#itemsTotal');
  itemsTotalLabel.textContent = toDoList.children.length;

  //Update completed items
  const itemsDoneLabel = document.querySelector('#itemsDone');
  const itemsDone = document.querySelectorAll('[data-checked]');
  itemsDoneLabel.textContent = itemsDone.length;

  //Update overdue items
  const itemsOverdueLabel = document.querySelector('#itemsOverdue');
  const itemsOverdue = document.querySelectorAll('[data-overdue]:not([data-checked])');
  itemsOverdueLabel.textContent = itemsOverdue.length;

  //Update items not done yet
  const itemsNotDoneLabel = document.querySelector('#itemsNotDone');
  const itemsNotDone = toDoList.querySelectorAll('li:not([data-checked])');
  itemsNotDoneLabel.textContent = itemsNotDone.length;

}

function writeToLocalStorage(element) {

  const localStorageKey = element.id;
  const label = element.nextElementSibling.innerText;
  const complete = element.hasAttribute("checked") ? true : false;
  const date = element.nextElementSibling.nextElementSibling.value;


  //Generate JSON key/value pair
  const localStorageContent = {
    "label": label,
    "complete": complete,
    "date": date
  }

  //Write JSON to local storage
  window.localStorage
    .setItem(localStorageKey, 
      JSON.stringify(localStorageContent));
}

function restoreToDoList() {

  for (var i = localStorage.length - 1; i >= 0; i--) {

    //Get list of key names
    let key = localStorage.key(i);

    //Key name = checkbox element ID
    const itemNum = key;

    //Convert key string back to JSON
    const toDoItem = JSON.parse(localStorage.getItem(key));

    const newLabel = document.createElement('label');
    const newCheckbox = document.createElement('input');
    const newDatePicker = document.createElement('input');
    const newLi = document.createElement('li');
    const localStorageKey = itemNum;

    //create label
    newLabel.setAttribute('for', itemNum);
    newLabel.innerText = toDoItem.label;

    //create checkbox
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.setAttribute('id', itemNum);
    newCheckbox.setAttribute('name', 'toDoItems');
    newCheckbox.addEventListener('change', toggleDone);

    if (toDoItem.complete){
      newCheckbox.setAttribute('checked', '');
      newLi.setAttribute('data-checked', '');
    }

    //Create New Date Picker
    newDatePicker.setAttribute('type', 'date');
    newDatePicker.setAttribute('value', toDoItem.date);
    newDatePicker.addEventListener('change', updateDueDate);

    const today = new Date();
    if (today >= new Date(toDoItem.date)) {
      newLi.setAttribute('data-overdue', '');
    }
    //append to a new <li> and then to the list
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newLabel);
    newLi.appendChild(newDatePicker);
    toDoList.appendChild(newLi);

  }

}

//Runs when new item is created
function createItem(title) {

  const itemNum = "todoItem" + parseInt(toDoList.children.length + 1);
  const newLabel = document.createElement('label');
  const newCheckbox = document.createElement('input');
  const newDatePicker = document.createElement('input');
  const newLi = document.createElement('li');
  const localStorageKey = itemNum;

  //create label
  newLabel.setAttribute('for', itemNum);
  newLabel.innerText = title;

  //create checkbox
  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('id', itemNum);
  newCheckbox.setAttribute('name', 'toDoItems');
  newCheckbox.addEventListener('change', toggleDone);

  //Create New Date Picker
  newDatePicker.setAttribute('type', 'date');
  newDatePicker.setAttribute('value', '');
  newDatePicker.addEventListener('change', updateDueDate);

  //append to a new <li> and then to the list
  newLi.appendChild(newCheckbox);
  newLi.appendChild(newLabel);
  newLi.appendChild(newDatePicker);
  toDoList.appendChild(newLi);

  writeToLocalStorage(newCheckbox);
}

document
  .querySelector('form')
  .addEventListener('submit', function addNewItem(event){
    event.preventDefault();

    const inputField = document.querySelector('input[type="text"]');
    const newItemTitle = inputField.value;
    createItem(newItemTitle);

    // reset the value of the inputField to make it empty and
    // ready to create new todos
    inputField.value = null;

    updateCounters();
  });

//Handles checking/unchecking a checkbox
function toggleDone(event) {

  if (this.hasAttribute('checked')) {
    this.removeAttribute('checked');
    this.parentElement.removeAttribute('data-checked');
    writeToLocalStorage(this);
  } else {
    this.setAttribute('checked', '');
    this.parentElement.setAttribute('data-checked', '');
    writeToLocalStorage(this);
  }

  updateCounters();
}

//Attach checkboxes to events to toggle its state
const toDoItems = toDoList.querySelectorAll('li input[type="checkbox"]');

for (var i = toDoItems.length - 1; i >= 0; i--) {
  toDoItems[i].addEventListener('change', toggleDone);
};

//Delete items if marked done
function cleanUpDoneItems() {
  const itemsDone = document.querySelectorAll('[checked]');

  for (var i = itemsDone.length - 1; i >= 0; i--) {
    itemsDone[i].parentElement.remove();
    window.localStorage.removeItem(itemsDone[i].id);
  }

  updateCounters();
}

//Attach Clean up items function to button
document
  .querySelector('#statusBar li button')
  .addEventListener('click', cleanUpDoneItems);

//Commit date changes to the DOM and update styling
function updateDueDate() {
  this.setAttribute('value', this.value);

  const today = new Date();
  if (today >= new Date(this.value)) {
    this.parentElement.setAttribute('data-overdue', '');
  } else {
    this.parentElement.removeAttribute('data-overdue');
  }

  writeToLocalStorage(this.previousElementSibling.previousElementSibling);
}

const datePickers = document.querySelectorAll('input[type="date"]');

for (var i = datePickers.length - 1; i >= 0; i--) {
  datePickers[i].addEventListener('change', updateDueDate);
}

//Restore To Do List from local storage and update the counters upon page load
restoreToDoList();
updateCounters();