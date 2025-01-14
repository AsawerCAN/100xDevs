class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
  }

  subtract(number) {
    this.result -= number;
  }

  multiply(number) {
    this.result *= number;
  }

  divide(number) {
    if (number === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    const sanitizedExpression = expression.replace(/\s+/g, "");

    if (/[^0-9+\-*/().]/.test(sanitizedExpression)) {
      throw new Error("Invalid characters in the expression.");
    }

    try {
      const evaluatedResult = new Function(`return ${sanitizedExpression}`)();
      if (typeof evaluatedResult !== "number" || isNaN(evaluatedResult)) {
        throw new Error("Invalid mathematical expression.");
      }

      this.result = evaluatedResult;
    } catch (error) {
      throw new Error("Error in evaluating the expression: " + error.message);
    }
  }
}

module.exports = Calculator;

const calc = new Calculator();

calc.add(10);
console.log(calc.getResult());

calc.subtract(5);
console.log(calc.getResult());

calc.multiply(3);
console.log(calc.getResult());

calc.divide(5);
console.log(calc.getResult());

calc.clear();
console.log(calc.getResult());

calc.calculate("10 + 2 * (6 - (4 + 1) / 2) + 7");
console.log(calc.getResult());

try {
  calc.calculate("5 + abc");
} catch (error) {
  console.error(error.message);
}
