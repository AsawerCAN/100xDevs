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

function waitForAll(t1, t2, t3) {
  const startTime = Date.now();

  return Promise.all([waitT1(t1), waitT2(t2), waitT3(t3)]).then((results) => {
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    console.log(results);
    return totalTime;
  });
}

waitForAll(2, 3, 5).then((time) => {
  console.log(`Total time taken: ${time} ms`);
});
