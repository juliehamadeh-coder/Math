const suspects = [
  { name: "Dr. Hollow", role: "Science teacher", initials: "DH", traits: ["Wears glasses", "White coat", "Usually on second floor"] },
  { name: "Ms. Ivy", role: "Librarian", initials: "MI", traits: ["Wears glasses", "Green cardigan", "Works in east wing"] },
  { name: "Coach Bramble", role: "Gym teacher", initials: "CB", traits: ["White shoes", "Red tracksuit", "Often outdoors"] },
  { name: "Principal Vale", role: "Principal", initials: "PV", traits: ["Wears a badge", "Navy jacket", "Works in main office"] },
  { name: "Chef Rowan", role: "Cafeteria chef", initials: "CR", traits: ["White shoes", "Striped apron", "Works in west hall"] },
  { name: "Juno Bell", role: "Student reporter", initials: "JB", traits: ["Wears a badge", "Yellow jacket", "Often outdoors"] },
  { name: "Rory Fox", role: "Student helper", initials: "RF", traits: ["Wears glasses", "Black hoodie", "Works in west hall"] }
];

const clues = [
  {
    location: "FOUND: STAFF ROOM DOOR",
    scene: "A torn hall pass was wedged beneath the staff room door. A hurried equation is written across the back.",
    equation: "3x + 5 = 26",
    variable: "x",
    answer: 7,
    suspect: 0,
    title: "The lab log tells the truth",
    clue: "Locker 7 contains an alibi. Compare every detail with the suspect profiles—one clue alone is not enough.",
    hints: [
      { label: "CLOTHING", text: "The person wore a white coat and glasses." },
      { label: "LOCATION", text: "They were in Science Lab B on the second floor." },
      { label: "CONFIRMATION", text: "Six students signed the experiment log at 12:07." }
    ],
    hint: "Start by undoing the +5. Subtract 5 from both sides. What is 26 − 5? Then divide both sides by 3."
  },
  {
    location: "FOUND: INSIDE LOCKER 7",
    scene: "A library checkout slip is tucked behind the lab log. One line has been circled in red ink.",
    equation: "4(y − 2) = 24",
    variable: "y",
    answer: 8,
    suspect: 1,
    title: "A timestamp in the stacks",
    clue: "Shelf camera 8 holds another alibi. Match the complete description to a dossier.",
    hints: [
      { label: "CLOTHING", text: "The person wore glasses and a green cardigan." },
      { label: "LOCATION", text: "They were at the library desk in the east wing." },
      { label: "CONFIRMATION", text: "Their card scanned books from 12:03 to 12:11." }
    ],
    hint: "Undo the multiplication first: divide both sides by 4. You’ll get y − 2 = 6. What must you add to both sides?"
  },
  {
    location: "FOUND: LIBRARY SHELF 8",
    scene: "Behind a dusty atlas is a stopwatch card from the gym. The pencil marks look fresh.",
    equation: "5n − 7 = 2n + 14",
    variable: "n",
    answer: 7,
    suspect: 2,
    title: "The whistle was heard",
    clue: "Page 7 holds a track attendance sheet. Decide which profile matches every detail.",
    hints: [
      { label: "CLOTHING", text: "The person wore white shoes and a red tracksuit." },
      { label: "LOCATION", text: "They were outside on the running track." },
      { label: "CONFIRMATION", text: "A stopwatch recorded their relay lap at 12:07." }
    ],
    hint: "Collect the variable terms: subtract 2n from both sides. Then add 7 to both sides. You should reach 3n = 21."
  },
  {
    location: "FOUND: TRACK CLIPBOARD",
    scene: "A meeting agenda is clipped beneath the attendance sheet. A coffee ring surrounds one equation.",
    equation: "m ÷ 3 + 4 = 9",
    variable: "m",
    answer: 15,
    suspect: 3,
    title: "The office call",
    clue: "Extension 15 recorded a call during the theft. Use all three details to identify the alibi.",
    hints: [
      { label: "CLOTHING", text: "The person wore a navy jacket and a school badge." },
      { label: "LOCATION", text: "They stayed in the main office behind a glass door." },
      { label: "CONFIRMATION", text: "A recorded parent call lasted from 11:58 to 12:14." }
    ],
    hint: "Remove the +4 by subtracting 4 from both sides. Once m ÷ 3 = 5, multiply both sides by 3."
  },
  {
    location: "FOUND: PRINCIPAL’S PHONE LOG",
    scene: "The call log mentions a sealed delivery receipt in the kitchen. Flour dust hides part of the note.",
    equation: "2(3p + 1) = 26",
    variable: "p",
    answer: 4,
    suspect: 4,
    title: "A delivery across town",
    clue: "Receipt 4 records a delivery at the exact time of the theft. Which dossier fits it?",
    hints: [
      { label: "CLOTHING", text: "The person wore white shoes and a striped apron." },
      { label: "LOCATION", text: "They were at the west-hall loading dock." },
      { label: "CONFIRMATION", text: "A driver’s receipt and dock camera both show 12:07." }
    ],
    hint: "Divide both sides by 2 first. Then 3p + 1 = 13. Subtract 1, and divide the result by 3."
  },
  {
    location: "FOUND: KITCHEN RECEIPT 4",
    scene: "A reporter’s notebook lies beside the delivery boxes. Its final page contains the last equation—and the last alibi.",
    equation: "7 + 2q = 3q − 5",
    variable: "q",
    answer: 12,
    suspect: 5,
    title: "The photograph doesn’t blink",
    clue: "Photo 12 contains the final alibi. Compare it carefully before making the last exclusion.",
    hints: [
      { label: "CLOTHING", text: "The person wore a yellow jacket and a press badge." },
      { label: "LOCATION", text: "They were outdoors on the soccer field." },
      { label: "CONFIRMATION", text: "A team photograph includes them at exactly 12:07." }
    ],
    hint: "Subtract 2q from both sides, leaving 7 = q − 5. What should you add to both sides to isolate q?"
  }
];

