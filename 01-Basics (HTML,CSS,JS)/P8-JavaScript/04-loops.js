// Write a function called sum that finds the sum from 1 to a number
function sum(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  return sum;
}

console.log(sum(5));
