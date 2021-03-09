// done-btn //
const container = document.querySelector(".wrapper ul");
const secondContainer = document.querySelector("#container-2nd ul");
if (container) {
  container.addEventListener("click", function (e) {
    if (e.target.className == "fa fa-check done-btn") {
      if (confirm("Are you done with me?")) {
        // use target.closest when the parent element is different
        const li = e.target.closest("li");
        container.removeChild(li);

        const schedule = li.querySelector(".schedule");
        schedule.innerHTML = `<del>${schedule.textContent}</del>`;
        const option = li.querySelector(".options");
        option.innerHTML = `
          <div class="icons">
            <i class="far fa-clock"> ${time()}</i>
          </div>
          <span class="fa fa-undo done-btn" title="Undo"></span>
        `;

        // append removed todo to finished schedule
        secondContainer.append(li);
      }
    }
  });
}

// undo-btn //
// const secondContainer = document.querySelector("#container-2nd ul");
if (secondContainer) {
  secondContainer.style.opacity = 0.5;
  secondContainer.addEventListener("click", function (e) {
    if (e.target.className == "fa fa-undo done-btn") {
      if (confirm("Sure to undo?")) {
        const li = e.target.closest("li");
        secondContainer.removeChild(li);

        const schedule = li.querySelector(".schedule");
        // schedule.innerHTML = `<del>${schedule.textContent}</del>`;
        schedule.innerHTML = schedule.textContent;
        const options = li.querySelector(".options");
        options.innerHTML = `
          <div class="icons">
            <i class="fa fa-trash" title="Delete"></i>
            <i class="fa fa-edit" title="Edit"></i>
            <i class="far fa-clock" > ${time()}</i>
          </div>
          <span class="fa fa-check done-btn" title="Undo"></span>
        `;
        // append undo to schedule queue
        container.append(li);
      }
    }
  });
}

// delete-btn //
if (container) {
  container.addEventListener("click", function (e) {
    if (e.target.className == "fa fa-trash") {
      if (confirm("want to delete me?")) {
        const li = e.target.closest("li");
        container.removeChild(li);
        schedules.forEach((schedule) => {
          localStorage.removeItem(schedule);
        });
        localStorage.removeItem(schedules.forEach(schedule));
      }
    }
  });
}

const createSchedule = (value) => {
  const li = document.createElement("li");

  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  const schedule = document.createElement("p");
  schedule.classList.add("schedule");

  const options = document.createElement("div");
  options.classList.add("options");

  const optionIcons = document.createElement("div");
  optionIcons.classList.add("icons");

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa fa-trash";
  deleteIcon.setAttribute("title", "Delete");

  const editIcon = document.createElement("i");
  editIcon.className = "fa fa-edit";
  editIcon.setAttribute("title", "Edit");

  const timeStamp = document.createElement("span");
  timeStamp.className = "far fa-clock";

  const doneBtn = document.createElement("span");
  doneBtn.className = "fa fa-check done-btn";
  doneBtn.setAttribute("title", "Done");
  //add textNode
  schedule.innerText = value;
  saveLocalSchedule(value);

  // time stamp
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  timeStamp.appendChild(document.createTextNode(" " + time()));

  // append new elements
  if (value.trim() === null || value.trim() === "") {
    // alert("Please Enter a  schedule.");
    return false;
  } else {
    taskCard.appendChild(schedule);
    taskCard.appendChild(options);
    options.appendChild(optionIcons);
    options.appendChild(doneBtn);
    optionIcons.appendChild(deleteIcon);
    optionIcons.appendChild(editIcon);
    optionIcons.appendChild(timeStamp);

    // appendChild to parent
    li.append(taskCard);
    container.appendChild(li);
  }
};

// add schedule  //
const form = document.querySelector("#add-schedule");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = form.querySelector("textarea").value;
  createSchedule(value);

  // clearing value from textarea
  form.querySelector("textarea").value = "";
});

