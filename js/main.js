// Gruppenname: WI_A_Gruppe_5

let appState = createDefaultState();

function initCardForm() {
  const form = document.getElementById("card-form");
  const errorOutput = document.getElementById("form-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const category = document.getElementById("card-category").value;
    const question = document.getElementById("card-question").value;
    const answer = document.getElementById("card-answer").value;

    const errors = validateCardInput(question, answer);

    if (errors.length > 0) {
      errorOutput.textContent = errors.join(" ");
      errorOutput.hidden = false;
      return;
    }

    errorOutput.hidden = true;

    addCard(appState, category, question, answer);
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  appState = loadState();
  initCardForm();
  renderCardOverview(appState);
});