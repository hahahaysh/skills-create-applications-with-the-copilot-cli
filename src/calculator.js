/*
 * Simple calculator CLI for the supported arithmetic operations:
 * addition, subtraction, multiplication, division, modulo,
 * exponentiation (power), and square root.
 *
 * This app accepts an operation name and one or two numeric operands and prints the result.
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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root is not defined for negative numbers.');
  }

  return Math.sqrt(n);
}

function calculate(operation, left, right) {
  const normalizedOperation = String(operation).toLowerCase();
  const unaryOperations = new Set(['sqrt', 'square-root', 'squareroot', 'square root']);

  if (unaryOperations.has(normalizedOperation)) {
    const value = ensureNumber(left, 'value');
    return squareRoot(value);
  }

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

    case 'mod':
    case 'modulo':
    case 'remainder':
      return modulo(leftNumber, rightNumber);

    case 'pow':
    case 'power':
    case 'exponent':
    case 'exponentiation':
      return power(leftNumber, rightNumber);

    default:
      throw new Error(
        `Unsupported operation: "${operation}". Supported operations: add, subtract, multiply, divide, modulo, power, squareRoot.`
      );
  }
}

function printUsage() {
  console.log(
    'Usage:\n' +
      '  node src/calculator.js <operation> <number1> <number2>\n' +
      '  node src/calculator.js squareRoot <number>\n' +
      'Operations supported: add, subtract, multiply, divide, modulo, power, squareRoot'
  );
}

if (require.main === module) {
  const [, , operation, leftValue, rightValue] = process.argv;
  const normalizedOperation = String(operation || '').toLowerCase();
  const unaryOperations = new Set(['sqrt', 'square-root', 'squareroot', 'square root']);

  if (!operation || !leftValue || (!unaryOperations.has(normalizedOperation) && !rightValue)) {
    printUsage();
    process.exit(1);
  }

  try {
    let result;

    if (unaryOperations.has(normalizedOperation)) {
      result = calculate(operation, leftValue);
    } else {
      const left = ensureNumber(leftValue, 'left operand');
      const right = ensureNumber(rightValue, 'right operand');
      result = calculate(operation, left, right);
    }

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
  modulo,
  power,
  squareRoot,
  calculate,
  supportedOperations: [
    'addition',
    'subtraction',
    'multiplication',
    'division',
    'modulo',
    'power',
    'squareRoot'
  ]
};
