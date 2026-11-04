const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("case contains six sequential equations and seven suspects", () => {
  const source = fs.readFileSync("app.js", "utf8");
  const equationCount = (source.match(/equation: "/g) || []).length;
  const suspectCount = (source.match(/initials: "/g) || []).length;
  assert.equal(equationCount, 6);
  assert.equal(suspectCount, 7);
});

test("every required interactive region is present", () => {
  const html = fs.readFileSync("index.html", "utf8");
  ["answer-form", "scaffold", "work-steps", "clue-reveal", "suspect-grid", "finale"].forEach((id) => {
    assert.match(html, new RegExp(`id="${id}"`));
  });
});
