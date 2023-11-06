"use strict";

//create main section
let mainSection = document.createElement("main");

//create Form
let form = document.createElement("form");
form.className = "flex items-center justify-center mt-10 my-10 gap-5"

//create div to wrap search and filter
let divWrap = document.createElement('div');

//Add Search Bar
let todoSearch = createInput("search", "Search Task", "searchItem");

//Add Input bar
let todoInput = createInput("text", "Add Task", "todoSearchBar");

//Add Button
let addButton = createButton(
  "Submit",
  "Add",
  "w-24 h-11 rounded-md bg-gray-500 text-white absolute ml-[281px]"
);

//Add Filter button
let selectbutton = createSelect("filter", "filters", [
  "All",
  "Completed",
  "Incompleted",
]);

//Add counter for index td
let counter = 1;

//function to create input
function createInput(type, placeholder, id) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("id", id);
  input.setAttribute("autocomplete", "off");
  input.setAttribute(
    "class",
    "w-96 h-12 px-4 border-2 rounded-md border-gray-2 outline-none relative"
  );
  return input;
}

//function to create button
function createButton(type, text, className) {
  const button = document.createElement("button");
  button.setAttribute("type", type);
  button.textContent = text;
  button.className = className;
  return button;
}

//function to create select and option
function createSelect(name, id, options) {
  const select = document.createElement("select");
  select.setAttribute("name", name);
  select.setAttribute("id", id);
  select.setAttribute("class", "h-11 rounded-md p-2");
  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.textContent = optionText;
    select.appendChild(option);
  });
  return select;
}

//append the input, button and select to the form
form.append(todoInput, addButton);

divWrap.append(todoSearch, selectbutton)
divWrap.className = "flex items-center justify-between gap-4 max-w-3xl mx-auto mb-5";

//create table element
let tableTag = document.createElement("table");
tableTag.setAttribute(
  "class",
  " flex justify-center m-auto w-2/4 rounded-lg bg-white shadow-xl max-h-96 overflow-auto"
);

//create tbody
let tBody = document.createElement("tbody");
tBody.setAttribute("class", "divide-y-2 divide-gray-200 w-full h-full");

//append form and table to main section
mainSection.append(form, divWrap, tableTag);

//append main to body
document.body.appendChild(mainSection);

//function to get items from local storage
function loadLocalStorage() {
  const storedData = localStorage.getItem("data");
  console.log(typeof storedData)
  if (storedData) {
    arrFilter = JSON.parse(storedData);
    arrFilter.forEach((task) => {
      addTaskToTable(task);

      // Add style
      if (task.style) {
        const tr = tBody.lastChild;
        const tdTag = tr.getElementsByTagName("td")[1];
        tdTag.style.textDecoration = task.style;
      }
    });
  }
}

function clearTable() {
  while (tBody.firstChild) {
    tBody.firstChild.remove();
  }
  counter = 1;
  updateTaskNumbers();
}

//function to filter items
function filterTasks() {
  const filterValue = selectbutton.value;
  const searchTerm = todoSearch.value.trim().toLowerCase();
  let filteredTasks = arrFilter;
  if (filterValue === "Completed") {
    filteredTasks = arrFilter.filter((task) => task.complete === 1);
    counter = 1;
  } else if (filterValue === "Incompleted") {
    filteredTasks = arrFilter.filter((task) => task.complete === 0);
    counter = 1;
  }
  if (searchTerm) {
    filteredTasks = filteredTasks.filter((task) =>
      task.taskName.toLowerCase().startsWith(searchTerm)
    );
  }
  clearTable();
  counter = 1;
  filteredTasks.forEach(addTaskToTable);
}

//function to create td tag and td attributes

function tdAttributes() {
  let td = document.createElement("td");
  td.setAttribute("class", "px-10 py-4 ");
  return td;
}

let arrFilter = [];
let completeIncomplete = 0;

// Load data from local storage when the page loads
window.addEventListener("load", loadLocalStorage());

addButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (todoInput.value.trim() === "" ) {
    alert("You Must Write Something");
    todoInput.value = "";
  } else {
    let tdObj = {};
    tdObj.unique = Date.now();
    tdObj.taskName = todoInput.value;
    tdObj.complete = completeIncomplete;

    arrFilter.unshift(tdObj);
    counter = 1;
    clearTable();
    arrFilter.forEach(addTaskToTable);
    saveDate();
    todoInput.value = "";
  }
});

todoSearch.addEventListener("input", function () {
  const searchTerm = todoSearch.value.toLowerCase();

  const filteredTasks = arrFilter.filter((task) =>
    task.taskName.toLowerCase().startsWith(searchTerm)
  );

  clearTable();
  counter = 1;
  filteredTasks.forEach(addTaskToTable);
});

todoSearch.addEventListener("input", function () {
  const searchTerm = todoSearch.value.toLowerCase();

  if (searchTerm === "") {
    clearTable();
    counter = 1;
    arrFilter.forEach(addTaskToTable);
  }
});

function updateTaskNumbers() {
  const rows = tBody.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    const tds = rows[i].getElementsByTagName("td");
    if (tds.length > 1) {
      tds[0].textContent = i + 1;
    }
  }
}

function addTaskToTable(taskObj) {
  //create tr td tags
  let trTag = document.createElement("tr");
  trTag.setAttribute("class", "flex justify-between hover:bg-gray-100");

  //First td and assigning value of task Name
  let tdTag = tdAttributes();
  tdTag.innerHTML = taskObj.taskName;

  //Second td for complete and incomplete task button
  let tdComplete = document.createElement("td");
  tdComplete.setAttribute("class", "px-6 py-2 flex gap-14");
  let tdNumber = tdAttributes();
  tdNumber.textContent = counter;
  counter++;

  //   create complete incomplete button
  let tdButton = createButton(
    "button",
    "complete",
    "w-24 h-11 rounded-md bg-gray-500 text-white"
  );
  tdButton.textContent = taskObj.complete === 0 ? "Complete" : "Incomplete";

  //create delete button
  let tdDelete = createButton(
    "button",
    "Delete",
    "w-24 h-11 rounded-md bg-red-500 text-white"
  );

  //Add Delete Functionality
  tdDelete.addEventListener("click", function () {
    const index = arrFilter.findIndex((task) => task.unique === taskObj.unique);
    if (index !== -1) {
      arrFilter.splice(index, 1);
      console.log(tBody);
      trTag.remove();
      saveDate();
      updateTaskNumbers();
    }
  });

  //Add complete and incomplete task functionality
  tdButton.addEventListener("click", function () {
    if (taskObj.complete === 0) {
      taskObj.style = "line-through";
      taskObj.complete = 1;
    } else {
      taskObj.style = "none";
      taskObj.complete = 0;
    }
    tdTag.style.textDecoration = taskObj.style;
    tdButton.textContent = taskObj.complete === 0 ? "Complete" : "Incomplete";
    tdButton.className =
      taskObj.complete === 0
        ? "w-24 h-11 rounded-md bg-gray-500 text-white"
        : "w-24 h-11 rounded-md bg-red-500 text-white";

    const index = arrFilter.findIndex((task) => task.unique === taskObj.unique);
    if (index !== -1) {
      arrFilter[index].complete = taskObj.complete;
      saveDate();
    }
  });

  //Add filter functionality
  selectbutton.addEventListener("click", filterTasks);

  //Append tr td and buttons
  tdComplete.append(tdButton, tdDelete);
  trTag.append(tdNumber, tdTag, tdComplete);
  tBody.appendChild(trTag);
  tableTag.appendChild(tBody);

  if (selectbutton.value) {
    if (taskObj.complete === 1) {
      tdTag.style.textDecoration = "line-through";
      tdButton.className = "w-24 h-11 rounded-md bg-red-500 text-white";
    } else if (taskObj.complete === 0) {
      tdButton.className = "w-24 h-11 rounded-md bg-gray-500 text-white";
    }
  }
}

function saveDate() {
  localStorage.setItem("data", JSON.stringify(arrFilter));
}
