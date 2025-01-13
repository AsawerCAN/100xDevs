function waitForSeconds(n) {
  return new Promise((resolve, reject) => {
    if (typeof n !== "number" || n < 0) {
      return reject(new Error("Time must be a non-negative number"));
    }
    setTimeout(() => {
      resolve(`Resolved after ${n} seconds`);
    }, n * 1000);
  });
}

module.exports = waitForSeconds;
