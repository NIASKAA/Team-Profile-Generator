const { test, expect } = require("@jest/globals");
const Intern = require("../lib/Intern");

test("Should return role as intern", () => {
    const testRole = "Intern";
    const roleValue = new Intern("test", 10, "test@gmail.com", "test");
    expect(roleValue.getRole()).toBe(testRole);
});

test("Should return school value", () => {
    const testSchool = "Rice";
    const schoolValue = new Intern("test", 10, "test@gmail.com", testSchool);
    expect(schoolValue.getSchool()).toBe(testSchool);
});