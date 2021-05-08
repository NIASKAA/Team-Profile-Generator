const { test, expect } = require("@jest/globals");
const Engineer = require("../lib/Engineer");

test("should return Engineer as role", () => {
    const testRole = "Engineer";
    const roleValue = new Engineer("test", 10, "test@gmail.com", "github");
    expect(roleValue.getRole()).toBe(testRole);
});

test("Should return github username as github", () => {
    const testGit = "githubuser";
    const gitValue = new Engineer("test", 10, "test@gmail.com", testGit);
    expect(gitValue.getGithub()).toBe(testGit);
});