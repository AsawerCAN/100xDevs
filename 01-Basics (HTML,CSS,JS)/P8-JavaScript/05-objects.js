// Write a function that takes a user as an input and greets them with their name and ag

function greetUser(user) {
  console.log(`Hello ${user.name}, you are ${user.age} years old.`);
}

let user = { name: "Asawer", age: 22 };
greetUser(user);

// Write a function that takes a new object as input which has name, age, and gender and greets the user with their gender (Hi Mr/Mrs/Others harkirat, your age is 21)

function greetings(user1) {
  let title;

  if (user1.gender === "male") {
    title = "Mr";
  } else if (user1.gender === "female") {
    title = "Mrs";
  } else {
    title = "Others";
  }

  console.log(`Hi! ${title} ${user1.name}, your age is ${user1.age}`);
}

let user1 = { name: "John", gender: "male", age: 21 };

greetings(user1);

// Also tell the user if they are legal to vote or not.
function greet(user2) {
  let title;

  if (user2.gender === "male") {
    title = "Mr";
  } else if (user2.gender === "female") {
    title = "Mrs";
  } else {
    title = "Others";
  }

  if (user2.age >= 18) {
    console.log(
      `Hi! ${title} ${user2.name}, your age is ${user2.age}, you are legal to vote.`
    );
  } else {
    console.log(
      `Hi! ${title} ${user2.name}, your age is ${user2.age}, you are not eligible to vote.`
    );
  }
}
let user2 = { name: "Dave", gender: "male", age: 17 };

greet(user2);
