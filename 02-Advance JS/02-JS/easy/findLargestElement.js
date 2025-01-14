function findLargestElement(numbers) {
  if (numbers.length === 0) {
    throw new Error("Array cannot be empty");
  }

  let largest = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }
  return largest;
}

module.exports = findLargestElement;

// console.log(findLargestElement([2, 3, 7, 9, 5]));
