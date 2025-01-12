function waitT1(t1) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Resolved after ${t1} seconds`), t1 * 1000);
  });
}

function waitT2(t2) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Resolved after ${t2} seconds`), t2 * 1000);
  });
}

function waitT3(t3) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Resolved after ${t3} seconds`), t3 * 1000);
  });
}

function waitSequentially(t1, t2, t3) {
  const startTime = Date.now();

  return waitT1(t1)
    .then((result1) => {
      console.log(result1);
      return waitT2(t2);
    })
    .then((result2) => {
      console.log(result2);
      return waitT3(t3);
    })
    .then((result3) => {
      console.log(result3);
      const endTime = Date.now();
      return endTime - startTime;
    });
}

function waitForAll(t1, t2, t3) {
  const startTime = Date.now();

  return Promise.all([waitT1(t1), waitT2(t2), waitT3(t3)]).then((results) => {
    results.forEach((result) => console.log(result));
    const endTime = Date.now();
    return endTime - startTime;
  });
}

console.log("Running promises sequentially:");
waitSequentially(2, 3, 5).then((time) => {
  console.log(`Total time for sequential execution: ${time} ms`);

  console.log("\nRunning promises in parallel:");
  waitForAll(2, 3, 5).then((time) => {
    console.log(`Total time for parallel execution: ${time} ms`);
  });
});
