function busyWait(milliseconds) {
  return new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || milliseconds < 0) {
      return reject(new Error("Time must be a non-negative number"));
    }
    const start = Date.now();
    while (Date.now() - start < milliseconds) {}
    resolve(`Waited for ${milliseconds} milliseconds`);
  });
}

module.exports = busyWait;

// not recommended to use busyWait function as it will block the event loop
// and can cause performance issues
