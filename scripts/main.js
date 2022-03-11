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
  console.log('test');

  // get the checkbox from the event object


/*

  if (checkbox.checked) {
    // change the checkbox so that it shows up as completed
  } else {
    // change the checkbox so that it shows up as todo
  }

*/


  updateCounter();
}

const toDoItems = toDoList.querySelectorAll('li input');

for (var i = toDoItems.length - 1; i >= 0; i--) {
  const toDoItem = toDoItems[i]

  toDoItem.addEventListener('input', console.log('test'));
};

// add a "change" event listener to every checkbox,
// and use the "toggleDone" function as the callback