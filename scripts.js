// Bell schedule with passing periods
const schedule = {
  monday: [
    { name: "Period 1", start: "7:25 AM", end: "8:10 AM" },
    { name: "Passing", start: "8:10 AM", end: "8:18 AM" },
    { name: "Period 2", start: "8:18 AM", end: "9:03 AM" },
    { name: "Passing", start: "9:03 AM", end: "9:11 AM" },
    { name: "Period 3", start: "9:11 AM", end: "9:56 AM" },
    { name: "Passing", start: "9:56 AM", end: "10:05 AM" },
    { name: "Period 4", start: "10:05 AM", end: "10:49 AM" },
    { name: "Passing", start: "10:49 AM", end: "10:52 AM" },
    { name: "Lunch A", start: "10:52 AM", end: "11:22 AM" },
    { name: "Lunch B", start: "11:23 AM", end: "11:53 AM" },
    { name: "Lunch C", start: "11:54 AM", end: "12:24 PM" },
    { name: "Passing", start: "12:24 PM", end: "12:33 PM" },
    { name: "Period 6", start: "12:33 PM", end: "1:17 PM" },
    { name: "Passing", start: "1:17 PM", end: "1:25 PM" },
    { name: "Period 7", start: "1:25 PM", end: "2:10 PM" }
  ],
  thursday: [
    { name: "Period 1", start: "7:25 AM", end: "8:53 AM" },
    { name: "Passing", start: "8:53 AM", end: "9:00 AM" },
    { name: "Period 3", start: "9:00 AM", end: "10:27 AM" },
    { name: "Passing", start: "10:27 AM", end: "10:30 AM" },
    { name: "Lunch A", start: "10:30 AM", end: "11:00 AM" },
    { name: "Lunch B", start: "11:06 AM", end: "11:36 AM" },
    { name: "Lunch C", start: "12:06 PM", end: "12:36 PM" },
    { name: "Passing", start: "12:36 PM", end: "12:44 PM" },
    { name: "Period 7", start: "12:44 PM", end: "2:10 PM" }
  ],
  friday: [
    { name: "Period 1", start: "7:25 AM", end: "8:53 AM" },
    { name: "Passing", start: "8:53 AM", end: "9:00 AM" },
    { name: "Period 3", start: "9:00 AM", end: "10:27 AM" },
    { name: "Passing", start: "10:27 AM", end: "10:30 AM" },
    { name: "Lunch A", start: "10:30 AM", end: "11:00 AM" },
    { name: "Lunch B", start: "11:06 AM", end: "11:36 AM" },
    { name: "Lunch C", start: "12:06 PM", end: "12:36 PM" }
  ]
};

// Function to format time
function formatTime(time) {
  const [hour, minute, period] = time.match(/(\d+):(\d+)\s(AM|PM)/).slice(1);
  const date = new Date();
  date.setHours(period === "PM" && hour !== "12" ? +hour + 12 : +hour);
  date.setMinutes(+minute);
  return date;
}

// Function to find the current period
function getCurrentPeriod(daySchedule) {
  const now = new Date();
  for (const period of daySchedule) {
    const start = formatTime(period.start);
    const end = formatTime(period.end);
    if (now >= start && now <= end) {
      return { ...period, timeLeft: Math.floor((end - now) / 1000) };
    }
  }
  return null;
}

// Function to render the timer and schedule
function renderTimerAndSchedule() {
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaySchedule = schedule[day] || [];

  const currentPeriod = getCurrentPeriod(todaySchedule);

  const timerRing = document.querySelector(".timer-ring .progress-ring");
  const centerText = document.querySelector(".timer-ring .center-text");

  if (currentPeriod) {
    const percentage = ((currentPeriod.timeLeft / (formatTime(currentPeriod.end) - formatTime(currentPeriod.start))) * 100).toFixed(2);
    timerRing.style.strokeDasharray = `${percentage} 100`;
    centerText.innerHTML = `<h2>${currentPeriod.name}</h2><p>Ends at ${currentPeriod.end}</p>`;
  } else {
    centerText.innerHTML = `<h2>No Current Period</h2>`;
  }

  const nextPeriodIndex = todaySchedule.findIndex(period => formatTime(period.start) > new Date());
  const nextPeriod = todaySchedule[nextPeriodIndex];
  const nextPeriodElement = document.querySelector("#next-period");

  if (nextPeriod) {
    nextPeriodElement.textContent = `Next: ${nextPeriod.name} begins at ${nextPeriod.start}`;
  } else {
    nextPeriodElement.textContent = "School Day Ended";
  }
}

// Initialize the app
function initApp() {
  setInterval(renderTimerAndSchedule, 1000);
  renderTimerAndSchedule();
}

document.addEventListener("DOMContentLoaded", initApp);
