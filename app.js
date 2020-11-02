// done-btn //
const container = document.querySelector(".wrapper ul");
const secondContainer = document.querySelector("#container-2nd ul");
if (container) {
  container.addEventListener("click", function (e) {
    if (e.target.className == "fa fa-check done-btn") {
      if (confirm("Yes, I'm done with you")) {
        // const li = e.target.parentElement.parentElement.parentElement;
        // use target.closest when the parent element are different
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

        // option.innerHTML =
        //   ' <div class="icons"> ' +
        //   '<i class="far fa-clock"> ' +
        //   time() +
        //   "</i>" +
        //   "</div>" +
        //   '<span class="fa fa-undo done-btn" title="Undo"></span>';

        // append removed todo to finished todos
        secondContainer.append(li);
      }
    }
  });
}

// undo-btn //
// const secondContainer = document.querySelector("#container-2nd ul");
if (secondContainer) {
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
        // append undo to schedule todos
        container.append(li);
      }
    }
  });
}

// delete-btn //
if (container) {
  container.addEventListener("click", function (e) {
    if (e.target.className == "fa fa-trash") {
      if (confirm("Sure to delete?")) {
        const li = e.target.closest("li");
        container.removeChild(li);
      }
    }
  });
}

// add schedule  //
const form = document.forms["add-schedule"];
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = form.querySelector("textarea").value;

  // add new elements and classes
  const li = document.createElement("li");

  const taskCard = document.createElement("div");
  taskCard.className = "task-card";

  const schedule = document.createElement("p");
  schedule.className = "schedule";

  const options = document.createElement("div");
  options.className = "options";

  const optionIcons = document.createElement("div");
  optionIcons.className = "icons";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa fa-trash";
  deleteIcon.setAttribute("title", "Delete");

  const editIcon = document.createElement("i");
  editIcon.className = "fa fa-edit";
  editIcon.setAttribute("title", "Edit");

  const timeStamp = document.createElement("i");
  timeStamp.className = "far fa-clock";

  const doneBtn = document.createElement("span");
  doneBtn.className = "fa fa-check done-btn";
  doneBtn.setAttribute("title", "Done");
  //add textnode
  schedule.appendChild(document.createTextNode(value));

  // time stamp
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  timeStamp.appendChild(document.createTextNode(" " + time()));

  // append new elements
  if (value.trim() === null || value.trim() === "") {
    alert("Please Enter a valid schedule.");
    return false;
  }

  {
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

  // clearing value from textarea
  form.querySelector("textarea").value = "";
});

// hide schedules
hideBox = document.querySelector("#hide");
hideBox.addEventListener("change", function (e) {
  if (hideBox.checked) {
    container.style.display = "none";
  } else {
    container.style.display = "initial";
  }
});

function time() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let h = hours;
  let m = minutes;
  let dn;

  if (Number(hours) > 12) {
    h = Number(hours) - 12;
    if (Number(hours) < 10) {
      h = "0" + h;
    }
    dn = "pm";
  } else if (Number(hours) == 0) {
    h = 12;
    dn = "am";
  } else if (Number(hours) == 12) {
    dn = "pm";
  } else {
    dn = "am";
  }

  let formattedTime = h + ":" + m + " " + dn;
  return formattedTime;
}

// edit todo
if (container) {
  container.addEventListener("click", function (e) {
    if (e.target.className == "fa fa-edit") {
      const li = e.target.closest("li");
      const schedule = li.querySelector(".schedule");
      let updatedTodo = prompt("Edit Todo", schedule.textContent);
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
