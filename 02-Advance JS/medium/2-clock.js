function formatTime(hour, minute, second) {
  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}`;
}

function format12Hour(hour, minute, second) {
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second} ${ampm}`;
}

function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  console.log("24-hour format:", formatTime(hour, minute, second));

  console.log("12-hour format:", format12Hour(hour, minute, second));
}
setInterval(updateClock, 1000);

updateClock();
