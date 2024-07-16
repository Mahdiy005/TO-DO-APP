// let taskValue = document.querySelector("input");
// let btn = document.querySelector("button");
// let result = document.querySelector(".result");

// btn.onclick = function (e) {
//   let row = document.createElement("div");
//   let span = document.createElement("span");
//   let del = document.createElement("a");
//   let tasks = []
//   window.localStorage.setItem("tasks",tasks)

//   // check if feild is not empty
//   if (taskValue.value !== "") {
//     // add tesk content to dpan
//     span.append(taskValue.value);
//     // add span and isDone into row
//     row.append(span);
//     del.innerHTML = "Delete";
//     row.append(del);
//     // add row to result div to show tasks
//     result.append(row);
//     // try code to store
//     let arr = window.localStorage.getItem("tasks")
//     console.log(arr);
//     window.localStorage.removeItem("tasks")
//     arr.push({"content":taskValue.value,"del":"Delete"})
//     // console.log(arr);
//     // window.localStorage.setItem("tasks",arr)
//   }
//   // delete task when click to delete button
//   del.onclick = function (e) {
//     e.target.parentElement.remove()
//   }
//   taskValue.value = "";
//   e.preventDefault();

//   // css style
//   row.style.cssText = `display:flex;justify-content:space-between;padding:10px;margin:10px;border-bottom:1px solid #ddd;    font-size: 22px;
//     font-family: sans-serif;
//     color: green;align-items:center`;
//   del.style.cssText = `    display: block;
//     padding: 7px;
//     background: green;
//     color: white;
//     font-weight: bold;
//     border-radius: 7px;font-size:15px;cursor:pointer`;
// };

// // delet task

// Best Solution
let input = document.querySelector(".input");
let submeit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let arrayOfTasks = [];
// window.localStorage.clear()
if(window.localStorage.getItem("tasks")) {
  // for (let i =0; i<JSON.parse(window.localStorage.getItem("tasks")).length;i++) {
  //   arrayOfTasks.push(JSON.parse(window.localStorage.getItem("tasks"))[i])
  // }
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}
console.log(arrayOfTasks);
  // get data from local storage 
  getDataFromLocalStorage()

// add Task when click submit button
submeit.onclick = function (e) {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
  e.preventDefault();
};

tasksDiv.onclick = function(e) {
  console.log(e.target.classList.contains("del"));
  if(e.target.classList.contains("del")) {
    deletTaskFromStorage(e.target.parentElement.dataset.id)
    e.target.parentElement.remove()
    // console.log(e.target.parentElement.dataset.id);
  }
  if(e.target.classList.contains("task")) {
    toggleTaskStatus(e.target.dataset.id)
    e.target.classList.toggle("done")
  }
}

function addTaskToArray(taskValue) {
  // task data
  let task = {
    id: Date.now(),
    title: taskValue,
    completed: false,
  };
  // push task to array
  arrayOfTasks.push(task);
  // add task to page
  addElementToPageForm(arrayOfTasks);
  // add task to local storage
  addDataToLocalStorageFrom(arrayOfTasks);


  // console.log(window.localStorage.getItem("aws"));
  // console.log(typeof JSON.stringify(arrayOfTasks));
  // console.log(JSON.stringify(arrayOfTasks));
  // console.log(JSON.parse(JSON.stringify(arrayOfTasks)));
}

function addElementToPageForm(arr) {
  // remove all content first then display array a s whole
  tasksDiv.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let rowTask = document.createElement("div");
    rowTask.classList.add("task");
    rowTask.setAttribute("data-id", arr[i].id);
    if (arr[i].completed) {
      rowTask.classList.add("done");
    }
    rowTask.append(document.createTextNode(arr[i].title));
    // create delete button
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("Delete"));
    span.classList.add("del");
    rowTask.append(span);
    tasksDiv.append(rowTask);
  }
}
function addDataToLocalStorageFrom(arr) {
  window.localStorage.setItem("tasks",JSON.stringify(arr));
}
function getDataFromLocalStorage() {
  console.log("hello");
  let data = window.localStorage.getItem("tasks")
  if(data) {
    let tasks = JSON.parse(data)
    addElementToPageForm(tasks)
  }
}

function deletTaskFromStorage(id) {
  arrayOfTasks = arrayOfTasks.filter((ele) => ele.id != id)
  addDataToLocalStorageFrom(arrayOfTasks)
}
function toggleTaskStatus(id) {
  for (let i =0; i<arrayOfTasks.length;i++) {
    if(arrayOfTasks[i].id == id) {
      arrayOfTasks[i].completed==false ? arrayOfTasks[i].completed=true : arrayOfTasks[i].completed=false
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks)
}