import { Selector, Role } from "testcafe";

const regularUser = Role("http://localhost:3000/test-login", async t =>
  t.click("button")
);

fixture`view page`.page`http://localhost:3000/view`;

test("logged out message", async t =>
  t.expect(Selector("[data-testid=message]").innerText).eql("Not logged in"));

test("logged in message", async t =>
  t
    .useRole(regularUser)
    .navigateTo("http://localhost:3000/view")
    .expect(Selector("[data-testid=message]").innerText)
    .eql("Logged in"));