let current = 0;
let cleared = new Set();
let attempts = 0;
let selectedSuspect = null;

const $ = (selector) => document.querySelector(selector);
const grid = $("#suspect-grid");
const answer = $("#answer");
const feedback = $("#answer-feedback");
const scaffold = $("#scaffold");
const reveal = $("#clue-reveal");

function renderSuspects() {
  grid.innerHTML = suspects.map((suspect, index) => `
    <button type="button" class="suspect ${cleared.has(index) ? "cleared" : ""} ${selectedSuspect === index ? "selected" : ""}" data-suspect="${index}" ${cleared.has(index) ? "disabled" : ""}>
      <div class="portrait">${suspect.initials}</div>
      <strong>${suspect.name}</strong>
      <small>${suspect.role}</small>
      <ul class="traits">${suspect.traits.map((trait) => `<li>${trait}</li>`).join("")}</ul>
      <span class="status">CLEARED</span>
    </button>
  `).join("");
}

function renderClue() {
  const clue = clues[current];
  attempts = 0;
  selectedSuspect = null;
  renderSuspects();
  $("#progress-label").textContent = `CLUE ${current + 1} OF ${clues.length}`;
  $("#progress-bar").style.width = `${((current + 1) / clues.length) * 100}%`;
  $("#location").textContent = clue.location;
  $("#scene").textContent = clue.scene;
  $("#equation").textContent = clue.equation;
  $(".stamp").innerHTML = `EVIDENCE<br />${String(current + 1).padStart(2, "0")}`;
  answer.placeholder = `${clue.variable} = ?`;
  answer.value = "";
  answer.disabled = false;
  $(".check-btn").disabled = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  scaffold.hidden = true;
  $("#work-steps").value = "";
  $("#hint-box").hidden = true;
  reveal.hidden = true;
  $("#excluded").hidden = true;
  $("#next-btn").hidden = true;
  $("#selected-suspect").textContent = "NO SUSPECT SELECTED";
  $("#exclude-btn").disabled = true;
  $("#decision-feedback").textContent = "";
  answer.focus();
}

