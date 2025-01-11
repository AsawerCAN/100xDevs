// Write a function sum that finds the sum of two numbers. Side quest - Try passing in a string instead of a number and see what happens?
function sum(a, b) {
  let total = a + b;
  return total;
}

let result = sum(5, 10);
console.log(result);

let result1 = sum("5", "10");
console.log(result1);

// Write a function called canVote that returns true or false if the age of a user is > 18.

function canVote(age) {
  if (age > 18) {
    return true;
  } else {
    return false;
  }
}

let eligible = canVote(20);
console.log(eligible);
