// unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

// phone number tests
test('valid phone with full format and dashes', () => {
  expect(isPhoneNumber('123-456-7890')).toBe(true);
});

test('valid phone with parens area code', () => {
  expect(isPhoneNumber('(858) 246-7890')).toBe(true);
});

test('invalid phone - just letters', () => {
  expect(isPhoneNumber('hello world')).toBe(false);
});

test('invalid phone - way too short', () => {
  expect(isPhoneNumber('12-34')).toBe(false);
});

// email tests
test('valid email - normal gmail', () => {
  expect(isEmail('omarm@gmail.com')).toBe(true);
});

test('valid email - 2 letter tld', () => {
  expect(isEmail('person@school.io')).toBe(true);
});

test('invalid email - no @ sign', () => {
  expect(isEmail('omarm.gmail.com')).toBe(false);
});

test('invalid email - tld too long', () => {
  expect(isEmail('omarm@gmail.compp')).toBe(false);
});

// strong password tests
test('valid password - letters and numbers', () => {
  expect(isStrongPassword('Pass1234')).toBe(true);
});

test('valid password - exactly 4 chars starting with letter', () => {
  expect(isStrongPassword('abcd')).toBe(true);
});

test('invalid password - starts with a digit', () => {
  expect(isStrongPassword('1abcd')).toBe(false);
});

test('invalid password - has special char', () => {
  expect(isStrongPassword('hello!')).toBe(false);
});

// date tests
test('valid date - normal format', () => {
  expect(isDate('12/25/2024')).toBe(true);
});

test('valid date - single digit month and day', () => {
  expect(isDate('1/1/2024')).toBe(true);
});

test('invalid date - dashes instead of slashes', () => {
  expect(isDate('12-25-2024')).toBe(false);
});

test('invalid date - 2 digit year', () => {
  expect(isDate('12/25/24')).toBe(false);
});

// hex color tests
test('valid hex - 6 char with hash', () => {
  expect(isHexColor('#abcdef')).toBe(true);
});

test('valid hex - 3 char no hash', () => {
  expect(isHexColor('FFF')).toBe(true);
});

test('invalid hex - has letter outside a-f', () => {
  expect(isHexColor('#GGGGGG')).toBe(false);
});

test('invalid hex - wrong length', () => {
  expect(isHexColor('#12345')).toBe(false);
});