function correctAnswer() {
  const clue = clues[current];
  feedback.textContent = `Correct. ${clue.variable} = ${clue.answer}. The evidence fits.`;
  feedback.className = "feedback success";
  answer.disabled = true;
  $(".check-btn").disabled = true;
  scaffold.hidden = true;
  $("#clue-title").textContent = clue.title;
  $("#clue-text").textContent = clue.clue;
  $("#hint-evidence").innerHTML = clue.hints.map((hint) => `
    <article class="mini-clue"><span>${hint.label}</span><p>${hint.text}</p></article>
  `).join("");
  $("#excluded").textContent = `SUSPECT EXCLUDED: ${suspects[clue.suspect].name.toUpperCase()}`;
  $("#next-btn").innerHTML = current === clues.length - 1 ? "IDENTIFY THE CULPRIT <span>→</span>" : "FOLLOW THE NEXT LEAD <span>→</span>";
  reveal.hidden = false;
  reveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

$("#answer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = Number(answer.value.trim());
  if (answer.value.trim() === "" || Number.isNaN(value)) {
    feedback.textContent = "Enter a number so we can test your evidence.";
    return;
  }
  if (Math.abs(value - clues[current].answer) < 0.000001) {
    correctAnswer();
    return;
  }
  attempts += 1;
  feedback.textContent = "That answer doesn’t match the evidence yet. Show your steps and we’ll inspect them together.";
  scaffold.hidden = false;
  $("#hint-box").hidden = true;
  $("#work-steps").focus();
});

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".suspect");
  if (!card || reveal.hidden || cleared.has(Number(card.dataset.suspect))) return;
  selectedSuspect = Number(card.dataset.suspect);
  renderSuspects();
  $("#selected-suspect").textContent = `SELECTED: ${suspects[selectedSuspect].name.toUpperCase()}`;
  $("#exclude-btn").disabled = false;
  $("#decision-feedback").textContent = "";
});

$("#exclude-btn").addEventListener("click", () => {
  const clue = clues[current];
  if (selectedSuspect === null) return;
  if (selectedSuspect !== clue.suspect) {
    $("#decision-feedback").textContent = "That profile does not match all three details. Compare the clothing and location again.";
    return;
  }
  cleared.add(selectedSuspect);
  selectedSuspect = null;
  renderSuspects();
  $("#decision-box").hidden = true;
  $("#excluded").hidden = false;
  $("#next-btn").hidden = false;
});

$("#get-help").addEventListener("click", () => {
  const steps = $("#work-steps").value.trim();
  const hintBox = $("#hint-box");
  if (steps.length < 8) {
    hintBox.innerHTML = "Write at least one full step first. Try naming the operation you used on <strong>both sides</strong> of the equation.";
    hintBox.hidden = false;
    return;
  }
  const clue = clues[current];
  const extra = attempts > 1 ? ` The verified solution is ${clue.variable} = ${clue.answer}; substitute it into the original equation to check both sides.` : "";
  hintBox.innerHTML = `<strong>Detective prompt:</strong> ${clue.hint}${extra}<br><br>Revise your answer above, then check the evidence again.`;
  hintBox.hidden = false;
  answer.focus();
});

$("#next-btn").addEventListener("click", () => {
  if (current < clues.length - 1) {
    current += 1;
    renderClue();
    $("#decision-box").hidden = false;
    $("#evidence-card").scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    $("#investigation").hidden = true;
    $("#finale").hidden = false;
    $("#finale").scrollIntoView({ behavior: "smooth" });
  }
});

$("#begin-btn").addEventListener("click", () => $("#investigation").scrollIntoView({ behavior: "smooth" }));
$("#restart-btn").addEventListener("click", () => {
  current = 0;
  cleared = new Set();
  $("#decision-box").hidden = false;
  renderSuspects();
  renderClue();
  $("#investigation").hidden = false;
  $("#finale").hidden = true;
  $("#investigation").scrollIntoView({ behavior: "smooth" });
});

renderSuspects();
renderClue();
