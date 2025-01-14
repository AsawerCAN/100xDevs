function waitT1(t1) {
  return new Promise((resolve, reject) => {
    if (typeof t1 !== "number" || t1 < 0) {
      return reject(new Error("Time must be a non-negative number"));
    }
    setTimeout(() => resolve(`Resolved after ${t1} seconds`), t1 * 1000);
  });
}

function waitT2(t2) {
  return new Promise((resolve, reject) => {
    if (typeof t2 !== "number" || t2 < 0) {
      return reject(new Error("Time must be a non-negative number"));
    }
    setTimeout(() => resolve(`Resolved after ${t2} seconds`), t2 * 1000);
  });
}

function waitT3(t3) {
  return new Promise((resolve, reject) => {
    if (typeof t3 !== "number" || t3 < 0) {
      return reject(new Error("Time must be a non-negative number"));
    }
    setTimeout(() => resolve(`Resolved after ${t3} seconds`), t3 * 1000);
  });
}

function waitForAll(t1, t2, t3) {
  const startTime = Date.now();

  return Promise.all([waitT1(t1), waitT2(t2), waitT3(t3)]).then((results) => {
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    console.log(results);
    return totalTime;
  });
}

module.exports = { waitForAll };
