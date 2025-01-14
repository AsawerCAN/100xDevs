function calculateTime(n) {
  const beforeTime = Date.now();

  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }

  const afterTime = Date.now();

  let timeTaken = (afterTime - beforeTime) / 1000;

  return timeTaken;
}

console.log(calculateTime(100));
// console.log(calculateTime(1000000));
// console.log(calculateTime(10000000000));