// hide schedules
// hideBox = document.querySelector("#hide");
// hideBox.addEventListener("change", function (e) {
//   if (hideBox.checked) {
//     container.style.display = "none";
//   } else {
//     container.style.display = "initial";
//   }
// });

function time() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let dn = "";

  // checking for am or pm
  if (hour < 12) {
    dn = "am";
  } else {
    dn = "pm";
  }

  // convert time to 12 hours
  if (hour == 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour = hour - 12;
  }

  hour = checkTime(hour);
  minute = checkTime(minute);

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let timeFormat = hour + ":" + minute + dn;
  return timeFormat;
}

// edit todo
if (container) {
  container.addEventListener("click", function (e) {
    if (e.target.className == "fa fa-edit") {
      const li = e.target.closest("li");
      const schedule = li.querySelector(".schedule");
      let updatedTodo = prompt("Edit Schedule", schedule.textContent);
      if (updatedTodo) {
        schedule.textContent = updatedTodo;
      }
    }
  });
}

// filter items
function filterItems(e) {
  // convert text to lowercase
  let text = e.target.value.toLowerCase();
  // get lis
  let items = container.getElementsByTagName("li");
  //   convert to an Array
  Array.from(items).forEach(function (item) {
    let itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

//clock
function displayTime() {
  ("use strick");
  let d = new Date();
  let a_p = "";
  let hour = d.getHours();
  let minute = d.getMinutes();
  let sec = d.getSeconds();

  if (hour < 12) {
    a_p = " am";
  } else {
    a_p = " pm";
  }

  if (hour == 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour = hour - 12;
  }

  hour = checkTime(hour);
  minute = checkTime(minute);
  sec = checkTime(sec);

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  let time = hour + " : " + minute + " : " + sec + a_p;

  const printTime = document.querySelector(".time");

  printTime.textContent = time;
}
setInterval(displayTime, 1000);

// LocalStorage function
function saveLocalSchedule(schedule) {
  // check if there's anything saved
  let schedules;
  if (localStorage.getItem("schedules")) {
    schedules = JSON.parse(localStorage.getItem("schedules"));
  } else {
    schedules = [];
  }

  schedules.push(schedule);
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

document.addEventListener("DOMContentLoaded", getSchedules);

// Get schedule from the localStorage
function getSchedules() {
  // check if there's anything saved
  let schedules;
  if (localStorage.getItem("schedules")) {
    schedules = JSON.parse(localStorage.getItem("schedules"));
  } else {
    schedules = [];
  }

  schedules.forEach((scheduleItem) => {
    const li = document.createElement("li");

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const schedule = document.createElement("p");
    schedule.classList.add("schedule");

    const options = document.createElement("div");
    options.classList.add("options");

    const optionIcons = document.createElement("div");
    optionIcons.classList.add("icons");

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-trash";
    deleteIcon.setAttribute("title", "Delete");

    const editIcon = document.createElement("i");
    editIcon.className = "fa fa-edit";
    editIcon.setAttribute("title", "Edit");

    const timeStamp = document.createElement("span");
    timeStamp.className = "far fa-clock";

    const doneBtn = document.createElement("span");
    doneBtn.className = "fa fa-check done-btn";
    doneBtn.setAttribute("title", "Done");
    //add textNode
    schedule.innerText = scheduleItem;
    // time stamp
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    timeStamp.appendChild(document.createTextNode(" " + time()));
    if (scheduleItem.trim() === null || scheduleItem.trim() === "") {
      // alert("Please Enter a  schedule.");
      return false;
    } else {
      taskCard.appendChild(schedule);
      taskCard.appendChild(options);
      options.appendChild(optionIcons);
      options.appendChild(doneBtn);
      optionIcons.appendChild(deleteIcon);
      optionIcons.appendChild(editIcon);
      optionIcons.appendChild(timeStamp);

      // appendChild to parent
      li.append(taskCard);
      container.appendChild(li);
    }
  });
}
