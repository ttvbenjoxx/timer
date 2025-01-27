// Simulated schedule data
const schedule = [
  { time: "8:00 AM", event: "Morning Bell" },
  { time: "12:00 PM", event: "Lunch Break" },
  { time: "3:00 PM", event: "End of School" },
];

// Function to format time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById("current-time").textContent = timeString;
}

// Function to render the schedule
function renderSchedule() {
  const scheduleList = document.getElementById("schedule-list");
  scheduleList.innerHTML = ""; // Clear existing items

  schedule.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.time} - ${item.event}`;
    scheduleList.appendChild(listItem);
  });
}

// Initialize the app
function initApp() {
  renderSchedule();
  updateTime();
  setInterval(updateTime, 1000); // Update the time every second
}

// Run the app once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
