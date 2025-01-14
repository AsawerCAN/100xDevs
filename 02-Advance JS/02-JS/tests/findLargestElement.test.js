const findLargestElement = require("../easy/findLargestElement");

describe("findLargestElement", () => {
  it("should return the only element for an array with one element", () => {
    expect(findLargestElement([5])).toBe(5);
  });

  it("should return the largest number in an array with positive numbers", () => {
    expect(findLargestElement([1, 2, 3, 4, 5])).toBe(5);
  });

  it("should return the largest number in an array with mixed numbers", () => {
    expect(findLargestElement([-10, -20, 5, 3, -1])).toBe(5);
  });

  it("should return the largest number in an array with all negative numbers", () => {
    expect(findLargestElement([-10, -5, -1, -20])).toBe(-1);
  });

  it("should return the largest number even if it appears multiple times", () => {
    expect(findLargestElement([1, 3, 3, 3, 2])).toBe(3);
  });

  it("should return 0 if all numbers are zero", () => {
    expect(findLargestElement([0, 0, 0, 0])).toBe(0);
  });

  it("should throw an error for an empty array", () => {
    expect(() => findLargestElement([])).toThrow("Array cannot be empty");
  });

  it("should return the largest number in a large array", () => {
    const largeArray = Array.from({ length: 100000 }, (_, i) => i);
    expect(findLargestElement(largeArray)).toBe(99999);
  });
});
