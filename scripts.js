// Full simulated bell schedule
const schedule = {
  monday: [
    { name: "Period 1", start: "7:25 AM", end: "8:10 AM" },
    { name: "Passing", start: "8:10 AM", end: "8:18 AM" },
    { name: "Period 2", start: "8:18 AM", end: "9:03 AM" },
    { name: "Passing", start: "9:03 AM", end: "9:11 AM" },
    { name: "Period 3", start: "9:11 AM", end: "9:56 AM" },
    { name: "Passing", start: "9:56 AM", end: "10:05 AM" },
    { name: "Period 4", start: "10:05 AM", end: "10:49 AM" },
    { name: "Lunch A", start: "10:52 AM", end: "11:22 AM" },
    { name: "Lunch B", start: "11:23 AM", end: "11:53 AM" },
    { name: "Lunch C", start: "11:54 AM", end: "12:24 PM" },
    { name: "Period 6", start: "12:33 PM", end: "1:17 PM" },
    { name: "Period 7", start: "1:25 PM", end: "2:10 PM" }
  ],
  tuesday: [
    { name: "Period 1", start: "7:25 AM", end: "8:10 AM" },
    { name: "Passing", start: "8:10 AM", end: "8:18 AM" },
    { name: "Period 2", start: "8:18 AM", end: "9:03 AM" },
    { name: "Passing", start: "9:03 AM", end: "9:11 AM" },
    { name: "Period 3", start: "9:11 AM", end: "9:56 AM" },
    { name: "Passing", start: "9:56 AM", end: "10:05 AM" },
    { name: "Period 4", start: "10:05 AM", end: "10:49 AM" },
    { name: "Lunch A", start: "10:52 AM", end: "11:22 AM" },
    { name: "Lunch B", start: "11:23 AM", end: "11:53 AM" },
    { name: "Lunch C", start: "11:54 AM", end: "12:24 PM" },
    { name: "Period 6", start: "12:33 PM", end: "1:17 PM" },
    { name: "Period 7", start: "1:25 PM", end: "2:10 PM" }
  ],
  wednesday: [
    { name: "Period 1", start: "7:25 AM", end: "8:10 AM" },
    { name: "Passing", start: "8:10 AM", end: "8:18 AM" },
    { name: "Period 2", start: "8:18 AM", end: "9:03 AM" },
    { name: "Passing", start: "9:03 AM", end: "9:11 AM" },
    { name: "Period 3", start: "9:11 AM", end: "9:56 AM" },
    { name: "Passing", start: "9:56 AM", end: "10:05 AM" },
    { name: "Period 4", start: "10:05 AM", end: "10:49 AM" },
    { name: "Lunch A", start: "10:52 AM", end: "11:22 AM" },
    { name: "Lunch B", start: "11:23 AM", end: "11:53 AM" },
    { name: "Lunch C", start: "11:54 AM", end: "12:24 PM" },
    { name: "Period 6", start: "12:33 PM", end: "1:17 PM" },
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

function parseTime(timeStr) {
  const [time, period] = timeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  return period === "PM" && hours !== 12 ? (hours + 12) * 60 + minutes : hours * 60 + minutes;
}

function getCurrentPeriod() {
  const now = new Date();
  const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaySchedule = schedule[today] || [];

  for (const period of todaySchedule) {
    const start = parseTime(period.start);
    const end = parseTime(period.end);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    if (nowMinutes >= start && nowMinutes < end) {
      return period;
    }
  }
  return null;
}

function updateTimer() {
  const now = new Date();
  const timeElement = document.getElementById("current-date");
  const timerElement = document.querySelector(".timer-ring .center-text");
  const progressRing = document.querySelector(".progress-ring");
  const nextPeriodElement = document.getElementById("next-period");

  timeElement.textContent = `Date: ${now.toLocaleDateString()} | Time: ${now.toLocaleTimeString()}`;

  const currentPeriod = getCurrentPeriod();
  if (currentPeriod) {
    const start = parseTime(currentPeriod.start);
    const end = parseTime(currentPeriod.end);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const elapsed = nowMinutes - start;
    const total = end - start;
    const percentage = (elapsed / total) * 100;

    progressRing.style.strokeDasharray = `${percentage} 100`;
    timerElement.innerHTML = `<h2>${currentPeriod.name}</h2><p>Ends at ${currentPeriod.end}</p>`;

    const todaySchedule = schedule[now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()];
    const nextIndex = todaySchedule.findIndex(period => parseTime(period.start) > nowMinutes);
    if (nextIndex !== -1) {
      const nextPeriod = todaySchedule[nextIndex];
      nextPeriodElement.textContent = `Next period: ${nextPeriod.name} starts at ${nextPeriod.start}`;
    } else {
      nextPeriodElement.textContent = "Next period: None";
    }
  } else {
    progressRing.style.strokeDasharray = "0 100";
    timerElement.innerHTML = `<h2>No Current Period</h2>`;
    nextPeriodElement.textContent = "Next period: None";
  }
}

setInterval(updateTimer, 1000);
document.addEventListener("DOMContentLoaded", updateTimer);
