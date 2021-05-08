const { test, expect } = require('@jest/globals');
const Employee = require('../lib/Employee');

test("Check to see if name will return a value", () => {
    const testName = "Bob";
    const nameValue = new Employee(testName, 1, "test@gmail.com");
    expect(nameValue.getName()).toBe(testName);
});

test("Check to see if ID will return a value", () => {
    const testID = 5;
    const idValue = new Employee("test", testID, "test@gmail.com");
    expect(idValue.getID()).toBe(testID);
});

test("Check to see if email will return a value", () => {
    const testEmail = "ElonMusk@mgail.com";
    const emailValue = new Employee("test", 10, testEmail);
    expect(emailValue.getEmail()).toBe(testEmail);
});