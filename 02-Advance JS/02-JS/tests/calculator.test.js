const Calculator = require("./Calculator");

describe("Calculator", () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe("Basic operations", () => {
    it("should add numbers correctly", () => {
      calculator.add(5);
      expect(calculator.getResult()).toBe(5);
    });

    it("should subtract numbers correctly", () => {
      calculator.subtract(3);
      expect(calculator.getResult()).toBe(-3);
    });

    it("should multiply numbers correctly", () => {
      calculator.add(2); // Start with 2
      calculator.multiply(3);
      expect(calculator.getResult()).toBe(6);
    });

    it("should divide numbers correctly", () => {
      calculator.add(10);
      calculator.divide(2);
      expect(calculator.getResult()).toBe(5);
    });

    it("should throw an error when dividing by zero", () => {
      expect(() => calculator.divide(0)).toThrowError(
        "Division by zero is not allowed."
      );
    });

    it("should clear the result", () => {
      calculator.add(10);
      calculator.clear();
      expect(calculator.getResult()).toBe(0);
    });
  });

  describe("Chaining operations", () => {
    it("should handle a sequence of operations correctly", () => {
      calculator.add(10);
      calculator.subtract(5);
      calculator.multiply(2);
      calculator.divide(5);
      expect(calculator.getResult()).toBe(2);
    });
  });

  describe("calculate method", () => {
    it("should evaluate a valid mathematical expression", () => {
      calculator.calculate("5 + 10 - 3 * 2");
      expect(calculator.getResult()).toBe(9);
    });

    it("should ignore whitespace in the expression", () => {
      calculator.calculate("  5 +  10 - 3  *  2  ");
      expect(calculator.getResult()).toBe(9);
    });

    it("should throw an error for invalid characters", () => {
      expect(() => calculator.calculate("5 + 10 - abc")).toThrowError(
        "Invalid characters in the expression."
      );
    });

    it("should throw an error for invalid mathematical expressions", () => {
      expect(() => calculator.calculate("5 +")).toThrowError(
        "Error in evaluating the expression:"
      );
    });

    it("should handle expressions with parentheses correctly", () => {
      calculator.calculate("(5 + 3) * 2");
      expect(calculator.getResult()).toBe(16);
    });

    it("should handle division by zero in expressions and throw an error", () => {
      expect(() => calculator.calculate("10 / 0")).toThrowError(
        "Error in evaluating the expression:"
      );
    });
  });

  describe("Edge cases", () => {
    it("should return 0 when no operations have been performed", () => {
      expect(calculator.getResult()).toBe(0);
    });

    it("should handle a single number as an expression", () => {
      calculator.calculate("42");
      expect(calculator.getResult()).toBe(42);
    });

    it("should handle a very large expression", () => {
      calculator.calculate("1 + 2 * 3 - 4 / 2 + (5 * 6) - (7 + 8) / 2");
      expect(calculator.getResult()).toBeCloseTo(28.5, 5);
    });

    it("should handle negative numbers in the expression", () => {
      calculator.calculate("-5 + (-10) * 2");
      expect(calculator.getResult()).toBe(-25);
    });

    it("should handle decimal numbers in the expression", () => {
      calculator.calculate("5.5 + 2.3 - 1.8");
      expect(calculator.getResult()).toBeCloseTo(6.0, 1);
    });
  });
});
