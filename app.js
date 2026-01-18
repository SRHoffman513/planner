
//**********************************************
//Global State
//**********************************************

let selectedDate = null;

//**********************************************
//View / Navigation Logic
//**********************************************

function showView(viewId) {
  const views = ["welcomePage", "monthView", "dayView"];

  views.forEach(id => {
    document.getElementById(id).style.display = 
      id === viewId ? "block" : "none";
  });
}

//**********************************************
//Event Wiring (Navigation) - Buttons
//**********************************************


//These buttons are on the welcome page
  document.getElementById("openMonthViewBtn")
    .addEventListener("click", () => {
      showView("monthView");
      buildCalendar();
    });

  document.getElementById("viewTodayBtn")
    .addEventListener("click", () => {
      selectedDate = new Date();
      showView("dayView");
      buildDayView();
    })

//This button is on the planner page - brings you back to the monthView
  document.getElementById("backBtn")
  .addEventListener("click", () => {
    showView("monthView");
  });

//**********************************************
//App Initialization
//**********************************************

document.addEventListener("DOMContentLoaded", () => {
  showView("welcomePage");
  buildCalendar();
});

//**********************************************
//Month View (Calendar)
//**********************************************

function buildCalendar() {
  const calendar = document.getElementById("calendar");
  const monthLabel = document.getElementById("monthLabel");
  const headers = document.getElementById("calendarHeaders");

  calendar.innerHTML = "";
  headers.innerHTML = "";

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  monthLabel.textContent = `${monthNames[month]} ${year}`;

  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];

//Day Headers
for (let day of daysOfWeek) {
  const header = document.createElement("div");
  header.textContent = day;
  header.className = "header";
  headers.appendChild(header);
}

  const firstDay = new Date(year, month, 1).getDate();
  const daysinMonth = new Date(year, month + 1, 0).getDate();

  //blank cells before month starts
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  //actual days
  for (let day = 1; day <= daysinMonth; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.className = "day";

    cell.addEventListener("click", () => {
      selectedDate = new Date(year, month, day);
      showView("dayView");
      buildDayView();
    });

    calendar.appendChild(cell);
  }
}

//**********************************************
//Day View (Hourly Planner)
//**********************************************

function buildDayView() {
  const dayLabel = document.getElementById("dayLabel");
  const planner = document.getElementById("hourlyPlanner");

  planner.innerHTML = "";

  const options = { 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  };

  dayLabel.textContent = 
    selectedDate.toLocaleDateString(undefined, options);

  for (let hour =0; hour <= 24; hour++) {
    const row = document.createElement("div");
    row.className = "hour";

    const time = document.createElement("div");
    time.className = "time";
    
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const suffix = hour < 12 ? "a" : "p";

    time.textContent = `${displayHour}${suffix}`;

    const slot = document.createElement("div");
    slot.className = "slot";
    slot.contentEditable = true;
    slot.dataset.hour = hour;

    row.appendChild(time);
    row.appendChild(slot);
    planner.appendChild(row);
  }
}

//**********************************************
//Inactive Code
//**********************************************


// When the page loads, restore saved entry
//document.addEventListener("DOMContentLoaded", loadEntry);

// Wire up the Save button
//document.getElementById("saveBtn").addEventListener("click", saveEntry);

//function saveEntry() {
  //const text = document.getElementById("entry").value;

  // Save to browser storage
  //localStorage.setItem("journalEntry", text);

  //console.log("Entry saved");
//}

//function loadEntry() {
  //const savedText = localStorage.getItem("journalEntry");

  //if (savedText) {
    //document.getElementById("entry").value = savedText;
    //console.log("Entry loaded");
  //}
//}