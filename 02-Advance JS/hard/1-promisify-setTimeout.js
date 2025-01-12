function waitForSeconds(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${n} seconds`);
    }, n * 1000);
  });
}

waitForSeconds(3).then((message) => {
  console.log(message);
});

module.exports = waitForSeconds;
