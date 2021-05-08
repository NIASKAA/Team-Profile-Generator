const { it, expect, test } = require('@jest/globals');
const { getMaxListeners } = require('node-notifier');
const { describe } = require('yargs');
const Manager = require('../lib/Manager');

    test("Should return manager as role", () => {
        // const test should be the answer you expect jest to test
        const testRole = "Manager";
        // Write out your method in order.. name, id, email, office number for manager..
        const roleValue = new Manager("Test", 1, "test@gmail,com", 100);
        // expect and toBe is the keyword to use for the actual line jest that reads to test. 
        expect(roleValue.getRole()).toBe(testRole);
    });

    test("Should return office phone number", () => {
        const test = 10;
        const roomValue = new Manager("Test", 1, "test@gmail.com", test);
        expect(roomValue.getOfficeNum()).toBe(test);
    });