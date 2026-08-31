/*
 * Simple calculator CLI for the four basic arithmetic operations:
 * addition, subtraction, multiplication, and division.
 *
 * This app accepts an operation name and two numeric operands and prints the result.
 */

function ensureNumber(value, label) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${label}: "${value}". Please provide a valid number.`);
  }

  return parsed;
}

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return a / b;
}

function calculate(operation, left, right) {
  const normalizedOperation = String(operation).toLowerCase();
  const leftNumber = ensureNumber(left, 'left operand');
  const rightNumber = ensureNumber(right, 'right operand');

  switch (normalizedOperation) {
    case 'add':
    case 'plus':
    case 'addition':
      return addition(leftNumber, rightNumber);

    case 'subtract':
    case 'minus':
    case 'subtraction':
      return subtraction(leftNumber, rightNumber);

    case 'multiply':
    case 'times':
    case 'multiplication':
      return multiplication(leftNumber, rightNumber);

    case 'divide':
    case 'division':
      return division(leftNumber, rightNumber);

    default:
      throw new Error(
        `Unsupported operation: "${operation}". Supported operations: add, subtract, multiply, divide.`
      );
  }
}

function printUsage() {
  console.log(
    'Usage: node src/calculator.js <operation> <number1> <number2>\n' +
      'Operations supported: add, subtract, multiply, divide'
  );
}

if (require.main === module) {
  const [, , operation, leftValue, rightValue] = process.argv;

  if (!operation || !leftValue || !rightValue) {
    printUsage();
    process.exit(1);
  }

  try {
    const left = ensureNumber(leftValue, 'left operand');
    const right = ensureNumber(rightValue, 'right operand');
    const result = calculate(operation, left, right);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printUsage();
    process.exit(1);
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  supportedOperations: ['addition', 'subtraction', 'multiplication', 'division']
};
