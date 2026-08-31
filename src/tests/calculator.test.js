const { describe, test, expect } = require('@jest/globals');
const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
} = require('../calculator');

describe('calculator arithmetic operations', () => {
  test('adds two numbers correctly', () => {
    expect(addition(2, 3)).toBe(5);
    expect(addition(-2, 3)).toBe(1);
    expect(addition(0, 0)).toBe(0);
  });

  test('subtracts two numbers correctly', () => {
    expect(subtraction(10, 4)).toBe(6);
    expect(subtraction(3, 9)).toBe(-6);
    expect(subtraction(-5, -2)).toBe(-3);
  });

  test('multiplies two numbers correctly', () => {
    expect(multiplication(45, 2)).toBe(90);
    expect(multiplication(-4, 3)).toBe(-12);
    expect(multiplication(0, 42)).toBe(0);
  });

  test('divides two numbers correctly', () => {
    expect(division(20, 5)).toBe(4);
    expect(division(9, 3)).toBe(3);
    expect(division(-8, 2)).toBe(-4);
  });

  test('supports all basic operations through the calculate helper', () => {
    expect(calculate('add', 2, 3)).toBe(5);
    expect(calculate('subtract', 10, 4)).toBe(6);
    expect(calculate('multiply', 45, 2)).toBe(90);
    expect(calculate('divide', 20, 5)).toBe(4);
  });

  test('handles division by zero gracefully', () => {
    expect(() => division(10, 0)).toThrow('Division by zero is not allowed.');
    expect(() => calculate('divide', 10, 0)).toThrow('Division by zero is not allowed.');
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate('modulo', 10, 2)).toThrow(
      'Unsupported operation: "modulo". Supported operations: add, subtract, multiply, divide.'
    );
  });

  test('validates invalid numeric input', () => {
    expect(() => calculate('add', 'a', 2)).toThrow('Invalid left operand');
    expect(() => calculate('multiply', 4, 'b')).toThrow('Invalid right operand');
  });
});
